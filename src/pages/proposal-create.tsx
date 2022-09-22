import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { handleError } from 'util/errors'
import { defaultGroupFormValues, defaultGroupPolicyFormValues } from 'util/form.constants'

import { Wallet } from 'store'
import { useTxToasts } from 'hooks/useToasts'

import { defaultProposalFormValues, ProposalFormValues } from '@/organisms/proposal-form'
import ProposalTemplate from '@/templates/proposal-template'

import { createProposal } from '../api/proposal.actions'
import { useGroupPolicies } from '../hooks/use-query'

export default function ProposalCreate() {
  const { toastErr, toastSuccess } = useTxToasts()
  const [newProposalId, setNewProposalId] = useState<string>()
  const { groupId } = useParams()
  const { data: policies } = useGroupPolicies(groupId)
  const [policy] = policies ?? []
  async function handleCreate(values: ProposalFormValues): Promise<boolean> {
    try {
      const { transactionHash, proposalId } = await createProposal(values)
      values.group_policy_address = policy.address
      setNewProposalId(proposalId?.toString())
      toastSuccess(transactionHash, 'Vote created!')
      return true
    } catch (err) {
      console.error('err', err)
      handleError(err)
      toastErr(err, 'Vote could not be created:')
      return false
    }
  }

  if (!Wallet.account?.address) return null

  return (
    <ProposalTemplate
      groupPolicyAddr={policy.address}
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
