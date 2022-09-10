import { useAdminGroups, useMemberGroups } from 'hooks/use-query'
import { Wallet } from 'store/wallet'

import { Button, Flex, Heading, RouteLink } from '@/atoms'
import { MyGroupsTable } from '@/organisms/my-groups-table'
import { PageTemplate } from '@/templates/page-template'

export default function Groups() {
  const { data: memberGroups } = useMemberGroups(Wallet.account?.address)
  const { data: adminGroups } = useAdminGroups(Wallet.account?.address)

  return (
    <PageTemplate>
      <Flex flexDir="column" w="100%" gap={3}>
        <Flex justify="space-between" mb={8}>
          <Heading>Groups</Heading>
          <Button size="large" px={4} as={RouteLink} to="/new">
            Create Group
          </Button>
        </Flex>
        <MyGroupsTable memberGroups={memberGroups} adminGroups={adminGroups} />
      </Flex>
    </PageTemplate>
  )
}
