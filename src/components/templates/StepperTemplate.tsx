import { ReactNode } from 'react'

import { Paper, Stack, Stepper, Title } from '@/atoms'

import { PageTemplate } from './PageTemplate'

export const StepperTemplate = (p: {
  children: ReactNode
  activeStep: number
  steps: string[]
}) => {
  return (
    <Stack justify="flex-start">
      <Paper p="lg" shadow="md">
        <Stepper active={p.activeStep}>
          {p.steps.map((step, i) => (
            <Stepper.Step key={`${step}-${i}`} label={step} />
          ))}
        </Stepper>
      </Paper>
      <PageTemplate>
        <Title order={2} sx={{ textAlign: 'center' }} mb="md">
          {p.steps[p.activeStep]}
        </Title>
        {p.children}
      </PageTemplate>
    </Stack>
  )
}
