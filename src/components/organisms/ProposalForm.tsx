import { useState } from 'react'
import { type FieldError, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { type MemberFormValues, defaultMemberFormValues } from 'models'
import { SPACING } from 'util/constants'
import { truncate } from 'util/helpers'
import { valid } from 'util/validation/zod'

import {
  Button,
  DeleteButton,
  Flex,
  FormCard,
  FormControl,
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
import { InputWithButton } from '@/molecules'
import {
  FieldControl,
  InputField,
  RadioGroupField,
  TextareaField,
} from '@/molecules/FormFields'

import { DeleteIcon } from 'assets/tsx'

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
  metadata?: string
  proposers?: Array<string>
  Exec: Exec
}

export const defaultProposalFormValues: ProposalFormValues = {
  group_policy_address: '',
  metadata: '',
  proposers: [],
  Exec: 1,
}

const resolver = zodResolver(
  z.object({
    group_policy_address: valid.bech32,
    metadata: valid.json.optional(),
    proposers: valid.bech32.array(),
  }),
)

export const ProposalForm = ({
  btnText = 'Submit',
  defaultValues,
  onSubmit,
}: {
  btnText?: string
  defaultValues: ProposalFormValues
  onSubmit: (data: ProposalFormValues) => void
}) => {
  const [proposerAddr, setProposerAddr] = useState('')
  const form = useForm<ProposalFormValues>({ defaultValues, resolver })
  const {
    fields: proposerFields,
    append,
    remove,
  } = useFieldArray({ control: form.control })
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
    if (proposerFields.find((m) => m === addr)) {
      form.setError('proposers', { type: 'invalid', message: 'Address already added' })
      return false
    }
    try {
      valid.bech32.parse(addr)
      return true
    } catch (err) {
      if (err instanceof z.ZodError) {
        form.setError('proposers', { type: 'invalid', message: err.issues[0].message })
      }
      return false
    }
  }

  function addMember(): void {
    if (!validateAddress(proposerAddr)) return
    const member: MemberFormValues = { ...defaultMemberFormValues, address: proposerAddr }
    append(member)
    setProposerAddr('')
  }

  return (
    <FormCard>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack spacing={SPACING.formStack}>
            <InputField required name="name" label="Group name" />
            <TextareaField name="description" label="Description" />
            <InputField name="forumLink" label="Link to forum" />
            <TextareaField name="otherMetadata" label="Other metadata" />
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
                  onBtnClick={addMember}
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
                      <Th>Proposers added</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {controlledProposerFields.map((proposer, i) => (
                      <Tr key={i + proposer.address}>
                        <Td>{proposer.address}</Td>
                        <Td pr={0}>
                          <Flex>
                            <DeleteButton ml={2} onClick={() => remove(i)} />
                          </Flex>
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
