import React from 'react'

type SubmitButtonProps = {
  children: string
  disabled: boolean
  className?: string
}

const SubmitButton: React.FC<SubmitButtonProps> = React.memo(
  function SubmitButton(props: SubmitButtonProps) {
    const buttonStyleClasses = `text-xl w-28 bg-green-600 text-white p-2 border-none rounded-md cursor-pointer ${props.className} ${props.disabled ? 'opacity-50' : 'hover:bg-green-700'}`

    return (
      <button
        type="submit"
        className={buttonStyleClasses}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    )
  },
)

export default SubmitButton
