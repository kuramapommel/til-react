import React from 'react'

interface SubmitButtonProps {
  /**
   * ボタンのテキスト
   */
  children: string

  /**
   * ボタンの活性・非活性
   */
  disabled: boolean

  className?: string
}

/**
 * フォームの送信ボタン
 */
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
