import { createRootRoute, Outlet } from '@tanstack/react-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={ queryClient }>
        <Outlet />
        <Toaster />
      </QueryClientProvider>
    </>
  ),
})