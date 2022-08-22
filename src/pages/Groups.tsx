import { Link } from 'react-router-dom'

import { Button, Group, Title } from '@/atoms'
import { PageTemplate } from '@/templates'

const Groups = () => {
  return (
    <PageTemplate>
      <Group position="apart">
        <Title order={3}>Groups</Title>
        <div>
          <Button size="lg" component={Link} to="/groups/new">
            Create Group
          </Button>
        </div>
      </Group>
    </PageTemplate>
  )
}

export default Groups
