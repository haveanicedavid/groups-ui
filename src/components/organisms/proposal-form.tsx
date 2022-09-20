import { useState } from 'react'
import { type FieldError, FormProvider, useFieldArray, useForm } from 'react-hook-form'
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
  NumberInput,
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
  metadata: string
  proposers: ProposerFormValues[]
  Exec: Exec
}

export type ProposalFormKeys = keyof ProposalFormValues

export const defaultProposalFormValues: ProposalFormValues = {
  group_policy_address: '',
  metadata: '',
  proposers: [],
  Exec: 1,
}

const resolver = zodResolver(
  z.object({
    group_policy_address: valid.bech32Address,
    metadata: valid.json.optional(),
    proposers: valid.bech32Address.array(),
  }),
)

export const ProposalForm = ({
  btnText = 'Submit',
  defaultValues,
  disabledFields = [],
  onSubmit,
}: {
  btnText?: string
  defaultValues: ProposalFormValues
  disabledFields?: ProposalFormKeys[]
  onSubmit: (data: ProposalFormValues) => void
}) => {
  const [proposerAddr, setProposerAddr] = useState('')
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
              value which is associated with the `members` array, but doesn't
              directly add to it */}
              <FieldControl
                required
                error={errors.proposers as FieldError} // TODO fix type cast
                name="memberAddr"
                label="Add member accounts"
                helperText="Input the addresses of the members of this group."
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
            <Flex justify="end">
              <Button type="submit">{btnText}</Button>
            </Flex>
          </Stack>
        </form>
      </FormProvider>
    </FormCard>
  )
}
