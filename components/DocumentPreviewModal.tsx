"use client"

import { useState } from "react"
import { X, Download, ExternalLink } from "lucide-react"
import type { Document } from "../types/resources"

interface DocumentPreviewModalProps {
  document: Document | null
  isOpen: boolean
  onClose: () => void
  onDownload: (documentId: number, fileUrl: string, title: string) => void
}

export default function DocumentPreviewModal({ document, isOpen, onClose, onDownload }: DocumentPreviewModalProps) {
  const [loading, setLoading] = useState(true)

  if (!isOpen || !document) return null

  const handleDownload = () => {
    onDownload(document.id, document.fileUrl, document.title)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{document.title}</h3>
            <p className="text-sm text-gray-600">{document.description}</p>
          </div>
          <button onClick={onClose} className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg h-96 flex items-center justify-center mb-6">
            {document.previewUrl ? (
              <iframe
                src={document.previewUrl}
                className="w-full h-full rounded-lg"
                onLoad={() => setLoading(false)}
                title={`Preview of ${document.title}`}
              />
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600">Preview not available</p>
                <p className="text-sm text-gray-500">Click download to view the full document</p>
              </div>
            )}
          </div>

          {/* Document Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>Type: {document.type}</span>
              <span>Size: {document.size}</span>
              <span>Date: {document.date}</span>
              <span>Downloads: {document.downloads}</span>
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
