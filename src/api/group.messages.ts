import { MsgSend } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/bank/v1beta1/tx'
import { Coin } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/base/v1beta1/coin'
import Long from 'long'

import type { GroupWithPolicyFormValues, UIGroupMetadata } from 'types'
import { clearEmptyStr } from 'util/helpers'

import { MsgBankWithTypeUrl, MsgWithTypeUrl } from './cosmosgroups'
import { encodeDecisionPolicy } from './policy.messages'

export function createGroupWithPolicyMsg(values: GroupWithPolicyFormValues) {
  const {
    admin,
    description,
    forumLink,
    members,
    name,
    otherMetadata,
    policyAsAdmin,
    percentage,
    threshold,
    votingWindow,
  } = values
  const groupPolicyResponse = MsgWithTypeUrl.createGroupWithPolicy({
    admin,
    group_policy_metadata: '',
    group_policy_as_admin: policyAsAdmin === 'true',
    decision_policy: encodeDecisionPolicy({
      percentage: clearEmptyStr(percentage),
      threshold: clearEmptyStr(threshold),
      votingWindow: votingWindow,
    }),
    group_metadata: JSON.stringify({
      name,
      description,
      forumLink,
      updatedAt: new Date().toString(),
      other: otherMetadata,
    }),
    members: members.map((m) => ({
      address: m.address,
      weight: m.weight.toString(),
      metadata: JSON.stringify(m.metadata),
    })),
  })

  return groupPolicyResponse
}

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
