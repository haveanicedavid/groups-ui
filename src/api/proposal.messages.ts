import { MsgSubmitProposal } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/tx'

import { ProposalFormValues } from '@/organisms/proposal-form'

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
