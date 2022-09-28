import { QueryProposalsByGroupPolicyResponse } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/query'
import {
  Proposal,
  Vote,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'
import Long from 'long'

import { throwError } from 'util/errors'

import { Group, signAndBroadcast } from 'store'

import { ProposalFormValues } from '@/organisms/proposal-form'
import { VoteFormValues } from '@/organisms/vote-form'

import { UIGroup } from '../types'
import { ProposalExecMsg } from '../types/proposal.types'

import { toUIGroup } from './group.utils'
import { createProposalMsg, execProposalMsg } from './proposal.messages'
import { createVoteMsg } from './vote.messages'

export async function createProposal(values: ProposalFormValues) {
  try {
    const msg = createProposalMsg(values)
    const data = await signAndBroadcast([msg])
    let proposalId
    if (data.rawLog) {
      const [raw] = JSON.parse(data.rawLog)
      const idRaw = raw.events[0].attributes[0].value
      proposalId = JSON.parse(idRaw)
    }
    return { ...data, proposalId }
  } catch (error) {
    throwError(error)
  }
}

export async function voteProposal(values: VoteFormValues) {
  try {
    const msg = createVoteMsg(values)
    const data = await signAndBroadcast([msg])
    if (data.code !== 0) {
      throwError(new Error(data.rawLog))
    }
    return data
  } catch (error) {
    throwError(error)
  }
}

export async function execProposal(values: ProposalExecMsg) {
  try {
    const msg = execProposalMsg(values)
    const data = await signAndBroadcast([msg])
    if (data.code !== 0) {
      throwError(new Error(data.rawLog))
    }
    return data
  } catch (error) {
    throwError(error)
  }
}

export async function fetchProposalById(proposalId?: string | Long): Promise<Proposal> {
  if (!Group.query) throwError('Wallet not initialized')
  if (!proposalId) throwError('proposalId is required')
  try {
    const { proposal } = await Group.query.proposal({
      proposal_id: proposalId instanceof Long ? proposalId : Long.fromString(proposalId),
    })
    return proposal
  } catch (error) {
    throwError(error)
  }
}

export async function fetchProposalVotesById(
  proposalId?: string | Long,
): Promise<Vote[]> {
  if (!Group.query) throwError('Wallet not initialized')
  if (!proposalId) throwError('proposalId is required')
  try {
    const { votes } = await Group.query.votesByProposal({
      proposal_id: proposalId instanceof Long ? proposalId : Long.fromString(proposalId),
    })
    return votes
  } catch (error) {
    throwError(error)
  }
}

export async function fetchProposalsByPolicyAddr(
  policyAddress: string,
): Promise<QueryProposalsByGroupPolicyResponse> {
  if (!Group.query) throwError('Wallet not initialized')
  if (!policyAddress) throwError('policyAddress is required')
  try {
    const result = await Group.query.proposalsByGroupPolicy({
      address: policyAddress,
    })
    return result
  } catch (error) {
    throwError(error)
  }
}
