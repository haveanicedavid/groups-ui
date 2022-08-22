import { ReactNode } from 'react'

import { Stack, Title } from '@/atoms'
import { PageStepper } from '@/molecules'

import { PageTemplate } from './PageTemplate'

export const StepperTemplate = (props: {
  children: ReactNode
  activeStep: number
  steps: string[]
}) => {
  const { activeStep, children, steps } = props
  return (
    <Stack justify="flex-start">
      <PageStepper activeStep={activeStep} steps={steps} />
      <PageTemplate>
        <Title order={2} sx={{ textAlign: 'center' }}>
          {steps[activeStep]}
        </Title>
        {children}
      </PageTemplate>
    </Stack>
  )
}
