import { useState } from 'react'
import { type MsgCreateGroup } from '@haveanicedavid/groups-ui-telescope/types/proto/cosmos/group/v1/tx'
import { MemberRequest } from '@haveanicedavid/groups-ui-telescope/types/proto/cosmos/group/v1/types'
import { useForm } from '@mantine/form'

import { walletStore } from 'store'

import {
  Box,
  Button,
  Paper,
  Radio,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
} from '@/atoms'

type FormValues = {
  admin: string
  name: string
  description?: string
  otherMetadata?: string
  members: MemberRequest[]
}

const initialValues: FormValues = {
  admin: '',
  name: '',
  description: undefined,
  otherMetadata: undefined,
  members: [],
}

// function transformValues(values: FormValues): MsgCreateGroup {
//   const { admin, name, description, otherMetadata, members } = values
//   const metadata = {
//     name,
//     description,
//     otherMetadata,
//   }
//   return {
//     admin,
//     members,
//     metadata: JSON.stringify(metadata),
//   }
// }

export const CreateGroupForm = ({
  handleSubmit,
}: {
  handleSubmit: (values: MsgCreateGroup) => void
}) => {
  const [nextMemberAddress, setNextMemberAddress] = useState('')
  // TODO: Validation
  const form = useForm({ initialValues })
  const { members } = form.values

  function addGroupMember() {
    // TODO: validate address
    if (nextMemberAddress.length < 4) {
      form.errors.members = 'Address is too short'
      return
    }
    const member: MemberRequest = {
      address: nextMemberAddress,
      weight: '1',
      metadata: '',
    }
    members.push(member)
    setNextMemberAddress('')
    // form.setFieldValue(`members[${nextIndex}]`, member)
  }

  if (!walletStore.account) return <>Loading...</>
  return (
    <Paper px="lg" py="xl">
      {/* <form onSubmit={form.onSubmit((values) => handleSubmit(values))}> */}
      <form onSubmit={form.onSubmit(console.log)}>
        <Stack>
          <Radio.Group
            withAsterisk
            orientation="vertical"
            label="Group admin"
            onChange={(value) => form.setFieldValue('admin', value)}
          >
            <Radio value="group-policy" label="Group Policy" />
            <Radio
              value={walletStore.account.address}
              label={walletStore.account.address}
            />
          </Radio.Group>
          <TextInput withAsterisk label="Group Name" {...form.getInputProps('name')} />
          <Textarea label="Description" {...form.getInputProps('description')} />
          <Textarea label="Other Metadata" {...form.getInputProps('otherMetadata')} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 8,
            }}
          >
            <TextInput
              label="Add member accounts"
              value={nextMemberAddress}
              onChange={(e) => setNextMemberAddress(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <Button variant="outline" size="sm" onClick={addGroupMember} px="xs">
              + Add
            </Button>
          </Box>
          {members.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <td>Accounts Added</td>
                  <td>Weight</td>
                  <td />
                </tr>
              </thead>
              <tbody>
                {form.values.members.map((member, i) => (
                  <tr key={i + member.address}>
                    <td>
                      <Text>{member.address}</Text>
                    </td>
                    <td>{member.weight}</td>
                    <td>X</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Stack>
      </form>
    </Paper>
  )
}
