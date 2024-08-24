import ProductEditingForm from '@/components/molecules/forms/products/product-editing-form'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ProductEditingForm> = {
  title: 'molecules/forms/products/product-editing-form',
  component: ProductEditingForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ProductEditingForm>

/**
 * 活性化時
 *
 * イメージURL には `https://placehold.jp/150x150.png` などを利用すると動作確認できます
 */
export const Default: Story = {
  args: {
    initialCurrentProduct: {
      id: 123,
      name: '商品A',
      image: '商品.jpg',
      price: 12000,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis alias, reiciendis commodi possimus, maiores accusantium, iusto repellendus minima labore libero eius magnam impedit?',
    },
    handleCancel: () => alert('キャンセル'),
    afterSubmit: () => alert('submit されました'),
  },
}
