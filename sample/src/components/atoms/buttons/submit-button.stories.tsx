import type { Meta, StoryObj } from '@storybook/react'
import SubmitButton from '@/components/atoms/buttons/submit-button'

const meta: Meta<typeof SubmitButton> = {
  title: 'atoms/buttons/submit-button',
  component: SubmitButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SubmitButton>

export const Default: Story = {
  args: {
    children: 'SUBMIT',
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    children: 'SUBMIT',
    disabled: true,
  },
}
