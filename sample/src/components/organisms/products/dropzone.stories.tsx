import Dropzone from '@/components/organisms/products/dropzone'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const meta: Meta<typeof Dropzone> = {
  title: 'organisms/products/dropzone',
  component: Dropzone,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Dropzone>

/**
 * 一括登録ボタン
 */
export const Default: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null)
    return <Dropzone file={file} setFile={setFile} />
  },
}
