import { LearningPath, Topic, Flashcard, Achievement } from "./types"

export const sampleFlashcards: Flashcard[] = [
  {
    id: "1",
    question: "What is a closure in JavaScript?",
    answer: "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.",
    difficulty: "Medium",
    nextReview: new Date(),
    interval: 1,
    easeFactor: 2.5,
    repetitions: 0
  },
  {
    id: "2",
    question: "Explain the difference between useEffect and useLayoutEffect",
    answer: "useEffect runs asynchronously after render, while useLayoutEffect runs synchronously before the browser paints.",
    difficulty: "Hard",
    nextReview: new Date(),
    interval: 1,
    easeFactor: 2.5,
    repetitions: 0
  },
  {
    id: "3",
    question: "What is the virtual DOM in React?",
    answer: "A JavaScript representation of the actual DOM that React uses to optimize rendering through diffing and reconciliation.",
    difficulty: "Easy",
    nextReview: new Date(),
    interval: 1,
    easeFactor: 2.5,
    repetitions: 0
  }
]

export const sampleTopics: Topic[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Core JavaScript concepts including closures, hoisting, and scope",
    status: "completed",
    resources: [
      {
        id: "1",
        title: "MDN JavaScript Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
        type: "documentation"
      }
    ],
    flashcards: [sampleFlashcards[0]]
  },
  {
    id: "2", 
    title: "React Hooks",
    description: "Understanding and using React hooks effectively",
    status: "in-progress",
    resources: [
      {
        id: "2",
        title: "React Hooks Documentation",
        url: "https://react.dev/reference/react",
        type: "documentation"
      }
    ],
    flashcards: [sampleFlashcards[1]]
  },
  {
    id: "3",
    title: "React Fundamentals",
    description: "Core React concepts including components, props, and state",
    status: "todo",
    resources: [
      {
        id: "3",
        title: "React Tutorial",
        url: "https://react.dev/learn",
        type: "documentation"
      }
    ],
    flashcards: [sampleFlashcards[2]]
  }
]

export const sampleLearningPaths: LearningPath[] = [
  {
    id: "1",
    title: "React Advanced",
    description: "Master advanced React concepts including hooks, context, and performance optimization",
    difficulty: "Advanced",
    topics: sampleTopics,
    progress: 65,
    timeSpent: 32 * 60, // 32 hours in minutes
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date()
  },
  {
    id: "2",
    title: "Node.js Backend",
    description: "Build scalable backend applications with Node.js, Express, and databases",
    difficulty: "Intermediate",
    topics: [],
    progress: 30,
    timeSpent: 18 * 60,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date()
  }
]

export const sampleAchievements: Achievement[] = [
  {
    id: "1",
    title: "First Steps",
    description: "Complete your first topic",
    icon: "🎯",
    earned: true,
    earnedAt: new Date("2024-01-02")
  },
  {
    id: "2",
    title: "Week Warrior", 
    description: "Study for 7 consecutive days",
    icon: "🔥",
    earned: true,
    earnedAt: new Date("2024-01-08")
  },
  {
    id: "3",
    title: "Speed Learner",
    description: "Complete 50 flashcards in one session",
    icon: "⚡",
    earned: false
  },
  {
    id: "4",
    title: "Consistency King",
    description: "Maintain a 30-day streak",
    icon: "👑",
    earned: false
  }
]