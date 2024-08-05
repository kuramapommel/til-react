import { setupWorker } from 'msw/browser'
import { handlers } from '@/testing/mocks/handlers'

export const worker = setupWorker(...handlers)
