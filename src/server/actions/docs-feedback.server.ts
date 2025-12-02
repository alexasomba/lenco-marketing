import { createServerFn } from '@tanstack/react-start'
import type { FeedbackInput } from '../../lib/feedback'
import { handleCreateFeedback } from '../../lib/feedback'

// Thin server wrapper that delegates to handleCreateFeedback. Kept in its
// own file so tests can import and call the server function directly without
// pulling in route/browser dependencies.
export const onRateAction = (createServerFn({ method: 'POST' }) as any)
  .inputValidator((d: FeedbackInput) => d)
  // Provide a small extractedFn placeholder and the real server handler.
  // The extractedFn represents the client-side payload function that will
  // be created by the compiler, here we provide a small placeholder so the
  // wrapper exposes __executeServer correctly in tests.
  .handler(
    async (_opts: any) => {
      // client extracted function placeholder
      return undefined as any
    },
    async ({ data }: { data: FeedbackInput }) => handleCreateFeedback(data),
  )
