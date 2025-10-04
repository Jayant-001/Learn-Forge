import { Flashcard } from "./types"

// SM-2 Algorithm implementation for spaced repetition
export function calculateNextReview(
  card: Flashcard,
  rating: "again" | "hard" | "good" | "easy"
): Partial<Flashcard> {
  let { interval, easeFactor, repetitions } = card
  
  // Convert rating to quality (0-5 scale)
  const quality = {
    again: 0,
    hard: 2,
    good: 3,
    easy: 5
  }[rating]

  if (quality < 3) {
    // Failed card - reset repetitions and set short interval
    repetitions = 0
    interval = 1
  } else {
    // Successful card
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
    repetitions += 1
  }

  // Update ease factor
  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))

  // Calculate next review date
  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + interval)

  return {
    interval,
    easeFactor,
    repetitions,
    nextReview
  }
}

export function getCardsForReview(cards: Flashcard[]): Flashcard[] {
  const now = new Date()
  return cards.filter(card => card.nextReview <= now)
}

export function initializeCard(question: string, answer: string, difficulty: "Easy" | "Medium" | "Hard"): Omit<Flashcard, "id"> {
  return {
    question,
    answer,
    difficulty,
    nextReview: new Date(),
    interval: 1,
    easeFactor: 2.5,
    repetitions: 0
  }
}