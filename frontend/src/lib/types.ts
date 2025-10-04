export interface LearningNode {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  estimatedTime: number // in hours
  actualTime?: number // in hours
  notes: string
  resources: Resource[]
  position: { x: number; y: number }
  parentNodes: string[]
  childNodes: string[]
  createdAt: Date
  updatedAt: Date
}

export interface LearningEdge {
  id: string
  source: string
  target: string
  type: "prerequisite" | "related" | "optional"
}

export interface LearningPath {
  id: string
  title: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  nodes: LearningNode[]
  edges: LearningEdge[]
  isTemplate: boolean
  isPublic: boolean
  createdBy: string
  totalEstimatedTime: number
  progress: number
  createdAt: Date
  updatedAt: Date
}

export interface Resource {
  id: string
  title: string
  url: string
  type: "article" | "video" | "book" | "course" | "documentation" | "practice"
  description?: string
}

export interface NodeNote {
  id: string
  nodeId: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface StudySession {
  id: string
  pathId: string
  nodeId: string
  duration: number
  date: Date
  notes?: string
}

export interface UserProgress {
  pathId: string
  completedNodes: string[]
  inProgressNodes: string[]
  totalTimeSpent: number
  lastStudied: Date
}