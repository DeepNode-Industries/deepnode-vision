'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, ImageIcon, File } from 'lucide-react'
import { cn, formatFileSize } from '@/lib/utils'

interface UploadZoneProps {
  onFileAccepted: (file: File) => void
  disabled?: boolean
}

export function UploadZone({ onFileAccepted, disabled }: UploadZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        onFileAccepted(acceptedFiles[0])
      }
    },
    [onFileAccepted]
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    disabled,
  })

  const currentFile = acceptedFiles[0]

  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer min-h-[280px] p-8',
        isDragActive && !isDragReject
          ? 'border-cyan-400 bg-cyan-500/10 shadow-neon-cyan'
          : isDragReject
          ? 'border-red-400 bg-red-500/10'
          : currentFile
          ? 'border-violet-500/50 bg-violet-500/5'
          : 'border-white/20 bg-white/2 hover:border-cyan-500/50 hover:bg-cyan-500/5',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <input {...getInputProps()} />

      <AnimatePresence mode="wait">
        {isDragActive ? (
          <motion.div
            key="drag"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="w-16 h-16 rounded-2xl border border-cyan-400/50 bg-cyan-400/20 flex items-center justify-center animate-pulse-neon">
              <Upload className="w-8 h-8 text-cyan-400" />
            </div>
            <p className="text-cyan-400 font-medium">Drop your document here</p>
          </motion.div>
        ) : currentFile ? (
          <motion.div
            key="file"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="w-16 h-16 rounded-2xl border border-violet-500/50 bg-violet-500/20 flex items-center justify-center">
              <FileIcon type={currentFile.type} />
            </div>
            <div>
              <p className="text-white font-medium text-sm truncate max-w-[200px]">{currentFile.name}</p>
              <p className="text-slate-500 text-xs mt-1">{formatFileSize(currentFile.size)}</p>
            </div>
            <p className="text-xs text-slate-500">Click or drop a new file to replace</p>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex flex-col items-center gap-5 text-center"
          >
            <div className="relative w-16 h-16 rounded-2xl border border-white/20 bg-white/5 flex items-center justify-center">
              <Upload className="w-7 h-7 text-slate-400" />
              <motion.div
                className="absolute inset-0 rounded-2xl border border-cyan-400/0"
                animate={{ borderColor: ['rgba(6,182,212,0)', 'rgba(6,182,212,0.4)', 'rgba(6,182,212,0)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <div>
              <p className="font-medium text-white mb-1">
                Drop your document here
              </p>
              <p className="text-sm text-slate-400">
                or <span className="text-cyan-400 underline underline-offset-2">browse files</span>
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {['PDF', 'JPG', 'PNG', 'WEBP'].map(fmt => (
                <span
                  key={fmt}
                  className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-xs text-slate-500"
                >
                  {fmt}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
              {['Invoice', 'Receipt', 'Contract', 'ID Card', 'Plate', 'PDF'].map(doc => (
                <div
                  key={doc}
                  className="rounded-lg border border-white/10 bg-white/5 p-2 text-center text-xs text-slate-500"
                >
                  {doc}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isDragReject && (
        <p className="absolute bottom-4 text-xs text-red-400">
          Unsupported file type. Use PDF, JPG, or PNG.
        </p>
      )}
    </div>
  )
}

function FileIcon({ type }: { type: string }) {
  if (type.startsWith('image/')) return <ImageIcon className="w-8 h-8 text-violet-400" />
  if (type === 'application/pdf') return <FileText className="w-8 h-8 text-violet-400" />
  return <File className="w-8 h-8 text-violet-400" />
}
