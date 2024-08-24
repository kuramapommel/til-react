import ProductDeletionForm from '@/components/molecules/forms/products/product-deletion-form'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ProductDeletionForm> = {
  title: 'molecules/forms/products/product-deletion-form',
  component: ProductDeletionForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ProductDeletionForm>

/**
 * 活性化時
 */
export const Default: Story = {
  args: {
    selectedProduct: {
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
