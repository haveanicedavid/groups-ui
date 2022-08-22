import { ReactNode } from 'react'

import { Container } from '@/atoms'

export const PageTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <Container pt={4} sx={{ pt: 4, bgcolor: 'action.hover', alignItems: 'center' }}>
      {children}
    </Container>
  )
}
