import type { Meta, StoryObj } from '@storybook/react'
import LoginForm from './login-form'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const meta: Meta<typeof LoginForm> = {
  title: 'LoginForm',
  component: LoginForm,
}

export default meta

type Story = StoryObj<typeof LoginForm>

export const Default: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </MemoryRouter>
  ),
}
