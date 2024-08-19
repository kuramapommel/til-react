import TimeListTable from '@/components/organisms/time-list-table'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TimeListTable> = {
  title: 'organisms/time-list-table',
  component: TimeListTable,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TimeListTable>

/**
 * ４部屋ある想定
 */
export const Default: Story = {
  args: {
    rooms: [
      {
        id: 'room-1',
        name: 'room-1',
        availables: [true, true, true, false, false],
      },
      {
        id: 'room-2',
        name: 'room-2',
        availables: [true, true, true, true, true],
      },
      {
        id: 'room-3',
        name: 'room-3',
        availables: [false, true, true, true, true],
      },
      {
        id: 'room-3',
        name: 'room-3',
        availables: [false, false, false, false, false],
      },
    ],
  },
}
