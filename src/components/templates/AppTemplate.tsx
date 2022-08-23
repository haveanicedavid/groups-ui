import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AppShell, Container } from '@mantine/core'

import { Loader } from '@/molecules'
import { AppHeader } from '@/organisms'

export const AppTemplate = () => {
  return (
    <AppShell
      padding="md"
      header={<AppHeader />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Suspense fallback={<Loader />}>
        <Container size="xl">
          <Outlet />
        </Container>
      </Suspense>
    </AppShell>
  )
}
