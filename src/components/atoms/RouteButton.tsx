import { type LinkProps, Link } from 'react-router-dom'
import { type ButtonProps, Button } from '@mantine/core'

export const RouteButton = (props: ButtonProps & LinkProps) => {
  return <Button component={Link} {...props} />
}
