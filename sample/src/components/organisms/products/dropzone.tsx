import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type Props = {
  file: File | null
  setFile: (file: File) => void
}

const DropZone = React.memo(function DropZone({ file, setFile }: Props) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const importFile = acceptedFiles[0]
      if (!importFile) return

      setFile(importFile)
    },
    [setFile],
  )
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
  })
  const message = useCallback(() => {
    if (file) return `${file.name} が読み込まれています`

    if (isDragReject)
      return 'ファイル形式が不正、もしくは複数のファイル取り込もうとしています。'

    if (isDragActive && isDragAccept) return '読み込み可能な形式です'

    return 'ファイルをここに D&D するか、クリックしてファイルを選択してください'
  }, [file, isDragReject, isDragActive, isDragAccept])

  return (
    <div
      {...getRootProps()}
      className={`w-full min-h-56 border-dashed border-gray-800 border-2 flex items-center rounded-3xl justify-center ${file ? 'bg-green-200' : ''}`}
    >
      <input {...getInputProps()} />
      <p className="text-center">{message()}</p>
    </div>
  )
})

export default DropZone
