import { Long } from '@osmonauts/helpers'

export type ProposerFormValues = {
  address: string
}

export type ProposalExecMsg = {
  proposal_id: Long
  /** executor is the account address used to execute the proposal. */
  executor: string
}
