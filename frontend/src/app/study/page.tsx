"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Flashcard } from "@/components/flashcard"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, Target, ArrowRight } from "lucide-react"

const flashcards = [
  {
    id: "1",
    question: "What is a closure in JavaScript?",
    answer: "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned. It gives you access to an outer function's scope from an inner function.",
    topic: "JavaScript Fundamentals",
    difficulty: "Medium" as const
  },
  {
    id: "2", 
    question: "Explain the difference between useEffect and useLayoutEffect",
    answer: "useEffect runs asynchronously after the render is committed to the screen, while useLayoutEffect runs synchronously after all DOM mutations but before the browser paints. useLayoutEffect is useful when you need to make DOM measurements or mutations that the user should not see.",
    topic: "React Hooks",
    difficulty: "Hard" as const
  },
  {
    id: "3",
    question: "What is the purpose of the virtual DOM in React?",
    answer: "The virtual DOM is a JavaScript representation of the actual DOM. React uses it to optimize rendering by comparing the new virtual DOM tree with the previous one (diffing) and only updating the parts of the real DOM that have changed (reconciliation).",
    topic: "React Fundamentals", 
    difficulty: "Easy" as const
  }
]

export default function StudyPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [studyStats, setStudyStats] = useState({
    cardsStudied: 0,
    correctAnswers: 0,
    sessionTime: 0
  })

  const currentCard = flashcards[currentCardIndex]
  const progress = ((currentCardIndex + 1) / flashcards.length) * 100

  const handleCardRating = (rating: "again" | "hard" | "good" | "easy") => {
    setStudyStats(prev => ({
      ...prev,
      cardsStudied: prev.cardsStudied + 1,
      correctAnswers: prev.correctAnswers + (rating === "good" || rating === "easy" ? 1 : 0)
    }))

    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    } else {
      // Session complete
      console.log("Study session complete!")
    }
  }

  const startNewSession = () => {
    setCurrentCardIndex(0)
    setStudyStats({ cardsStudied: 0, correctAnswers: 0, sessionTime: 0 })
  }

  if (currentCardIndex >= flashcards.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Session Complete! 🎉</h1>
            <p className="text-muted-foreground">Great job on completing your study session</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Session Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{studyStats.cardsStudied}</div>
                  <div className="text-sm text-muted-foreground">Cards Studied</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {Math.round((studyStats.correctAnswers / studyStats.cardsStudied) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">5m</div>
                  <div className="text-sm text-muted-foreground">Time Spent</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button onClick={startNewSession} size="lg" className="w-full">
              Start New Session
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              View Progress
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Study Session</h1>
            <Badge variant="outline">
              {currentCardIndex + 1} of {flashcards.length}
            </Badge>
          </div>
          <Progress value={progress} className="mb-4" />
          <p className="text-muted-foreground">
            Review your flashcards and rate how well you knew each answer
          </p>
        </div>

        {/* Study Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cards Studied</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studyStats.cardsStudied}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {studyStats.cardsStudied > 0 
                  ? Math.round((studyStats.correctAnswers / studyStats.cardsStudied) * 100)
                  : 0}%
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Session Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5m</div>
            </CardContent>
          </Card>
        </div>

        {/* Flashcard */}
        <div className="mb-8">
          <Flashcard
            question={currentCard.question}
            answer={currentCard.answer}
            topic={currentCard.topic}
            difficulty={currentCard.difficulty}
            onRate={handleCardRating}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" disabled={currentCardIndex === 0}>
            Previous
          </Button>
          
          <div className="text-sm text-muted-foreground">
            {flashcards.length - currentCardIndex - 1} cards remaining
          </div>
          
          <Button 
            variant="outline" 
            disabled={currentCardIndex === flashcards.length - 1}
            onClick={() => setCurrentCardIndex(currentCardIndex + 1)}
          >
            Skip
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}