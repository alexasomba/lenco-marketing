// React isn't required to be imported in the test runtime here — keep the file minimal
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { Feedback } from '../src/components/feedback'

describe('Feedback UI', () => {
  test('submits feedback and shows github link', async () => {
    const fakeUrl = 'https://github.com/org/repo/issues/1'
    const onRateAction = vi.fn().mockResolvedValue({ githubUrl: fakeUrl })

    render(<Feedback onRateAction={onRateAction} />)

    // Click the Good button
    const goodBtn = screen.getByRole('button', { name: /good/i })
    fireEvent.click(goodBtn)

    // Type a message
    const textarea = screen.getByPlaceholderText(/leave your feedback/i)
    fireEvent.change(textarea, { target: { value: 'Great docs!' } })

    // Submit
    const submit = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submit)

    // Wait for the thank-you state
    await waitFor(() => screen.getByText(/thank you for your feedback/i))

    // Confirm View on GitHub link present
    const link = screen.getByRole('link', { name: /view on github/i })
    expect(link.getAttribute('href')).toBe(fakeUrl)
    expect(onRateAction).toHaveBeenCalled()
  })
})
