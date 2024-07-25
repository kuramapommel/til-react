export const enableMocking = async () => {
  if (process.env.NODE_ENV !== 'development') return

  return import('./browser').then(({ worker }) => worker.start())
}
