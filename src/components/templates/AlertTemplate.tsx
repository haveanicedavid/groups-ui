import { ReactNode } from 'react'

import { Alert, AlertProps, Button, Center, GroupsIcon, Paper, Stack } from '@/atoms'

export const AlertTemplate = ({
  btnText,
  children,
  color = 'red',
  onBtnClick,
  text,
  title = 'Whoops!',
}: {
  btnText: string
  children?: ReactNode
  color?: AlertProps['color']
  onBtnClick: () => void
  text: string
  title?: string
}) => {
  return (
    <Center>
      <Paper shadow="md" p="lg" sx={{ minWidth: '33%' }}>
        <Stack align="center">
          <GroupsIcon height={50} width={50} />
          <Alert title={title} color={color} my={2} sx={{ alignSelf: 'stretch' }}>
            {text}
          </Alert>
          {children}
          <Button onClick={onBtnClick} color={color} sx={{ alignSelf: 'flex-end' }}>
            {btnText}
          </Button>
        </Stack>
      </Paper>
    </Center>
  )
}
