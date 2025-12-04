import { expect, test, vi, beforeEach, afterEach } from 'vitest'
import { onRateAction } from '../src/server/actions/docs-feedback.server'
import { runWithStartContext } from '@tanstack/start-storage-context'

beforeEach(() => {
  vi.restoreAllMocks()
  delete (process.env as any).GITHUB_TOKEN
  delete (process.env as any).GITHUB_ISSUE_OWNER
  delete (process.env as any).GITHUB_ISSUE_REPO
})

afterEach(() => {
  vi.restoreAllMocks()
})

test('integration: uses fallback url when no token (onRateAction)', async () => {
  process.env.GITHUB_ISSUE_OWNER = 'integOwner'
  process.env.GITHUB_ISSUE_REPO = 'integRepo'

  // createServerFn wrappers expose __executeServer — use it in tests to
  // exercise the server-side pipeline directly. It returns { result, error }.
  const ctx = {
    getRouter: async () => ({} as any),
    request: new Request('http://localhost/docs/usage'),
    startOptions: {},
    contextAfterGlobalMiddlewares: {},
  }

  const out = await runWithStartContext(ctx as any, async () =>
    (onRateAction as any).__executeServer(
      { method: 'POST', data: { url: '/docs/usage', feedback: { opinion: 'good', message: 'nice' } } },
      new AbortController().signal,
    ),
  )

  expect(out.result).toBeDefined()
  expect(out.result.githubUrl).toContain('https://github.com/integOwner/integRepo/issues/new?title=')
})

test('integration: posts to GitHub when token exists (onRateAction)', async () => {
  process.env.GITHUB_TOKEN = 'fake-token'
  process.env.GITHUB_ISSUE_OWNER = 'integOwner'
  process.env.GITHUB_ISSUE_REPO = 'integRepo'

  const createdUrl = 'https://github.com/integOwner/integRepo/issues/99'
  const mockFetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ html_url: createdUrl }) })
  ;(globalThis as any).fetch = mockFetch

  const ctx = {
    getRouter: async () => ({} as any),
    request: new Request('http://localhost/docs/usage'),
    startOptions: {},
    contextAfterGlobalMiddlewares: {},
  }

  const out = await runWithStartContext(ctx as any, async () =>
    (onRateAction as any).__executeServer(
      { method: 'POST', data: { url: '/docs/usage', feedback: { opinion: 'bad', message: 'broken' } } },
      new AbortController().signal,
    ),
  )

  expect(out.result).toBeDefined()
  expect(out.result.githubUrl).toBe(createdUrl)
  expect(mockFetch).toHaveBeenCalled()
})
