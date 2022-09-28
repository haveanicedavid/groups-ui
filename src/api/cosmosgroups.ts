import { cosmos } from '@haveanicedavid/cosmos-groups-ts'

export const v1 = cosmos.group.v1
export const MsgWithTypeUrl = cosmos.group.v1.MessageComposer.withTypeUrl
export const MsgBankWithTypeUrl = cosmos.bank.v1beta1.MessageComposer.withTypeUrl
