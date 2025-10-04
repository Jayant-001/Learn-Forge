"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LearningPathFlow } from "@/components/learning-path-flow"
import { sampleLearningPaths } from "@/lib/sample-learning-paths"
import { LearningPath } from "@/lib/types"
import { Search, Filter, ArrowLeft, Clock, BookOpen, Users, Star } from "lucide-react"
import Link from "next/link"



const categories = [
  "All",
  "Frontend",
  "Backend", 
  "Full Stack",
  "Data Science",
  "System Design",
  "Mobile"
]

interface LearningPathCardProps {
  path: LearningPath
  onView: (path: LearningPath) => void
  onStart: (path: LearningPath) => void
}

function LearningPathCard({ path, onView, onStart }: LearningPathCardProps) {
  const difficultyColors = {
    Beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{path.title}</CardTitle>
          <Badge className={difficultyColors[path.difficulty]}>{path.difficulty}</Badge>
        </div>
        <CardDescription className="line-clamp-2">{path.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{path.totalEstimatedTime}h</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen className="h-4 w-4" />
              <span>{path.nodes.length} topics</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span>4.8</span>
            </div>
          </div>
          
          {path.progress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{path.progress}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all" 
                  style={{ width: `${path.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onView(path)} className="flex-1">
            View Path
          </Button>
          <Button size="sm" onClick={() => onStart(path)} className="flex-1">
            {path.progress > 0 ? "Continue" : "Start Learning"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function RoadmapsPage() {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null)
  const [learningPaths] = useState(sampleLearningPaths)

  const handleViewPath = (path: LearningPath) => {
    setSelectedPath(path)
  }

  const handleStartPath = (path: LearningPath) => {
    // In a real app, this would add the path to user's active paths
    console.log('Starting path:', path.title)
  }

  const handleUpdatePath = (pathId: string, updates: Partial<LearningPath>) => {
    // Read-only view, no updates needed
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
                  Back to Roadmaps
                </Button>
                <div>
                  <h1 className="text-xl font-semibold">{selectedPath.title}</h1>
                  <p className="text-sm text-muted-foreground">{selectedPath.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Link href="/builder">
                  <Button variant="outline" size="sm">
                    Customize Path
                  </Button>
                </Link>
                <Button size="sm" onClick={() => handleStartPath(selectedPath)}>
                  Start Learning
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Flow Viewer */}
        <div className="flex-1">
          <LearningPathFlow
            learningPath={selectedPath}
            onUpdatePath={handleUpdatePath}
            isEditable={false}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Learning Roadmaps</h1>
        <p className="text-muted-foreground">
          Explore visual learning paths designed by experts. Each roadmap shows connected topics in an interactive graph.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search roadmaps..."
              className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Featured Roadmaps */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPaths.filter(path => path.isTemplate).map((path) => (
            <LearningPathCard 
              key={path.id} 
              path={path} 
              onView={handleViewPath}
              onStart={handleStartPath}
            />
          ))}
        </div>
      </div>

      {/* Create Custom Path CTA */}
      <Card className="border-dashed border-2">
        <CardHeader className="text-center">
          <CardTitle>Create Your Own Learning Path</CardTitle>
          <CardDescription>
            Use our visual path builder to create custom learning journeys tailored to your goals
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Link href="/builder">
            <Button size="lg">Open Path Builder</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}