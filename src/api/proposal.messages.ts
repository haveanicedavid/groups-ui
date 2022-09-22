import {
  MsgExec,
  MsgSubmitProposal,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/tx'
import { Long } from '@osmonauts/helpers'

import { ProposalFormValues } from '@/organisms/proposal-form'

import { ProposalExecMsg } from '../types/proposal.types'

import { MsgWithTypeUrl } from './cosmosgroups'

export function createProposalMsg(values: ProposalFormValues) {
  const { group_policy_address, metadata, proposers, Exec } = values
  const message: MsgSubmitProposal = {
    messages: [], // For demo purposes, proposal have empty messages.
    group_policy_address: group_policy_address,
    metadata: metadata,
    proposers: proposers.map((elm) => elm.address),
    exec: Exec,
  }
  return MsgWithTypeUrl.submitProposal(message)
}

export function execProposalMsg(values: ProposalExecMsg) {
  const message: MsgExec = {
    proposal_id: values.proposal_id,
    executor: values.executor,
  }
  return MsgWithTypeUrl.exec(message)
}
