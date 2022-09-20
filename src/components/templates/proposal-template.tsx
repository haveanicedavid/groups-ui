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
  submit,
  steps,
  text,
}: {
  disabledProposalFormFields?: ProposalFormKeys[]
  initialProposalFormValues: ProposalFormValues
  /** ID of group, used for redirect link */
  linkToProposalId?: string
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

  function handleProposalSubmit(values: ProposalFormValues) {
    setProposalValues(values)
    nextStep()
  }

  function handlePrev() {
    setPriorStep(activeStep)
    prevStep()
  }

  async function handleSubmit(policyValues: ProposalFormValues) {
    setSubmitting(true)
    const success = await submit({
      ...proposalValues,
    })
    setSubmitting(false)
    if (success) nextStep()
  }

  function renderStep() {
    switch (activeStep) {
      case 0:
        return (
          <HorizontalSlide key="step-0" fromRight={priorStep !== 0}>
            <ProposalForm
              disabledFields={disabledProposalFormFields}
              onSubmit={handleProposalSubmit}
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
