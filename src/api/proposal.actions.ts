import { throwError } from 'util/errors'

import { signAndBroadcast } from 'store'

import { ProposalFormValues } from '@/organisms/proposal-form'

import { createProposalMsg } from './proposal.messages'

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
