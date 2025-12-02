import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { LLMCopyButton, ViewOptions } from '../src/components/page-actions'

describe('MDX page prop forwarding', () => {
  const originalClipboard = global.navigator.clipboard
  const originalFetch = global.fetch

  beforeEach(() => {
    // mock clipboard + ClipboardItem
    // @ts-ignore
    global.navigator.clipboard = { write: vi.fn(() => Promise.resolve()) }
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

  test('MDX component sees page props and can render copy/view actions', async () => {
    const page = {
      markdownUrl: 'https://example.com/docs/my-example.mdx',
      githubUrl: 'https://github.com/org/repo/blob/main/content/docs/my-example.mdx',
    }

    // fake fetch to return the markdown body
    global.fetch = vi.fn(() =>
      Promise.resolve({ text: () => Promise.resolve('# Hello world') } as unknown as Response),
    )

    function FakeMDX({ page }: { page: { markdownUrl: string; githubUrl?: string } }) {
      return (
        <div>
          <LLMCopyButton markdownUrl={page.markdownUrl} />
          {page.githubUrl && <ViewOptions markdownUrl={page.markdownUrl} githubUrl={page.githubUrl} />}
        </div>
      )
    }

    render(<FakeMDX page={page} />)

    const copyBtn = screen.getByRole('button', { name: /copy markdown/i })
    fireEvent.click(copyBtn)

    await waitFor(() => expect(global.navigator.clipboard.write).toHaveBeenCalled())

    const openBtn = screen.getByRole('button', { name: /open/i })
    fireEvent.click(openBtn)

    const githubLink = await screen.findByRole('link', { name: /open in github/i })
    expect(githubLink.getAttribute('href')).toBe(page.githubUrl)
  })
})
