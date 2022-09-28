import { useMemo } from 'react'
import { Proposal } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

import { useBoolean, useBreakpointValue, useColorModeValue } from 'hooks/chakra'

import { Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@/atoms'
import { TableTitlebar, Truncate } from '@/molecules'

export const GroupProposalsTable = ({ proposals }: { proposals: Proposal[] }) => {
  const [isEdit, setEdit] = useBoolean(false)
  const tableProposals: Proposal[] = useMemo(() => {
    const proposalsVals = proposals.map((p) => p)
    return [...proposalsVals]
  }, [proposals])
  const tailSize = useBreakpointValue({ base: 4, sm: 6, md: 25, lg: 35, xl: 100 })
  return (
    <TableContainer w="full" borderRadius="lg" borderWidth={2} shadow="md">
      <TableTitlebar title="Proposals"></TableTitlebar>
      <Table size="lg" variant={isEdit ? undefined : 'striped'}>
        <Thead>
          <Tr sx={{ '& > th': { fontWeight: 'bold' } }}>
            <Th>Proposal</Th>
            <Th>Status</Th>
            <Th>Policy Address</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableProposals.map((proposal, i) => {
            const key = proposal.id.toString()
            return (
              <Tr key={key}>
                <Td>
                  <Link to={`/proposals/${proposal.id}/details`}>
                    <Truncate
                      tailLength={tailSize}
                      text={`Proposal ID: ${proposal.id}`}
                    />
                  </Link>
                </Td>
                <Td>{proposal.status}</Td>
                <Td>
                  {' '}
                  <Truncate
                    tailLength={tailSize}
                    text={proposal.group_policy_address}
                  />{' '}
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
