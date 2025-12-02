export interface FeedbackInput {
  url: string;
  feedback: { opinion: 'good' | 'bad'; message: string };
}

import {
  getGithubIssueOwner,
  getGithubIssueRepo,
  getGithubAppId,
  getGithubAppInstallationId,
  getGithubAppPrivateKey,
} from './site-config';

import { importPKCS8, SignJWT } from 'jose';

export async function handleCreateFeedback(data: FeedbackInput) {
  const { url, feedback } = data;

  const title = `Docs feedback: ${feedback.opinion.toUpperCase()} — ${url}`;
  const body = `Feedback on page: ${url}\n\nOpinion: ${feedback.opinion}\n\nMessage:\n${feedback.message}`;

  const owner = getGithubIssueOwner();
  const repo = getGithubIssueRepo();

  // Pre-filled URL for creating an issue manually when no token is available
  let githubUrl = `https://github.com/${owner}/${repo}/issues/new?title=${encodeURIComponent(
    title,
  )}&body=${encodeURIComponent(body)}`;

  // Prefer GitHub App flow when app credentials are present. This is the
  // recommended production approach because it scopes via an installation
  // and avoids storing long-lived personal access tokens.
  const appId = getGithubAppId();
  const installationId = getGithubAppInstallationId();
  const appPrivateKey = getGithubAppPrivateKey();

  if (appId && installationId && appPrivateKey) {
    try {
      // Create a short-lived JWT signed with the app private key
      const alg = 'RS256';
      const pk = await importPKCS8(appPrivateKey, alg);
      const jwt = await new SignJWT({})
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('10m')
        .setIssuer(String(appId))
        .sign(pk);

      // Exchange the JWT for an installation access token
      const tokenResp = await fetch(
        `https://api.github.com/app/installations/${installationId}/access_tokens`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${jwt}`,
            Accept: 'application/vnd.github+json',
          },
        },
      );

      if (tokenResp.ok) {
        const tokenJson = (await tokenResp.json()) as any;
        const installationToken = tokenJson?.token;
        if (installationToken) {
          const resp = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${installationToken}`,
              Accept: 'application/vnd.github+json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body }),
          });

          if (resp.ok) {
            const json = (await resp.json()) as any;
            if (json?.html_url) githubUrl = json.html_url;
          }
        }
      }
    } catch (err) {
      // Fall through to token fallback (or prefilled URL) if App flow fails
    }
  }

  // Developer / fallback path: personal access token (dev-only)
  const token = process.env.GITHUB_TOKEN ?? (globalThis as any).GITHUB_TOKEN;
  if (token) {
    try {
      const resp = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });

        if (resp.ok) {
          const json = (await resp.json()) as any;
          if (json?.html_url) githubUrl = json.html_url;
        }
    } catch (err) {
      // fallback to prefilled URL
    }
  }

  return { githubUrl };
}

export type ActionResponse = { githubUrl: string };
