import {
  MsgSubmitProposal,
  MsgVote,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/tx'

import { ProposalFormValues } from '@/organisms/proposal-form'
import { VoteFormValues } from '@/organisms/vote-form'

import { MsgWithTypeUrl } from './cosmosgroups'

export function createVoteMsg(values: VoteFormValues) {
  const { proposal_id, metadata, option, exec, voter } = values
  const message: MsgVote = {
    voter: voter,
    proposal_id: proposal_id,
    metadata: metadata,
    option: option,
    exec: exec,
  }
  return MsgWithTypeUrl.vote(message)
}
