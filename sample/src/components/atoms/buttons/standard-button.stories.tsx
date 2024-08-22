import StandardButton from '@/components/atoms/buttons/standard-button'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof StandardButton> = {
  title: 'atoms/buttons/standard-button',
  component: StandardButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof StandardButton>

/**
 * 活性化時
 */
export const Default: Story = {
  args: {
    onclick: () => alert('標準ボタンが押下されました'),
    name: '活性状態',
    disabled: false,
  },
}

/**
 * 非活性化時
 */
export const Disabled: Story = {
  args: {
    onclick: () => alert('error'),
    name: '非活性状態',
    disabled: true,
  },
}
