"use client"

import { Handle, Position } from "@xyflow/react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, Circle, PlayCircle } from "lucide-react"
import { LearningNode } from "@/lib/types"

interface LearningNodeProps {
  data: LearningNode
  selected: boolean
}

export function LearningNodeComponent({ data, selected }: LearningNodeProps) {
  const statusConfig = {
    pending: {
      icon: Circle,
      color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      borderColor: "border-gray-300"
    },
    "in-progress": {
      icon: PlayCircle,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      borderColor: "border-blue-300"
    },
    completed: {
      icon: CheckCircle,
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      borderColor: "border-green-300"
    }
  }

  const config = statusConfig[data.status]
  const StatusIcon = config.icon

  return (
    <Card className={`min-w-[200px] max-w-[250px] ${config.borderColor} ${selected ? 'ring-2 ring-primary' : ''}`}>
      <Handle type="target" position={Position.Top} />
      
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-sm leading-tight">{data.title}</h3>
          <StatusIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
        </div>
        
        <p className="text-xs text-muted-foreground line-clamp-2">
          {data.description}
        </p>
        
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={`text-xs ${config.color}`}>
            {data.status.replace("-", " ")}
          </Badge>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {data.estimatedTime}h
          </div>
        </div>
      </div>
      
      <Handle type="source" position={Position.Bottom} />
    </Card>
  )
}