import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Home } from './components'
import { Toaster } from './components/ui/toaster'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
