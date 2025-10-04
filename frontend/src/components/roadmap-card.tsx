import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Star } from "lucide-react"

interface RoadmapCardProps {
  id: string
  title: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  topics: number
  progress?: number
  rating: number
  enrolled: number
}

export function RoadmapCard({
  title,
  description,
  difficulty,
  duration,
  topics,
  progress,
  rating,
  enrolled
}: RoadmapCardProps) {
  const difficultyColors = {
    Beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge className={difficultyColors[difficulty]}>{difficulty}</Badge>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{enrolled}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span>{rating}</span>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {topics} topics
          </div>
          
          {progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full">
          {progress !== undefined ? "Continue" : "Start Learning"}
        </Button>
      </CardFooter>
    </Card>
  )
}