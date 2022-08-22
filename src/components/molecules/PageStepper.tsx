import { Box, Stepper } from '@/atoms'

export const PageStepper = (props: { activeStep: number; steps: string[] }) => {
  const { activeStep, steps } = props
  return (
    <Box sx={{ py: 2.5, width: '100%', bgcolor: 'action.selected' }}>
      <Stepper active={activeStep}>
        {steps.map((step, i) => (
          <Stepper.Step key={`${step}-${i}`} label={step}>
            Content
          </Stepper.Step>
        ))}
      </Stepper>
    </Box>
  )
}
