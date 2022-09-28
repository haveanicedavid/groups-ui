import { useState } from 'react'
import { type FieldError, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import {
  Box,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { truncate } from 'util/helpers'
import { SPACING } from 'util/style.constants'
import { valid } from 'util/validation/zod'

import {
  Button,
  DeleteButton,
  Flex,
  FormCard,
  FormControl,
  HStack,
  IconButton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@/atoms'
import { InputWithButton, Truncate } from '@/molecules'
import { FieldControl, TextareaField } from '@/molecules/form-fields'

import { ProposerFormValues } from '../../types/proposal.types'

export declare enum Exec {
  /**
   * EXEC_UNSPECIFIED - An empty value means that there should be a separate
   * MsgExec request for the proposal to execute.
   */
  EXEC_UNSPECIFIED = 0,
  /**
   * EXEC_TRY - Try to execute the proposal immediately.
   * If the proposal is not allowed per the DecisionPolicy,
   * the proposal will still be open and could
   * be executed at a later point.
   */
  EXEC_TRY = 1,
  UNRECOGNIZED = -1,
}

/** @see @haveanicedavid/cosmos-groups-ts/types/proto/cosmos/group/v1/types */
export type ProposalFormValues = {
  group_policy_address: string
  msgToAddr: string
  amount: number
  metadata: string
  proposers: ProposerFormValues[]
  Exec: Exec
}

export type ProposalFormKeys = keyof ProposalFormValues

export const defaultProposalFormValues: ProposalFormValues = {
  group_policy_address: '',
  metadata: '',
  amount: 150,
  msgToAddr: '',
  proposers: [],
  Exec: -1,
}

const resolver = zodResolver(
  z.object({
    metadata: valid.json.optional(),
    amount: valid.positiveNumber,
    msgToAddr: valid.bech32Address,
    proposers: valid.proposers,
  }),
)

export const ProposalForm = ({
  btnText = 'Submit',
  defaultValues,
  isLoading,
  disabledFields = [],
  onSubmit,
}: {
  btnText?: string
  defaultValues: ProposalFormValues
  isLoading: boolean
  disabledFields?: ProposalFormKeys[]
  onSubmit: (data: ProposalFormValues) => void
}) => {
  const [proposerAddr, setProposerAddr] = useState('')
  const [msgToAddr, setMsgToAddr] = useState('')
  const [amount, setAmount] = useState(150)
  const form = useForm<ProposalFormValues>({ defaultValues, resolver })
  const {
    fields: proposerFields,
    append,
    remove,
  } = useFieldArray({ control: form.control, name: 'proposers' })
  const {
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = form

  const watchFieldArray = watch('proposers')

  const controlledProposerFields = proposerFields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    }
  })

  function validateAddress(addr: string): boolean {
    if (proposerFields.find((m) => m.address === addr)) {
      form.setError('proposers', { type: 'invalid', message: 'Address already added' })
      return false
    }
    try {
      valid.bech32Address.parse(addr)
      return true
    } catch (err) {
      if (err instanceof z.ZodError) {
        form.setError('proposers', { type: 'invalid', message: err.issues[0].message })
      }

      return false
    }
  }

  function addProposer(): void {
    if (!validateAddress(proposerAddr)) return
    const proposer: ProposerFormValues = { address: proposerAddr }
    append(proposer)
    setProposerAddr('')
  }

  return (
    <FormCard>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack spacing={SPACING.formStack}>
            <TextareaField name="metadata" label="Proposal metadata" />
            <Flex>
              {/* Because of how the form is structured, we need a controlled
              value which is associated with the `proposers` array, but doesn't
              directly add to it */}
              <FieldControl
                required
                error={errors.proposers as FieldError} // TODO fix type cast
                name="proposerAddr"
                label="Add proposers accounts"
                helperText="Input the addresses of the proposers of this group."
              >
                <InputWithButton
                  name="proposerAddr"
                  value={proposerAddr}
                  onChange={(e) => {
                    if (errors.proposers) {
                      form.clearErrors('proposers')
                    }
                    setProposerAddr(e.target.value)
                  }}
                  onBtnClick={addProposer}
                >
                  {'+ Add'}
                </InputWithButton>
              </FieldControl>
            </Flex>
            {controlledProposerFields.length > 0 && (
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Accounts added</Th>
                      <Th>Weight</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {controlledProposerFields.map((member, i) => (
                      <Tr key={i + member.address}>
                        <Td>
                          <Truncate
                            text={member.address}
                            headLength={18}
                            tailLength={22}
                            tooltipProps={{ maxW: 450 }}
                          />
                        </Td>
                        <Td>
                          <HStack spacing={4}>
                            <DeleteButton onClick={() => remove(i)} />
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
            <Flex dir="column">
              <Box>
                <FormControl>
                  <FormLabel> Send funds to this account: </FormLabel>
                  <Input
                    name="msgToAddr"
                    value={msgToAddr}
                    onChange={(e) => {
                      setMsgToAddr(e.target.value)
                      setValue('msgToAddr', e.target.value)
                    }}
                  ></Input>
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel>Amount to send:</FormLabel>
                  <NumberInput
                    value={amount}
                    name="amount"
                    defaultValue={150}
                    min={0}
                    max={999999}
                    onChange={(e) => {
                      setAmount(parseInt(e, 10))
                      setValue('amount', parseInt(e, 10))
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </Box>
            </Flex>
            <Flex justify="end">
              <Button isLoading={isLoading} type="submit">
                {btnText}
              </Button>
            </Flex>
          </Stack>
        </form>
      </FormProvider>
    </FormCard>
  )
}
