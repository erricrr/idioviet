# idioViet

An interactive Vietnamese idiom learning application designed to help you master Vietnamese expressions through pronunciation practice, audio playback, and detailed explanations.

## About

**idioViet** is a web application that makes learning Vietnamese idioms engaging and effective. Each idiom is presented with its pronunciation, meaning, and usage examples, complete with high-quality text-to-speech audio in Vietnamese.

### Key Features

- **Interactive Learning**: Practice Vietnamese idioms with chunk-by-chunk pronunciation
- **Audio Playback**: High-quality Vietnamese TTS for accurate pronunciation
- **Recording Practice**: Record and compare your pronunciation attempts
- **Detailed Explanations**: Literal translations, actual meanings, and contextual examples
- **Save & Review**: Bookmark your favorite idioms for focused practice
- **Progress Tracking**: Visual progress indicator as you navigate through idioms
- **Mobile Optimized**: Designed specifically for mobile learning experiences

## Features

- **Vietnamese TTS Integration**: Server-side text-to-speech for authentic pronunciation
- **Chunked Learning**: Break down idioms into manageable phrases for practice
- **Audio Recording**: Record your pronunciation attempts and compare with native audio
- **Comprehensive Examples**: Each idiom includes Vietnamese and English usage examples
- **Save System**: Bookmark idioms for focused review sessions
- **Carousel Navigation**: Smooth swipe navigation between idioms
- **Responsive Design**: Optimized for mobile devices with touch-friendly interface
- **Audio Caching**: Intelligent audio prefetching for seamless playback

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **UI Components**: Radix UI with Tailwind CSS
- **Audio Processing**: Custom TTS API with audio caching
- **State Management**: React hooks with localStorage persistence
- **Audio Recording**: Web Audio API integration
- **AI Integration**: Google AI via Genkit (available for future features)

## Project Structure

```
src/
├── app/                 # Next.js app router
├── components/          # React components
│   ├── app/            # Main application components
│   └── ui/             # Reusable UI components
├── data/               # Static data (idioms)
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## Learning Approach

idioViet uses a proven learning methodology:

1. **Visual Presentation**: Clear, readable idiom display
2. **Audio Reinforcement**: Native Vietnamese pronunciation
3. **Chunked Practice**: Break complex phrases into manageable parts
4. **Contextual Learning**: Real-world usage examples
5. **Active Practice**: Recording and comparison features
6. **Spaced Repetition**: Save and review system for retention

## Contributing

This project is designed for Vietnamese language learners. Contributions for additional idioms, improved audio quality, or enhanced learning features are welcome.

## License

idioViet &copy; 2025
