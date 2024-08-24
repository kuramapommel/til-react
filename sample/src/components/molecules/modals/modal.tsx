import React, { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  isOpen: boolean
  children: React.ReactNode
  onCancel: () => void
}

const Modal = React.memo(function Modal({
  isOpen = false,
  children,
  onCancel,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const open = useCallback(() => dialogRef.current?.showModal(), [])
  const close = useCallback(() => dialogRef.current?.close(), [])

  useEffect(() => {
    const switchOpenClose = isOpen ? open : close
    switchOpenClose()
  }, [isOpen, open, close])

  return (
    <>
      {isOpen &&
        createPortal(
          <dialog
            ref={dialogRef}
            className="min-w-96 bg-white border-none rounded-md"
            onClose={onCancel}
            onClick={onCancel}
          >
            <div
              className="flex flex-col justify-center p-0 m-0"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </dialog>,
          document.body,
        )}
    </>
  )
})

export default Modal
