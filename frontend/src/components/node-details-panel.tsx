"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { LearningNode, Resource } from "@/lib/types"
import { 
  Clock, 
  FileText, 
  MessageSquare, 
  Link, 
  Plus, 
  Trash2, 
  Edit3,
  CheckCircle,
  Circle,
  PlayCircle
} from "lucide-react"

interface NodeDetailsPanelProps {
  node: LearningNode | null
  onClose: () => void
  onUpdateNode: (nodeId: string, updates: Partial<LearningNode>) => void
  onDeleteNode: (nodeId: string) => void
}

export function NodeDetailsPanel({ node, onClose, onUpdateNode, onDeleteNode }: NodeDetailsPanelProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<LearningNode>>({})
  const [newResource, setNewResource] = useState({ title: "", url: "", type: "article" as Resource["type"] })

  if (!node) return null

  const handleSave = () => {
    onUpdateNode(node.id, editData)
    setIsEditing(false)
    setEditData({})
  }

  const handleStatusChange = (status: LearningNode["status"]) => {
    onUpdateNode(node.id, { status })
  }

  const handleAddResource = () => {
    if (newResource.title && newResource.url) {
      const resource: Resource = {
        id: Date.now().toString(),
        ...newResource
      }
      onUpdateNode(node.id, {
        resources: [...node.resources, resource]
      })
      setNewResource({ title: "", url: "", type: "article" })
    }
  }

  const statusOptions = [
    { value: "pending", label: "Pending", icon: Circle },
    { value: "in-progress", label: "In Progress", icon: PlayCircle },
    { value: "completed", label: "Completed", icon: CheckCircle }
  ]

  return (
    <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-96 bg-background border-l shadow-lg z-50 overflow-y-auto">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold">Node Details</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
      </div>

      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{node.title}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Status */}
          <div className="flex gap-1">
            {statusOptions.map((option) => {
              const Icon = option.icon
              return (
                <Button
                  key={option.value}
                  variant={node.status === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusChange(option.value as LearningNode["status"])}
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {option.label}
                </Button>
              )
            })}
          </div>
        </div>

        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">
              <FileText className="h-4 w-4 mr-1" />
              Details
            </TabsTrigger>
            <TabsTrigger value="notes">
              <Edit3 className="h-4 w-4 mr-1" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="chat">
              <MessageSquare className="h-4 w-4 mr-1" />
              AI Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-4">
            {/* Time Tracking */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Time Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Estimated:</span>
                  <span>{node.estimatedTime}h</span>
                </div>
                {node.actualTime && (
                  <div className="flex justify-between text-sm">
                    <span>Actual:</span>
                    <span>{node.actualTime}h</span>
                  </div>
                )}
                {isEditing && (
                  <Input
                    type="number"
                    placeholder="Update estimated time"
                    value={editData.estimatedTime || node.estimatedTime}
                    onChange={(e) => setEditData({
                      ...editData,
                      estimatedTime: parseInt(e.target.value) || 0
                    })}
                  />
                )}
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Description</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editData.description || node.description}
                    onChange={(e) => setEditData({
                      ...editData,
                      description: e.target.value
                    })}
                    rows={4}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{node.description}</p>
                )}
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {node.resources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="text-sm font-medium">{resource.title}</p>
                      <p className="text-xs text-muted-foreground">{resource.type}</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <Link className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                ))}
                
                {isEditing && (
                  <div className="space-y-2 pt-2 border-t">
                    <Input
                      placeholder="Resource title"
                      value={newResource.title}
                      onChange={(e) => setNewResource({
                        ...newResource,
                        title: e.target.value
                      })}
                    />
                    <Input
                      placeholder="Resource URL"
                      value={newResource.url}
                      onChange={(e) => setNewResource({
                        ...newResource,
                        url: e.target.value
                      })}
                    />
                    <Button onClick={handleAddResource} size="sm" className="w-full">
                      <Plus className="h-3 w-3 mr-1" />
                      Add Resource
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Personal Notes</CardTitle>
                <CardDescription className="text-xs">
                  Write your thoughts, insights, and reminders about this topic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={editData.notes !== undefined ? editData.notes : node.notes}
                  onChange={(e) => setEditData({
                    ...editData,
                    notes: e.target.value
                  })}
                  placeholder="Add your notes here..."
                  rows={8}
                />
                <Button 
                  onClick={() => onUpdateNode(node.id, { notes: editData.notes || "" })}
                  className="mt-2 w-full"
                  size="sm"
                >
                  Save Notes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">AI Assistant</CardTitle>
                <CardDescription className="text-xs">
                  Ask questions about this topic (Coming Soon)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">AI Chat will be available soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t">
          {isEditing && (
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
          )}
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDeleteNode(node.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}