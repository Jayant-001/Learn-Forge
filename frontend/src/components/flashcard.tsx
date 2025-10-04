"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCcw } from "lucide-react"

interface FlashcardProps {
  question: string
  answer: string
  topic: string
  difficulty: "Easy" | "Medium" | "Hard"
  onRate: (rating: "again" | "hard" | "good" | "easy") => void
}

export function Flashcard({ question, answer, topic, difficulty, onRate }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const difficultyColors = {
    Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <Badge variant="outline">{topic}</Badge>
        <Badge className={difficultyColors[difficulty]}>{difficulty}</Badge>
      </div>
      
      <Card className="min-h-[300px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <CardContent className="flex items-center justify-center p-8 h-full">
          <div className="text-center space-y-4">
            {!isFlipped ? (
              <>
                <h3 className="text-lg font-medium text-muted-foreground">Question</h3>
                <p className="text-xl">{question}</p>
                <p className="text-sm text-muted-foreground">Click to reveal answer</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium text-muted-foreground">Answer</h3>
                <p className="text-xl">{answer}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsFlipped(false)
                  }}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Show Question
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {isFlipped && (
        <div className="mt-6 flex justify-center space-x-2">
          <Button variant="destructive" onClick={() => onRate("again")}>
            Again
          </Button>
          <Button variant="outline" onClick={() => onRate("hard")}>
            Hard
          </Button>
          <Button variant="outline" onClick={() => onRate("good")}>
            Good
          </Button>
          <Button onClick={() => onRate("easy")}>
            Easy
          </Button>
        </div>
      )}
    </div>
  )
}