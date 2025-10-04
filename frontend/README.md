# LearnForge - Personalized Learning Path Generator

LearnForge is a dynamic, structured learning environment designed for self-taught developers and professionals who are upskilling. It moves beyond simple to-do lists to create personalized learning paths with spaced repetition for long-term knowledge retention.

## 🚀 Features

### Core Features
- **Roadmap Templates**: Pre-built learning paths for common goals (React Advanced, Node.js Backend, System Design, etc.)
- **Custom Path Builder**: Create personalized learning paths with visual organization
- **Spaced Repetition System**: SM-2 algorithm implementation for optimal knowledge retention
- **Progress Tracking**: Comprehensive analytics and progress visualization
- **Dark Mode Support**: Full theme customization with system preference detection

### Key Components
- **Dashboard**: Overview of learning progress, active paths, and quick actions
- **Roadmaps**: Browse and select from curated learning templates
- **Path Builder**: Visual interface for creating custom learning sequences
- **Study Sessions**: Interactive flashcard system with spaced repetition
- **Progress Analytics**: Detailed statistics, streaks, and achievement tracking
- **Settings**: Customizable study preferences and notifications

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4 with CSS Variables
- **UI Components**: Radix UI primitives with shadcn/ui
- **Theme**: next-themes for dark/light mode
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard
│   ├── roadmaps/          # Browse learning templates
│   ├── builder/           # Custom path creation
│   ├── study/             # Flashcard sessions
│   ├── progress/          # Analytics and tracking
│   └── settings/          # User preferences
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (shadcn)
│   ├── navigation.tsx    # Main navigation with theme toggle
│   ├── roadmap-card.tsx  # Learning path display
│   ├── flashcard.tsx     # Spaced repetition cards
│   └── theme-provider.tsx # Theme context
└── lib/                  # Utilities and types
    ├── types.ts          # TypeScript definitions
    ├── spaced-repetition.ts # SM-2 algorithm
    ├── sample-data.ts    # Demo data
    └── utils.ts          # Helper functions
```

## 🎯 Problem Solved

LearnForge addresses common self-learning challenges:

1. **Tutorial Hell**: Structured paths prevent aimless tutorial consumption
2. **Lack of Structure**: Logical topic sequencing (e.g., event loop before async/await)
3. **Knowledge Decay**: Spaced repetition ensures long-term retention
4. **Theory-Practice Gap**: Integrated exercises and practical applications
5. **Progress Tracking**: Clear visualization of learning journey

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Key Features Implementation

### Spaced Repetition System
- SM-2 algorithm for optimal review scheduling
- Adaptive difficulty based on user performance
- Long-term knowledge retention focus

### Visual Path Builder
- Drag-and-drop topic organization
- Nested learning structures
- Resource aggregation per topic

### Progress Analytics
- Study streaks and consistency tracking
- Time spent analysis
- Achievement system for motivation

### Theme System
- CSS variables for consistent theming
- System preference detection
- Smooth theme transitions

## 🔮 Future Enhancements

- Backend integration with database
- User authentication and data persistence
- Community-shared learning paths
- AI-powered content recommendations
- Mobile app development
- Collaborative learning features

## 📝 Usage Examples

### Creating a Custom Path
1. Navigate to Path Builder
2. Define path title and description
3. Add topics in logical sequence
4. Include resources and flashcards
5. Save and start learning

### Study Session
1. Access Study page
2. Review due flashcards
3. Rate difficulty (Again/Hard/Good/Easy)
4. System schedules next review automatically
5. Track session statistics

## 🤝 Contributing

This is a demonstration project showcasing modern React/Next.js development patterns. Feel free to explore the code structure and implementation details.

## 📄 License

MIT License - feel free to use this project as a learning resource or starting point for your own applications.
