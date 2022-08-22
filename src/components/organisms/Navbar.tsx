import { useNavigate } from 'react-router-dom'
import { Header } from '@mantine/core'

import {
  // AppBar,
  Box,
  Container,
  GroupsIcon,
  // IconButton,
  // Link,
  Text,
  // Toolbar,
} from '@/atoms'

import { ChainSelect } from './ChainSelect'

export const Navbar = () => {
  const navigate = useNavigate()

  return (
    <Header
      height={74}
      // position=""
      fixed={false}
      // color="transparent"
      // elevation={0}
      // sx={{
      //   borderBottom: 2,
      //   borderColor: 'divider',
      // }}
    >
      <Container>
        {/* <Toolbar sx={{ my: 2 }} disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/')}
          >
            <GroupsIcon />
          </IconButton>
          <Text variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Groups UI
          </Text>
          <TempNav />
          <Box sx={{ flexGrow: 1, maxWidth: 300 }}>
            <ChainSelect />
          </Box>
        </Toolbar> */}

        <ChainSelect />
      </Container>
    </Header>
  )
}

// const TempNav = () => (
//   <Box component="ul" sx={{ display: 'flex', gap: 2, mr: 5, listStyle: 'none' }}>
//     <li>
//       <Link to="/">Home</Link>
//     </li>
//     <li>
//       <Link to="groups">Groups</Link>
//     </li>
//   </Box>
// )
