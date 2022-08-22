import { ReactNode } from 'react'

// import type { AlertProps } from '@/atoms'
import { Alert, Button, Center, GroupsIcon, Paper } from '@/atoms'

export const AlertTemplate = ({
  btnText,
  children,
  onBtnClick,
  // severity = 'error',
  text,
  title = 'Whoops!',
}: {
  btnText: string
  children?: ReactNode
  onBtnClick: () => void
  // severity?: AlertProps['severity']
  text: string
  title?: string
}) => {
  return (
    <Paper mt={5} py={2} px={4}>
      <Center>
        <GroupsIcon height={50} width={50} />
      </Center>
      <Alert
        title={title}
        my={2}
        // severity={severity}
        // action={
        //   <Button size="sm" color="inherit" onClick={onBtnClick}>
        //     {btnText}
        //   </Button>
        // }
      >
        {/* <AlertTitle sx={{ fontWeight: 'bold' }}>{title}</AlertTitle> */}
        {text}
      </Alert>
      {children}
    </Paper>
  )
}
