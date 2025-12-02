import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { LLMCopyButton, ViewOptions } from '../src/components/page-actions'

describe('Page actions UI', () => {
  const originalClipboard = global.navigator.clipboard
  const originalFetch = global.fetch

  beforeEach(() => {
    // Mock clipboard API
    // @ts-ignore
    global.navigator.clipboard = { write: vi.fn(() => Promise.resolve()) }
    // JSDOM doesn't include ClipboardItem; stub it so our component can construct one
    // @ts-ignore
    global.ClipboardItem = class {
      constructor(_map: any) {}
    }
  })

  afterEach(() => {
    // restore
    // @ts-ignore
    global.navigator.clipboard = originalClipboard
    global.fetch = originalFetch
    vi.restoreAllMocks()
  })

  test('LLMCopyButton calls clipboard.write after fetching markdown', async () => {
    const markdownUrl = 'https://example.com/docs/test.mdx'
    global.fetch = vi.fn(() =>
      Promise.resolve({ text: () => Promise.resolve('hello world') } as unknown as Response),
    )

    render(<LLMCopyButton markdownUrl={markdownUrl} />)

    const btn = screen.getByRole('button', { name: /copy markdown/i })
    fireEvent.click(btn)

    await waitFor(() => expect(global.navigator.clipboard.write).toHaveBeenCalled())
  })

  test('ViewOptions renders menu and link to GitHub', async () => {
    const markdownUrl = '/docs/foo/test.mdx'
    const githubUrl = 'https://github.com/org/repo/blob/main/content/docs/foo/test.mdx'

    render(<ViewOptions markdownUrl={markdownUrl} githubUrl={githubUrl} />)

    // trigger popover
    const openBtn = screen.getByRole('button', { name: /open/i })
    fireEvent.click(openBtn)

    const link = await screen.findByRole('link', { name: /open in github/i })
    expect(link.getAttribute('href')).toBe(githubUrl)
  })
})
