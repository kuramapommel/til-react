import BulkImportButton from '@/components/organisms/products/bulk-import-button'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof BulkImportButton> = {
  title: 'organisms/products/bulk-import-button',
  component: BulkImportButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof BulkImportButton>

/**
 * 一括登録ボタン
 */
export const Default: Story = {
  args: {},
}
