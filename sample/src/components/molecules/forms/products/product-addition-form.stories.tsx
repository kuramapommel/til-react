import ProductAdditionForm from '@/components/molecules/forms/products/product-addition-form'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ProductAdditionForm> = {
  title: 'molecules/forms/products/product-addition-form',
  component: ProductAdditionForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ProductAdditionForm>

/**
 * 活性化時
 *
 * イメージURL には `https://placehold.jp/150x150.png` などを利用すると動作確認できます
 */
export const Default: Story = {
  args: {
    afterSubmit: () => alert('submit されました'),
  },
}
