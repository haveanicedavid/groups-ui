import { MsgSend } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/bank/v1beta1/tx'
import { Coin } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/base/v1beta1/coin'
import Long from 'long'

import type { GroupWithPolicyFormValues, UIGroupMetadata } from 'types'
import { clearEmptyStr } from 'util/helpers'

import { BankSendType } from '../types/bank.types'

import { MsgBankWithTypeUrl, MsgWithTypeUrl } from './cosmosgroups'
import { encodeDecisionPolicy } from './policy.messages'

export function updateGroupMetadataMsg({
  admin,
  metadata,
  groupId,
}: {
  admin: string
  groupId: string
  metadata: UIGroupMetadata
}) {
  return MsgWithTypeUrl.updateGroupMetadata({
    admin,
    group_id: Long.fromString(groupId),
    metadata: JSON.stringify(metadata),
  })
}
