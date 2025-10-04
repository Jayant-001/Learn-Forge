import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { sampleLearningPaths } from "@/lib/sample-learning-paths"
import { BookOpen, Brain, Target, TrendingUp, Plus, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back to LearnForge</h1>
        <p className="text-muted-foreground">Continue your learning journey and track your progress</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Paths</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cards Due</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Ready for review</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>React Advanced - Hooks Deep Dive</span>
                <span>65%</span>
              </div>
              <Progress value={65} />
            </div>
            <Link href="/study">
              <Button className="w-full">
                <Brain className="h-4 w-4 mr-2" />
                Start Study Session
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with something new</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/roadmaps">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Roadmaps
              </Button>
            </Link>
            <Link href="/builder">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Create Custom Path
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Learning Paths */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Your Learning Paths</h2>
          <Link href="/roadmaps">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleLearningPaths.slice(0, 2).map((path) => {
            const completedNodes = path.nodes.filter(node => node.status === 'completed').length
            const totalNodes = path.nodes.length
            const progress = totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0
            
            return (
              <Card key={path.id} className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{path.title}</CardTitle>
                    <Badge variant={path.difficulty === 'Beginner' ? 'secondary' : path.difficulty === 'Intermediate' ? 'default' : 'destructive'}>
                      {path.difficulty}
                    </Badge>
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
                        <span>{totalNodes} topics</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>{completedNodes} done</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                  </div>
                </CardContent>
                
                <CardContent className="pt-0">
                  <Link href={`/roadmaps`}>
                    <Button className="w-full">
                      {progress > 0 ? "Continue Learning" : "Start Learning"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
          
          <Card className="border-dashed border-2 flex items-center justify-center min-h-[300px]">
            <div className="text-center space-y-4">
              <Plus className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <h3 className="font-medium">Create Learning Path</h3>
                <p className="text-sm text-muted-foreground mb-4">Build your custom visual roadmap</p>
                <Link href="/builder">
                  <Button>Open Path Builder</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
