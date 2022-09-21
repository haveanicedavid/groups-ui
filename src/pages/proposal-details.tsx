import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'

import { useProposal } from 'hooks/use-query'

import { Heading, HStack, PageContainer, Stack, Text } from '@/atoms'
const statStyle = {
  fontSize: '32px',
}
export default function ProposalDetails() {
  const { proposalId } = useParams()
  const { data: proposal } = useProposal(proposalId)
  const [time, setTime] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  // console.log('proposal :>> ', proposal)

  return (
    <PageContainer>
      <Stack w="full" spacing={6}>
        <Heading size="xl">{`Proposal: ${proposal?.id}`}</Heading>

        <Container maxW="container.xl" bg="white">
          <StatGroup>
            <Stat>
              <StatLabel style={statStyle} color="green.500">
                Yes
              </StatLabel>
              <StatNumber style={statStyle} color="green.400">
                {proposal?.final_tally_result.yes_count}
              </StatNumber>
            </Stat>

            <Stat size="2xl">
              <StatLabel style={statStyle} color="red.500">
                No
              </StatLabel>
              <StatNumber style={statStyle} color="red.400">
                {proposal?.final_tally_result.yes_count}
              </StatNumber>
            </Stat>
            <Stat size="2xl">
              <StatLabel style={statStyle} color="red.600">
                No With Veto
              </StatLabel>
              <StatNumber style={statStyle} color="red.600">
                {proposal?.final_tally_result.yes_count}
              </StatNumber>
            </Stat>
            <Stat size="2xl">
              <StatLabel style={statStyle} color="darkgrey.500">
                Abstain
              </StatLabel>
              <StatNumber style={statStyle} color="darkgrey.400">
                {proposal?.final_tally_result.yes_count}
              </StatNumber>
            </Stat>
          </StatGroup>
        </Container>
      </Stack>
    </PageContainer>
  )
}
