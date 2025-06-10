export interface Document {
  id: number
  title: string
  type: string
  size: string
  date: string
  description: string
  thumbnail?: string
  downloads: number
  fileUrl: string
  previewUrl?: string
  category: string
}

export interface DocumentGroup {
  id: number
  title: string
  description: string
  color: string
  icon: string
  category: string
  documents: Document[]
}

export interface Video {
  id: number
  title: string
  thumbnail: string
  date: string
  duration: string
  description: string
  videoUrl: string
  views: number
  category: string
}
