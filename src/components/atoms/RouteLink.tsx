import { type LinkProps, Link } from 'react-router-dom'
import { type AnchorProps, Anchor } from '@mantine/core'

export const RouteLink = (props: AnchorProps & LinkProps) => {
  return <Anchor component={Link} {...props} />
}
