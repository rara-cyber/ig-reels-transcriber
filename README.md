# Instagram Reels Transcriber

A modern, responsive web application for transcribing Instagram Reels for free. Built with React, TypeScript, Vite, and Tailwind CSS, integrated with n8n workflows for backend processing.

## Features

- **Free Transcription**: Transcribe Instagram Reels at no cost
- **Rate Limiting**: Client-side rate limiting (1 request/minute, 10 requests/hour)
- **Email Delivery**: Transcriptions delivered directly to your email
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Feedback**: Live rate limit display and progress tracking
- **Production Ready**: Optimized for deployment to Netlify/Vercel

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Headless UI
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Backend**: n8n workflows + Baserow database
- **Containerization**: Docker + Docker Compose

## Quick Start

### Prerequisites

- Node.js 18+ (recommended: 20.19+ or 22.12+)
- Docker (optional, for containerized development)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/rara-cyber/ig-reels-transcriber.git
   cd ig-reels-transcriber
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/transcribe
   VITE_APP_ENV=development
   VITE_RATE_LIMIT_STORAGE_KEY=ig_transcriber_limits
   VITE_API_TIMEOUT=30000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   Visit [http://localhost:5173](http://localhost:5173)

### Docker Development

1. **Start with Docker Compose**
   ```bash
   docker compose --profile dev up
   ```
   
   Visit [http://localhost:5173](http://localhost:5173)

## Build & Deploy

### Local Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Production Build

```bash
# Build production image
docker compose --profile prod build

# Run production container
docker compose --profile prod up
```

## Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Set environment variables in Netlify dashboard
4. Deploy automatically on git push

### Vercel

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on git push

Both platforms will auto-detect Vite and configure optimal settings.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_N8N_WEBHOOK_URL` | Your n8n webhook endpoint URL | ✅ Yes |
| `VITE_APP_ENV` | Application environment (development/production) | No |
| `VITE_RATE_LIMIT_STORAGE_KEY` | localStorage key for rate limiting | No |
| `VITE_API_TIMEOUT` | Request timeout in milliseconds | No |

## Project Structure

```
ig-reels-transcriber/
├── src/
│   ├── components/
│   │   ├── forms/           # Form components
│   │   ├── layout/          # Layout components (Header, Footer)
│   │   └── ui/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API services (n8n webhook)
│   ├── stores/              # Zustand state management
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── public/                  # Static assets
├── docker/                  # Docker configuration
├── dist/                    # Build output (generated)
├── netlify.toml            # Netlify configuration
├── vercel.json             # Vercel configuration
└── docker-compose.yml     # Docker Compose configuration
```

## Backend Integration

This application integrates with:

- **n8n**: Workflow automation for transcription processing
- **Baserow**: Database for storing transcription data
- **Email Service**: For delivering transcription results

### n8n Webhook Expected Payload

```json
{
  "email": "user@example.com",
  "reelUrl": "https://instagram.com/reel/ABC123/",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Expected Response Format

```json
{
  "success": true,
  "message": "Transcription request submitted successfully",
  "transcriptionId": "uuid-here",
  "rateLimitInfo": {
    "remaining": 9,
    "resetTime": "2024-01-01T01:00:00.000Z",
    "isBlocked": false
  }
}
```

## Rate Limiting

The application implements client-side rate limiting:

- **1 request per minute**: Prevents spam and ensures fair usage
- **10 requests per hour**: Daily usage limit for free tier
- **Visual feedback**: Real-time countdown and status display
- **localStorage persistence**: Limits persist across browser sessions

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Docker Commands

```bash
# Development
docker compose --profile dev up
docker compose --profile dev build

# Production
docker compose --profile prod up
docker compose --profile prod build
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using React, TypeScript, and modern web technologies.