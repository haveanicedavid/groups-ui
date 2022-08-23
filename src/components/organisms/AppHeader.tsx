import { useNavigate } from 'react-router-dom'

import {
  ActionIcon,
  Box,
  Container,
  Group,
  GroupsIcon,
  Header,
  RouteLink,
  Text,
} from '@/atoms'

import { ChainSelect } from './ChainSelect'

export const AppHeader = () => {
  const navigate = useNavigate()

  return (
    <Header height={90}>
      <Container size="xl" sx={{ height: '100%' }}>
        <Group position="apart" align="center" sx={{ height: '100%' }}>
          <ActionIcon size="xl" onClick={() => navigate('/')}>
            <GroupsIcon />
          </ActionIcon>
          <Text size="md" component="div" sx={{ flexGrow: 1 }}>
            Groups UI
          </Text>
          {/* TODO: temp nav - delete */}
          <Group mr="md">
            <RouteLink to="/">Home</RouteLink>
            <RouteLink to="/groups">Groups</RouteLink>
          </Group>
          <Box sx={{ flexGrow: 1, maxWidth: 300 }}>
            <ChainSelect />
          </Box>
        </Group>
      </Container>
    </Header>
  )
}
