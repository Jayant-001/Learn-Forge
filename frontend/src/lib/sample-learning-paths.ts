import { LearningPath, LearningNode, LearningEdge } from "./types"

// Sample nodes for React Advanced path
const reactAdvancedNodes: LearningNode[] = [
  {
    id: "react-1",
    title: "React Fundamentals",
    description: "Core React concepts: components, props, state, and JSX",
    status: "completed",
    estimatedTime: 8,
    actualTime: 6,
    notes: "Completed with good understanding. Focus on hooks next.",
    resources: [
      {
        id: "r1",
        title: "React Official Tutorial",
        url: "https://react.dev/learn",
        type: "documentation"
      },
      {
        id: "r2",
        title: "React Crash Course",
        url: "https://youtube.com/watch?v=react-crash",
        type: "video"
      }
    ],
    position: { x: 100, y: 100 },
    parentNodes: [],
    childNodes: ["react-2", "react-3"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "react-2",
    title: "React Hooks",
    description: "useState, useEffect, useContext, and custom hooks",
    status: "in-progress",
    estimatedTime: 12,
    actualTime: 8,
    notes: "Working through useEffect patterns. Need to practice custom hooks more.",
    resources: [
      {
        id: "r3",
        title: "Hooks API Reference",
        url: "https://react.dev/reference/react",
        type: "documentation"
      },
      {
        id: "r4",
        title: "Custom Hooks Guide",
        url: "https://react.dev/learn/reusing-logic-with-custom-hooks",
        type: "article"
      }
    ],
    position: { x: 300, y: 200 },
    parentNodes: ["react-1"],
    childNodes: ["react-4", "react-5"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "react-3",
    title: "Component Patterns",
    description: "Higher-order components, render props, compound components",
    status: "pending",
    estimatedTime: 10,
    notes: "",
    resources: [
      {
        id: "r5",
        title: "React Patterns",
        url: "https://reactpatterns.com",
        type: "article"
      }
    ],
    position: { x: 100, y: 300 },
    parentNodes: ["react-1"],
    childNodes: ["react-6"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10")
  },
  {
    id: "react-4",
    title: "State Management",
    description: "Context API, useReducer, and state management patterns",
    status: "pending",
    estimatedTime: 15,
    notes: "",
    resources: [
      {
        id: "r6",
        title: "Managing State",
        url: "https://react.dev/learn/managing-state",
        type: "documentation"
      }
    ],
    position: { x: 500, y: 300 },
    parentNodes: ["react-2"],
    childNodes: ["react-7"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "react-5",
    title: "Performance Optimization",
    description: "React.memo, useMemo, useCallback, and profiling",
    status: "pending",
    estimatedTime: 12,
    notes: "",
    resources: [
      {
        id: "r7",
        title: "Optimizing Performance",
        url: "https://react.dev/learn/render-and-commit",
        type: "documentation"
      }
    ],
    position: { x: 300, y: 400 },
    parentNodes: ["react-2"],
    childNodes: ["react-7"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "react-6",
    title: "Testing Components",
    description: "Jest, React Testing Library, and testing strategies",
    status: "pending",
    estimatedTime: 10,
    notes: "",
    resources: [
      {
        id: "r8",
        title: "Testing React Apps",
        url: "https://testing-library.com/docs/react-testing-library/intro",
        type: "documentation"
      }
    ],
    position: { x: 100, y: 500 },
    parentNodes: ["react-3"],
    childNodes: [],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "react-7",
    title: "Advanced Patterns",
    description: "Suspense, Error Boundaries, and concurrent features",
    status: "pending",
    estimatedTime: 18,
    notes: "",
    resources: [
      {
        id: "r9",
        title: "Concurrent React",
        url: "https://react.dev/blog/2022/03/29/react-v18",
        type: "article"
      }
    ],
    position: { x: 400, y: 500 },
    parentNodes: ["react-4", "react-5"],
    childNodes: [],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  }
]

const reactAdvancedEdges: LearningEdge[] = [
  { id: "e1", source: "react-1", target: "react-2", type: "prerequisite" },
  { id: "e2", source: "react-1", target: "react-3", type: "prerequisite" },
  { id: "e3", source: "react-2", target: "react-4", type: "prerequisite" },
  { id: "e4", source: "react-2", target: "react-5", type: "prerequisite" },
  { id: "e5", source: "react-3", target: "react-6", type: "prerequisite" },
  { id: "e6", source: "react-4", target: "react-7", type: "prerequisite" },
  { id: "e7", source: "react-5", target: "react-7", type: "prerequisite" }
]

// Sample nodes for Node.js Backend path
const nodeJsNodes: LearningNode[] = [
  {
    id: "node-1",
    title: "Node.js Fundamentals",
    description: "Event loop, modules, npm, and basic server setup",
    status: "completed",
    estimatedTime: 6,
    actualTime: 5,
    notes: "Good foundation. Event loop concept is clear now.",
    resources: [
      {
        id: "n1",
        title: "Node.js Official Guide",
        url: "https://nodejs.org/en/docs/guides/",
        type: "documentation"
      }
    ],
    position: { x: 100, y: 100 },
    parentNodes: [],
    childNodes: ["node-2", "node-3"],
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-12")
  },
  {
    id: "node-2",
    title: "Express.js Framework",
    description: "Routing, middleware, and building REST APIs",
    status: "in-progress",
    estimatedTime: 10,
    actualTime: 6,
    notes: "Working on middleware concepts. Need more practice with error handling.",
    resources: [
      {
        id: "n2",
        title: "Express.js Guide",
        url: "https://expressjs.com/en/guide/routing.html",
        type: "documentation"
      }
    ],
    position: { x: 300, y: 200 },
    parentNodes: ["node-1"],
    childNodes: ["node-4"],
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "node-3",
    title: "Database Integration",
    description: "MongoDB, PostgreSQL, and ORM/ODM patterns",
    status: "pending",
    estimatedTime: 12,
    notes: "",
    resources: [
      {
        id: "n3",
        title: "MongoDB Tutorial",
        url: "https://docs.mongodb.com/manual/tutorial/",
        type: "documentation"
      }
    ],
    position: { x: 100, y: 300 },
    parentNodes: ["node-1"],
    childNodes: ["node-4"],
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12")
  },
  {
    id: "node-4",
    title: "Authentication & Security",
    description: "JWT, OAuth, password hashing, and security best practices",
    status: "pending",
    estimatedTime: 8,
    notes: "",
    resources: [
      {
        id: "n4",
        title: "Node.js Security Guide",
        url: "https://nodejs.org/en/docs/guides/security/",
        type: "documentation"
      }
    ],
    position: { x: 300, y: 400 },
    parentNodes: ["node-2", "node-3"],
    childNodes: [],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  }
]

const nodeJsEdges: LearningEdge[] = [
  { id: "ne1", source: "node-1", target: "node-2", type: "prerequisite" },
  { id: "ne2", source: "node-1", target: "node-3", type: "prerequisite" },
  { id: "ne3", source: "node-2", target: "node-4", type: "prerequisite" },
  { id: "ne4", source: "node-3", target: "node-4", type: "prerequisite" }
]

export const sampleLearningPaths: LearningPath[] = [
  {
    id: "path-1",
    title: "React Advanced",
    description: "Master advanced React concepts including hooks, context, performance optimization, and testing",
    difficulty: "Advanced",
    nodes: reactAdvancedNodes,
    edges: reactAdvancedEdges,
    isTemplate: true,
    isPublic: true,
    createdBy: "system",
    totalEstimatedTime: 85,
    progress: 35,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "path-2",
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js, Express, databases, and security",
    difficulty: "Intermediate",
    nodes: nodeJsNodes,
    edges: nodeJsEdges,
    isTemplate: true,
    isPublic: true,
    createdBy: "system",
    totalEstimatedTime: 36,
    progress: 45,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "path-3",
    title: "My Custom JavaScript Path",
    description: "Personal learning path for mastering JavaScript fundamentals",
    difficulty: "Beginner",
    nodes: [],
    edges: [],
    isTemplate: false,
    isPublic: false,
    createdBy: "user-1",
    totalEstimatedTime: 0,
    progress: 0,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10")
  }
]