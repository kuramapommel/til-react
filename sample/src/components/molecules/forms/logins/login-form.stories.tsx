import LoginForm from '@/components/molecules/forms/logins/login-form'
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const meta: Meta<typeof LoginForm> = {
  title: 'molecules/forms/logins/login-form',
  component: LoginForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LoginForm>

/**
 * width: 100% を指定しているので、親オブジェクトで調整が必要です
 * 下記のバリデーションルールが適用されています
 * * ユーザー名：４文字以上
 * * パスワード：８文字以上
 */
export const Default: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </MemoryRouter>
  ),
}
