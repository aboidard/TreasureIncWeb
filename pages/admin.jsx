import Admin from '@/app/components/Admin/Admin'
import Container from '@/components/Container'

// Protected by Basic Authentication in middleware.js
export default function AdminPage() {
  return (
    <Container title="Admin">
      <h1 className="font-kenvector text-3xl text-center text-white mt-4">Administration</h1>
      <Admin />
    </Container>
  )
}
