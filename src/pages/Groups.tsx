import { Group, RouteButton, Title } from '@/atoms'
import { PageTemplate } from '@/templates'

const Groups = () => {
  return (
    <PageTemplate>
      <Group position="apart">
        <Title order={3}>Groups</Title>
        <RouteButton to="/groups/new">Create Group</RouteButton>
      </Group>
    </PageTemplate>
  )
}

export default Groups
