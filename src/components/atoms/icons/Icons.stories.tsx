import { ComponentMeta, ComponentStory } from '@storybook/react'

import { GroupsIcon } from './GroupsIcon'

export default {
  title: 'Icons/Groups Icon',
  component: GroupsIcon,
  argTypes: {
    color: {
      options: ['primary', 'secondary'],
      control: 'radio',
    },
  },
} as ComponentMeta<typeof GroupsIcon>

const Template: ComponentStory<typeof GroupsIcon> = () => (
  <div style={{ height: 50, width: 50 }}>
    <GroupsIcon />
  </div>
)

export const Component = Template.bind({})
Component.args = {}
