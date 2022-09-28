import { useState } from 'react'
import { type FieldError, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Select } from '@chakra-ui/react'
import { VoteOption } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Long } from '@osmonauts/helpers'
import { z } from 'zod'

import { SPACING } from 'util/style.constants'
import { valid } from 'util/validation/zod'

import {
  Button,
  DeleteButton,
  Flex,
  FormCard,
  HStack,
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
import { Exec } from '@/organisms/proposal-form'

import { ProposerFormValues } from '../../types/proposal.types'

/** @see @haveanicedavid/cosmos-groups-ts/types/proto/cosmos/group/v1/types */
export type VoteFormValues = {
  /** proposal is the unique ID of the proposal. */
  proposal_id: Long
  /** voter is the voter account address. */
  voter: string
  /** option is the voter's choice on the proposal. */
  option: number
  /** metadata is any arbitrary metadata to attached to the vote. */
  metadata: string
  /**
   * exec defines whether the proposal should be executed
   * immediately after voting or not.
   */
  exec: Exec
}

export type VoteFormKeys = keyof VoteFormValues

export const defaultVoteFormValues: VoteFormValues = {
  proposal_id: Long.fromInt(0),
  voter: '',
  metadata: '',
  option: 1,
  exec: 0,
}

const resolver = zodResolver(
  z.object({
    option: valid.voteOption,
  }),
)

export const VoteForm = ({
  btnText = 'Submit Vote',
  defaultValues,
  isLoading,
  disabledFields = [],
  onSubmit,
}: {
  btnText?: string
  isLoading: boolean
  defaultValues: VoteFormValues
  disabledFields?: VoteFormKeys[]
  onSubmit: (data: VoteFormValues) => void
}) => {
  const [option, setOption] = useState(1)
  const form = useForm<VoteFormValues>({ defaultValues, resolver })
  const {
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = form

  return (
    <FormCard>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack spacing={SPACING.formStack}>
            <Flex>
              <FieldControl
                required
                error={errors.option as FieldError} // TODO fix type cast
                name="option"
                label="Set Vote Option"
                helperText="Set the Vote Option"
              >
                <Select
                  size="lg"
                  name="option"
                  onChange={(e) => {
                    const newOption = parseInt(e.target.value, 10)
                    setOption(newOption)
                    setValue('option', newOption)
                  }}
                  value={option}
                >
                  <option value="1">Yes</option>
                  <option value="3">NO</option>
                  <option value="4">NO WITH VETO</option>
                  <option value="2">ABSTAIN</option>
                </Select>
              </FieldControl>
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
