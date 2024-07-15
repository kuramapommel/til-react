/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'

const styles = {
  modal: css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  `,
  overlay: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  `,
}

type FormModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactElement<HTMLFormElement>
}
const FormModal: React.FC<FormModalProps> = (props) => {
  return (
    props.isOpen && (
      <>
        <div css={styles.overlay} onClick={props.onClose} />
        <div css={styles.modal}>{props.children}</div>
      </>
    )
  )
}

export default FormModal
