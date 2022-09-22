import { Coin } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/base/v1beta1/coin'

export type BankSendType = {
  from_address: string
  to_address: string
  amount: Coin[]
}
