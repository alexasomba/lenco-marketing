export function getGithubIssueOwner() {
  return (
    process.env.GITHUB_ISSUE_OWNER ?? process.env.GITHUB_OWNER ?? 'alexasomba'
  )
}

export function getGithubIssueRepo() {
  return (
    process.env.GITHUB_ISSUE_REPO ?? process.env.GITHUB_REPO ?? 'lenco-marketing'
  )
}

// GitHub App env values — prefer GitHub App flow in production
export function getGithubAppId() {
  return process.env.GITHUB_APP_ID
}

export function getGithubAppInstallationId() {
  return process.env.GITHUB_APP_INSTALLATION_ID
}

export function getGithubAppPrivateKey() {
  return process.env.GITHUB_APP_PRIVATE_KEY
}
