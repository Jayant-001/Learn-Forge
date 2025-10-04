import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, TrendingUp, Brain, Target, Clock, Award } from "lucide-react"

const learningPaths = [
  {
    id: "1",
    title: "React Advanced",
    progress: 65,
    totalTopics: 24,
    completedTopics: 16,
    timeSpent: "32h",
    lastStudied: "2 days ago",
    streak: 12
  },
  {
    id: "2", 
    title: "Node.js Backend",
    progress: 30,
    totalTopics: 32,
    completedTopics: 10,
    timeSpent: "18h",
    lastStudied: "1 week ago",
    streak: 0
  },
  {
    id: "3",
    title: "System Design",
    progress: 15,
    totalTopics: 28,
    completedTopics: 4,
    timeSpent: "8h", 
    lastStudied: "3 days ago",
    streak: 3
  }
]

const weeklyStats = [
  { day: "Mon", cards: 12, time: 25 },
  { day: "Tue", cards: 8, time: 18 },
  { day: "Wed", cards: 15, time: 32 },
  { day: "Thu", cards: 10, time: 22 },
  { day: "Fri", cards: 18, time: 38 },
  { day: "Sat", cards: 6, time: 12 },
  { day: "Sun", cards: 14, time: 28 }
]

const achievements = [
  { title: "First Steps", description: "Complete your first topic", earned: true },
  { title: "Week Warrior", description: "Study for 7 consecutive days", earned: true },
  { title: "Speed Learner", description: "Complete 50 flashcards in one session", earned: false },
  { title: "Consistency King", description: "Maintain a 30-day streak", earned: false }
]

export default function ProgressPage() {
  const totalProgress = Math.round(
    learningPaths.reduce((acc, path) => acc + path.progress, 0) / learningPaths.length
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
        <p className="text-muted-foreground">Track your learning journey and achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProgress}%</div>
            <Progress value={totalProgress} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-muted-foreground">Personal best: 18 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58h</div>
            <p className="text-xs text-muted-foreground">This month: 24h</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cards Mastered</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+23 this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Learning Paths Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Paths</CardTitle>
            <CardDescription>Your active learning paths and progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {learningPaths.map((path) => (
              <div key={path.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{path.title}</h4>
                  <Badge variant={path.streak > 0 ? "default" : "secondary"}>
                    {path.streak > 0 ? `${path.streak} day streak` : "Inactive"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{path.completedTopics}/{path.totalTopics} topics</span>
                  <span>{path.progress}%</span>
                </div>
                <Progress value={path.progress} />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{path.timeSpent} studied</span>
                  <span>Last: {path.lastStudied}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Your study activity this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyStats.map((stat, index) => (
                <div key={stat.day} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 text-sm font-medium">{stat.day}</div>
                    <div className="flex-1">
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(stat.cards / 20) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.cards} cards • {stat.time}m
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Achievements</span>
          </CardTitle>
          <CardDescription>Unlock badges as you progress in your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  achievement.earned 
                    ? "bg-primary/5 border-primary/20" 
                    : "bg-muted/50 border-muted"
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Award className={`h-5 w-5 ${
                    achievement.earned ? "text-primary" : "text-muted-foreground"
                  }`} />
                  <h4 className={`font-medium ${
                    achievement.earned ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {achievement.title}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
                {achievement.earned && (
                  <Badge className="mt-2" variant="secondary">Earned</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}