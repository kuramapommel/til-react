import React from 'react'

type Props = {
  onclick: () => void
  name: string
  disabled?: boolean
  classes?: string[]
}

const StandardButton = React.memo(function StandardButton({
  name,
  onclick,
  disabled = false,
  classes = [],
}: Props) {
  const style = `text-xl min-w-28 bg-green-600 text-white p-2 border-none rounded-md cursor-pointer ${disabled ? 'opacity-50' : 'hover:bg-green-700'} mx-auto${classes.map((className) => ` ${className}`).join('')}`

  return (
    <button
      type={'button'}
      onClick={onclick}
      className={style}
      disabled={disabled}
    >
      {name}
    </button>
  )
})

export default StandardButton
