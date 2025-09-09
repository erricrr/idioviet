[![Netlify Status](https://api.netlify.com/api/v1/badges/573353cc-08f3-46d8-8b02-50d06bae1511/deploy-status)](https://app.netlify.com/projects/idioviet/deploys)

# idioViet

A Vietnamese idiom learning application designed to help you master Vietnamese expressions through pronunciation practice, audio playback, and detailed explanations.

## Features

- **Interactive Learning**: Practice Vietnamese idioms with chunk-by-chunk pronunciation
- **Audio Playback**: High-quality Vietnamese TTS for accurate pronunciation
- **Recording Practice**: Record and compare your pronunciation attempts
- **Save & Review**: Bookmark idioms for focused practice
- **Mobile Optimized**: Responsive design for mobile learning

## Getting Started

### Prerequisites

- **Node.js**: Version 20 or higher (required)
- **npm**: Comes with Node.js

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd idioviet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

The application will run with all core features available immediately. The TTS (Text-to-Speech) functionality works out of the box using Google Translate's TTS service.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **UI**: Radix UI with Tailwind CSS
- **Audio**: Custom TTS API with Web Audio recording

## Troubleshooting

### Audio Issues
- Enable microphone permissions for recording
- Click on the page first to allow audio autoplay
- Check internet connection for TTS functionality

### Port Issues
```bash
# If port 3000 is in use
npm run dev -- --port 3001
```
