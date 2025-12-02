import { expect, test, vi, afterEach } from 'vitest'
import { handleCreateFeedback } from '../src/lib/feedback'

afterEach(() => {
  vi.restoreAllMocks()
  delete process.env.GITHUB_TOKEN
  delete process.env.GITHUB_ISSUE_OWNER
  delete process.env.GITHUB_ISSUE_REPO
})

test('fallback creates prefilled GitHub new issue URL when no token', async () => {
  delete process.env.GITHUB_TOKEN
  process.env.GITHUB_ISSUE_OWNER = 'userX'
  process.env.GITHUB_ISSUE_REPO = 'myrepo'

  const res = await handleCreateFeedback({
    url: '/docs/getting-started',
    feedback: { opinion: 'good', message: 'Nice guide' },
  })

  expect(res.githubUrl).toContain('https://github.com/userX/myrepo/issues/new?title=')
  expect(res.githubUrl).toContain(encodeURIComponent('Nice guide'))
})

test('posts to GitHub and returns created issue URL when token available', async () => {
  process.env.GITHUB_TOKEN = 'tok123'
  process.env.GITHUB_ISSUE_OWNER = 'acme'
  process.env.GITHUB_ISSUE_REPO = 'docs'

  const fakeCreatedUrl = 'https://github.com/acme/docs/issues/42'
  const mockFetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ html_url: fakeCreatedUrl }) })
  ;(globalThis as any).fetch = mockFetch

  const res = await handleCreateFeedback({
    url: '/docs/getting-started',
    feedback: { opinion: 'bad', message: 'needs examples' },
  })

  expect(res.githubUrl).toBe(fakeCreatedUrl)
  expect(mockFetch).toHaveBeenCalled()
  const [calledUrl, opts] = mockFetch.mock.calls[0]
  expect(calledUrl).toContain('/repos/acme/docs/issues')
  expect(opts.headers.Authorization).toContain('Bearer tok123')
})
