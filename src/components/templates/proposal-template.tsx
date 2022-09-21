import { useState } from 'react'

import type { GroupWithPolicyFormValues } from 'types'

import { useSteps } from 'hooks/chakra'

import { AnimatePresence, HorizontalSlide } from '@/animations'
import { Button, Flex, Heading, PageContainer, RouteLink, Stack, Text } from '@/atoms'
import { PageStepper } from '@/molecules'
import { type GroupFormValues, GroupForm, GroupFormKeys } from '@/organisms/group-form'
import {
  type GroupPolicyFormValues,
  GroupPolicyForm,
} from '@/organisms/group-policy-form'
import {
  ProposalForm,
  ProposalFormKeys,
  ProposalFormValues,
} from '@/organisms/proposal-form'

const Finished = ({ text, linkTo }: { text: string; linkTo: string }) => (
  <Stack spacing={8}>
    <Text>{text}</Text>
    <Button as={RouteLink} to={linkTo} alignSelf="center">
      View your proposal page
    </Button>
  </Stack>
)

export default function ProposalTemplate({
  initialProposalFormValues,
  disabledProposalFormFields,
  linkToProposalId,
  groupPolicyAddr,
  submit,
  steps,
  text,
}: {
  disabledProposalFormFields?: ProposalFormKeys[]
  initialProposalFormValues: ProposalFormValues
  /** ID of group, used for redirect link */
  linkToProposalId?: string
  groupPolicyAddr: string
  submit: (values: ProposalFormValues) => Promise<boolean>
  steps: string[]
  text: {
    submitBtn?: string
    finished: string
  }
}) {
  const { activeStep, nextStep, prevStep /* reset, setStep */ } = useSteps({
    initialStep: 0,
  })
  const [proposalValues, setProposalValues] = useState<ProposalFormValues>(
    initialProposalFormValues,
  )
  const [submitting, setSubmitting] = useState(false)
  const [priorStep, setPriorStep] = useState(0)

  async function handleSubmit(proposalValues: ProposalFormValues) {
    setSubmitting(true)
    const success = await submit({
      ...proposalValues,
      group_policy_address: groupPolicyAddr,
    })
    setSubmitting(false)
    if (success) nextStep()
  }

  function handlePrev() {
    setPriorStep(activeStep)
    prevStep()
  }

  function renderStep() {
    switch (activeStep) {
      case 0:
        return (
          <HorizontalSlide key="step-0" fromRight={priorStep !== 0}>
            <Text>With Policy Address: {groupPolicyAddr}</Text>
            <ProposalForm
              disabledFields={disabledProposalFormFields}
              onSubmit={handleSubmit}
              defaultValues={proposalValues}
              btnText="Next"
            />
          </HorizontalSlide>
        )
      case 1:
        return (
          <HorizontalSlide key="step-2">
            <Finished
              text={text.finished}
              linkTo={linkToProposalId ? `/proposals/${linkToProposalId}/details` : '/'}
            />
          </HorizontalSlide>
        )
      default:
        return null
    }
  }

  return (
    <Flex flexDir="column">
      <PageStepper activeStep={activeStep} steps={steps} />
      <PageContainer>
        <Heading textAlign="center" mb={8}>
          {steps[activeStep]}
        </Heading>
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </PageContainer>
    </Flex>
  )
}
