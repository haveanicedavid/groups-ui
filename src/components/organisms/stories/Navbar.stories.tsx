import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AppHeader } from '../AppHeader'

export default {
  title: 'Organisms/Navbar',
  component: AppHeader,
  argTypes: {},
} as ComponentMeta<typeof AppHeader>

const Template: ComponentStory<typeof AppHeader> = () => <AppHeader />

export const Component = Template.bind({})
Component.args = {}
