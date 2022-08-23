import { Center, Loader as MantineLoader } from '@/atoms'

export const Loader = () => {
  return (
    <Center sx={{ width: '100%', height: '100%' }}>
      <MantineLoader variant="bars" />
    </Center>
  )
}
