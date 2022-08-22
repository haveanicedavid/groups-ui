import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ActionIcon, GroupsIcon } from '@/atoms'

// import { IconButton } from '../MuiReExports'

export default {
  title: 'Atoms/IconButton',
  component: ActionIcon,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: 'radio',
    },
    color: {
      options: ['primary', 'secondary'],
      control: 'radio',
    },
  },
} as ComponentMeta<typeof ActionIcon>

const Template: ComponentStory<typeof ActionIcon> = (args) => (
  <ActionIcon {...args}>
    <GroupsIcon />
  </ActionIcon>
)

export const Component = Template.bind({})
Component.args = {}
