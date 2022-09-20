import { useState } from 'react'

import { handleError } from 'util/errors'
import { defaultGroupFormValues, defaultGroupPolicyFormValues } from 'util/form.constants'

import { Wallet } from 'store'
import { useTxToasts } from 'hooks/useToasts'

import { defaultProposalFormValues, ProposalFormValues } from '@/organisms/proposal-form'
import GroupTemplate from '@/templates/group-template'
import ProposalTemplate from '@/templates/proposal-template'

import { createProposal } from '../api/proposal.actions'

export default function ProposalCreate() {
  const { toastErr, toastSuccess } = useTxToasts()
  const [newProposalId, setNewProposalId] = useState<string>()

  async function handleCreate(values: ProposalFormValues): Promise<boolean> {
    try {
      const { transactionHash, proposalId } = await createProposal(values)
      setNewProposalId(proposalId?.toString())
      toastSuccess(transactionHash, 'Proposal created!')
      return true
    } catch (err) {
      handleError(err)
      toastErr(err, 'Proposal could not be created:')
      return false
    }
  }

  if (!Wallet.account?.address) return null

  return (
    <ProposalTemplate
      linkToProposalId={newProposalId}
      initialProposalFormValues={defaultProposalFormValues}
      text={{
        submitBtn: 'Submit',
        finished: 'You have successfully created your proposal.',
      }}
      steps={['Create Proposal', 'Finished']}
      submit={handleCreate}
    />
  )
}
