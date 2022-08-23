import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Loader } from '../Loader'

export default {
  title: 'Molecules/Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>

const Template: ComponentStory<typeof Loader> = () => <Loader />

export const Component = Template.bind({})
