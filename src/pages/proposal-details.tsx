import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { MdEject } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tag,
  useBoolean,
} from '@chakra-ui/react'
import { Vote } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'
import Long from 'long'

import { useProposal, useProposalVotes } from 'hooks/use-query'

import { Button, Heading, HStack, PageContainer, RouteLink, Stack, Text } from '@/atoms'
import { ProposalFormValues } from '@/organisms/proposal-form'
import { defaultVoteFormValues, VoteForm, VoteFormValues } from '@/organisms/vote-form'

import { createProposal, execProposal, voteProposal } from '../api/proposal.actions'
import { createVoteMsg } from '../api/vote.messages'
import { useTxToasts } from '../hooks/useToasts'
import { Wallet } from '../store'
import { ProposalExecMsg } from '../types/proposal.types'
import { handleError } from '../util/errors'
const statStyle = {
  fontSize: '32px',
}
const buildVoteStats = (votes?: Vote[]) => {
  if (!votes) {
    return {}
  }
  const result: any = {}
  for (const v of votes) {
    if (!result[v.option]) {
      result[v.option] = 1
    } else {
      result[v.option] += 1
    }
  }
  return result
}

export default function ProposalDetails() {
  const { proposalId, groupId } = useParams()
  const navigate = useNavigate()
  const { toastErr, toastSuccess } = useTxToasts()
  const { data: proposal } = useProposal(proposalId)
  const { data: votes } = useProposalVotes(proposalId)
  const voteStats = buildVoteStats(votes)
  const [isLoading, setLoading] = useBoolean(false)
  const [time, setTime] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  console.log('votes ==>', votes)
  const handleSubmit = async (data: VoteFormValues) => {
    setLoading.on()
    data.voter = Wallet.account?.address ? Wallet.account?.address : ''
    data.proposal_id = Long.fromString(proposalId ? proposalId : '')
    data.metadata = ''
    try {
      console.log('voteProposal', data)
      const resp = await voteProposal(data)
      console.log('response', resp)
      toastSuccess(resp.transactionHash, 'Vote created!')
      return true
    } catch (err) {
      handleError(err)
      toastErr(err, 'Vote could not be created:')
      return false
    } finally {
      setLoading.off()
    }
  }
  const handleExecute = async () => {
    setLoading.on()
    const data: ProposalExecMsg = {
      proposal_id: Long.fromString(proposalId ? proposalId : ''),
      executor: Wallet.account?.address ? Wallet.account?.address : '',
    }
    try {
      const resp = await execProposal(data)
      toastSuccess(resp.transactionHash, 'Proposal Executed!')
      navigate(`/`)
      return true
    } catch (err) {
      handleError(err)
      toastErr(err, 'Vote could not be created:')
      return false
    } finally {
      setLoading.off()
    }
  }
  return (
    <PageContainer>
      <Stack w="full" spacing={6}>
        <Flex align="center" justify="space-between">
          <div dir="column">
            <Heading size="xl">{`Proposal: ${proposal?.id}`}</Heading>
            <Tag
              style={{ marginTop: '1rem' }}
              color="white"
              bg="yellow.400"
            >{`Status: ${proposal?.status}`}</Tag>
          </div>
          <Flex>
            <Button
              isLoading={isLoading}
              onClick={handleExecute}
              leftIcon={<MdEject />}
              colorScheme="blue"
            >
              Execute Proposal
            </Button>
          </Flex>
        </Flex>

        <Heading size="xl">{`Results: `}</Heading>
        <Container maxW="container.xl" bg="white">
          <StatGroup>
            <Stat>
              <StatLabel style={statStyle} color="green.500">
                Yes
              </StatLabel>
              <StatNumber style={statStyle} color="green.400">
                {voteStats?.VOTE_OPTION_YES ? voteStats?.VOTE_OPTION_YES : 0}
              </StatNumber>
            </Stat>

            <Stat size="2xl">
              <StatLabel style={statStyle} color="red.500">
                No
              </StatLabel>
              <StatNumber style={statStyle} color="red.400">
                {voteStats?.VOTE_OPTION_NO ? voteStats?.VOTE_OPTION_NO : 0}
              </StatNumber>
            </Stat>
            <Stat size="2xl">
              <StatLabel style={statStyle} color="red.600">
                No With Veto
              </StatLabel>
              <StatNumber style={statStyle} color="red.600">
                {voteStats?.VOTE_OPTION_NO_WITH_VETO
                  ? voteStats?.VOTE_OPTION_NO_WITH_VETO
                  : 0}
              </StatNumber>
            </Stat>
            <Stat size="2xl">
              <StatLabel style={statStyle} color="darkgrey.500">
                Abstain
              </StatLabel>
              <StatNumber style={statStyle} color="darkgrey.400">
                {voteStats?.VOTE_OPTION_ABSTAIN ? voteStats?.VOTE_OPTION_ABSTAIN : 0}
              </StatNumber>
            </Stat>
          </StatGroup>
        </Container>
        <Heading size="xl">{`Vote: `}</Heading>
        <Flex dir="column" justify="center">
          <Box style={{ marginRight: '1rem' }}>
            <VoteForm
              isLoading={isLoading}
              defaultValues={defaultVoteFormValues}
              onSubmit={handleSubmit}
            />
          </Box>
        </Flex>
      </Stack>
    </PageContainer>
  )
}
