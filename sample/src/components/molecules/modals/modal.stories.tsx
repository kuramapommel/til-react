import StandardButton from '@/components/atoms/buttons/standard-button'
import Modal from '@/components/molecules/modals/modal'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const meta: Meta<typeof Modal> = {
  title: 'molecules/modals/modal',
  component: Modal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Modal>

/**
 * 「開く」ボタン押下でモーダル展開時の挙動を確認することができます
 */
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <StandardButton onclick={() => setIsOpen(true)} name={'開く'} />
        <Modal isOpen={isOpen} onCancel={() => setIsOpen(false)}>
          <h1 className="text-center text-2xl mt-2 mb-5 mx-auto">モーダル</h1>
          <p className="text-base mb-5 mx-auto">
            モーダル内の要素は自由に設定できます
          </p>
          <StandardButton onclick={() => setIsOpen(false)} name={'閉じる'} />
          <div className="min-h-5" />
        </Modal>
      </>
    )
  },
}
