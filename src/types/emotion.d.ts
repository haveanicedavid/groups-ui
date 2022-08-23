import type { MantineTheme } from '@mantine/core'

import '@emotion/react'

declare module '@emotion/react' {
  // eslint-disable-next-line
  export interface Theme extends MantineTheme {}
}
