import { cosmos } from '@haveanicedavid/cosmos-groups-ts'
import { MsgSend } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/bank/v1beta1/tx'
import { Coin } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/base/v1beta1/coin'
import {
  MsgExec,
  MsgSubmitProposal,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/tx'
import { Any } from '@haveanicedavid/cosmos-groups-ts/types/codegen/google/protobuf/any'

import { ProposalFormValues } from '@/organisms/proposal-form'

import { ProposalExecMsg } from '../types/proposal.types'

import { MsgWithTypeUrl, v1 } from './cosmosgroups'

export function createProposalMsg(values: ProposalFormValues) {
  const { group_policy_address, metadata, proposers, Exec } = values
  const coin: Coin = {
    denom: 'stake',
    amount: values.amount.toString(),
  }
  const msgSend: MsgSend = {
    from_address: values.group_policy_address,
    to_address: values.msgToAddr,
    amount: [coin],
  }

  const message: MsgSubmitProposal = {
    messages: [
      {
        value: cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish(),
        type_url: '/cosmos.bank.v1beta1.MsgSend',
      },
    ], // For demo purposes, proposal have empty messages.
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
