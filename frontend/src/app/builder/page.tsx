"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LearningPathFlow } from "@/components/learning-path-flow"
import { sampleLearningPaths } from "@/lib/sample-learning-paths"
import { LearningPath, LearningNode } from "@/lib/types"
import { ArrowLeft, Save, Share, Settings } from "lucide-react"
import Link from "next/link"

export default function PathBuilderPage() {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null)
  const [learningPaths, setLearningPaths] = useState(sampleLearningPaths)
  const [newPathData, setNewPathData] = useState({
    title: "",
    description: "",
    difficulty: "Beginner" as const
  })

  const handleUpdatePath = (pathId: string, updates: Partial<LearningPath>) => {
    setLearningPaths(paths => 
      paths.map(path => 
        path.id === pathId ? { ...path, ...updates } : path
      )
    )
    
    if (selectedPath?.id === pathId) {
      setSelectedPath(prev => prev ? { ...prev, ...updates } : null)
    }
  }

  const handleCreateNewPath = () => {
    if (!newPathData.title.trim()) return
    
    const newPath: LearningPath = {
      id: `path-${Date.now()}`,
      title: newPathData.title,
      description: newPathData.description,
      difficulty: newPathData.difficulty,
      nodes: [],
      edges: [],
      isTemplate: false,
      isPublic: false,
      createdBy: "user-1",
      totalEstimatedTime: 0,
      progress: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    setLearningPaths(prev => [...prev, newPath])
    setSelectedPath(newPath)
    setNewPathData({ title: "", description: "", difficulty: "Beginner" })
  }

  const handleSelectTemplate = (path: LearningPath) => {
    // Create a copy of the template for editing
    const newPath: LearningPath = {
      ...path,
      id: `path-${Date.now()}`,
      title: `${path.title} (Copy)`,
      isTemplate: false,
      isPublic: false,
      createdBy: "user-1",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    setLearningPaths(prev => [...prev, newPath])
    setSelectedPath(newPath)
  }

  if (selectedPath) {
    return (
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedPath(null)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Paths
                </Button>
                <div>
                  <h1 className="text-xl font-semibold">{selectedPath.title}</h1>
                  <p className="text-sm text-muted-foreground">{selectedPath.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save Path
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Flow Editor */}
        <div className="flex-1">
          <LearningPathFlow
            learningPath={selectedPath}
            onUpdatePath={handleUpdatePath}
            isEditable={true}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Smart Learning Path Generator</h1>
        <p className="text-muted-foreground">
          Create custom learning paths or start from templates. Build visual roadmaps with connected topics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create New Path */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Learning Path</CardTitle>
              <CardDescription>Start building your custom learning journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Path Title</label>
                <Input
                  value={newPathData.title}
                  onChange={(e) => setNewPathData({ ...newPathData, title: e.target.value })}
                  placeholder="e.g., Full Stack JavaScript Development"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={newPathData.description}
                  onChange={(e) => setNewPathData({ ...newPathData, description: e.target.value })}
                  placeholder="Describe what this learning path covers..."
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Difficulty Level</label>
                <div className="flex space-x-2">
                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <Button
                      key={level}
                      variant={newPathData.difficulty === level ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewPathData({ 
                        ...newPathData, 
                        difficulty: level as "Beginner" | "Intermediate" | "Advanced" 
                      })}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
              <Button onClick={handleCreateNewPath} className="w-full">
                Create Learning Path
              </Button>
            </CardContent>
          </Card>

          {/* Your Paths */}
          <Card>
            <CardHeader>
              <CardTitle>Your Learning Paths</CardTitle>
              <CardDescription>Continue working on your custom paths</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {learningPaths.filter(path => !path.isTemplate).map((path) => (
                  <div key={path.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{path.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {path.nodes.length} topics • {path.progress}% complete
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedPath(path)}
                    >
                      Edit
                    </Button>
                  </div>
                ))}
                
                {learningPaths.filter(path => !path.isTemplate).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No custom paths yet. Create your first one above!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Templates Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Template Library</CardTitle>
              <CardDescription>Start from proven learning paths</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {learningPaths.filter(path => path.isTemplate).map((template) => (
                <div key={template.id} className="border rounded-lg p-3">
                  <h4 className="font-medium mb-1">{template.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {template.nodes.length} topics • {template.totalEstimatedTime}h
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleSelectTemplate(template)}
                  >
                    Use Template
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Visual graph-based learning paths</p>
              <p>• Drag and drop topic organization</p>
              <p>• Track progress and time spent</p>
              <p>• Add notes and resources to each topic</p>
              <p>• Connect related topics with prerequisites</p>
              <p>• AI-powered learning assistance (coming soon)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}