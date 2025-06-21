# WinningDistro Platform

WinningDistro is a comprehensive music distribution platform that enables artists, record labels, and music professionals to distribute their music globally while maintaining control over their revenue and rights.

## 🚀 Features

### Core Platform Features
- **Multi-User Registration**: Support for Artists, Record Labels, Producers, Managers, Publishers, Venues, Educators, Journalists, and Fans
- **Advanced Security**: Google reCAPTCHA Enterprise integration for bot protection
- **Real-time Verification**: Spotify API integration for artist name availability checking
- **Social Media Integration**: Instagram handle validation and suggestions
- **Comprehensive Forms**: Dynamic multi-step signup flows with validation
- **User Management**: JWT-based authentication with role-based access control

### Technical Features
- **Modern Tech Stack**: React 18 + TypeScript + Vite for blazing fast development
- **Beautiful UI**: Tailwind CSS with shadcn/ui components and dark theme
- **Database Flexibility**: SQLite for development, Neon PostgreSQL for production
- **API Integrations**: Spotify Web API, Instagram Basic Display API
- **Production Ready**: Comprehensive error handling, logging, and monitoring

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Hook Form** with Zod validation
- **React Router** for navigation
- **TanStack Query** for data fetching

### Backend
- **Node.js** with Express
- **JWT** for authentication
- **bcrypt** for password hashing
- **SQLite** (development) / **Neon PostgreSQL** (production)
- **Rate limiting** and security middleware

### Security & APIs
- **Google reCAPTCHA Enterprise** for bot protection
- **Spotify Web API** for artist verification
- **Instagram Basic Display API** for social verification
- **Environment-based configuration**

## 📦 Installation

### Prerequisites
- **Bun** (recommended) or Node.js 18+
- **Git**

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/WinningDistro/winningdistro-platform-main.git
   cd winningdistro-platform-main
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your actual API keys
   ```

4. **Start development servers**
   ```bash
   # Frontend (port 5173)
   bun run dev

   # Backend (port 3001) - in a separate terminal
   bun run server
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Test reCAPTCHA: http://localhost:5173/recaptcha-test

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure the following:

#### Required for Production
```env
# Google reCAPTCHA Enterprise (Required)
RECAPTCHA_SECRET_KEY=your_recaptcha_enterprise_secret_key
RECAPTCHA_PROJECT_ID=your_google_cloud_project_id

# Spotify API (Required for artist verification)
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

#### Optional
```env
# Instagram API (Optional - for handle verification)
VITE_INSTAGRAM_APP_ID=your_instagram_app_id
VITE_INSTAGRAM_APP_SECRET=your_instagram_app_secret

# Neon Database (Optional - falls back to SQLite)
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# hCaptcha (Development alternative)
VITE_HCAPTCHA_SITE_KEY=your_hcaptcha_site_key
VITE_HCAPTCHA_SECRET_KEY=your_hcaptcha_secret_key
```

### API Setup Guides

#### Google reCAPTCHA Enterprise
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable reCAPTCHA Enterprise API
3. Create reCAPTCHA Enterprise key
4. Copy Site Key and Secret Key to your `.env` file

#### Spotify API
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new application
3. Copy Client ID and Client Secret to your `.env` file

#### Instagram Basic Display API
1. Go to [Facebook Developers](https://developers.facebook.com/apps/)
2. Create a new app with Instagram Basic Display product
3. Copy App ID and App Secret to your `.env` file

## 📱 User Types & Features

### Artists/Musicians
- Artist name availability checking via Spotify API
- Instagram handle validation
- Music genre and instrument selection
- Portfolio and social media integration
- Original music tracking

### Record Labels
- Business information management
- Artist roster tracking
- Revenue and distribution analytics
- Multi-genre support

### Producers/Studios
- Equipment and software listings
- Studio location and services
- Portfolio and client management
- Hourly rate configuration

### Additional User Types
- **Managers/Agents**: Client management and booking
- **Publishers/Distributors**: Rights and catalog management
- **Venues/Organizers**: Event and capacity management
- **Educators**: Teaching credentials and student management
- **Journalists**: Publication and writing portfolio
- **Fans**: Music discovery and playlist creation

## 🚦 Available Scripts

```bash
# Development
bun run dev          # Start frontend dev server
bun run server       # Start backend server
bun run build        # Build for production
bun run preview      # Preview production build

# Code Quality
bun run lint         # Run Biome linter
bun run lint:fix     # Fix linting issues
bun run type-check   # TypeScript type checking

# Testing
bun run test         # Run tests (when implemented)
```

## 🏗️ Project Structure

```
winningdistro-platform/
├── src/                    # Frontend source code
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── lib/               # Utilities and configurations
│   ├── contexts/          # React contexts
│   └── hooks/             # Custom React hooks
├── server/                # Backend source code
│   ├── routes/            # API route handlers
│   ├── middleware/        # Express middleware
│   └── database/          # Database configuration
├── public/                # Static assets
└── data/                  # Static data files
```

## 🔒 Security Features

- **Google reCAPTCHA Enterprise**: Advanced bot protection with risk analysis
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Rate Limiting**: API protection against abuse
- **Input Validation**: Comprehensive form and API validation
- **Environment Security**: Sensitive data in environment variables

## 🚀 Deployment

### Frontend (Netlify)
The frontend is configured for automatic deployment to Netlify:

```bash
bun run build
# Deploy the dist/ folder to Netlify
```

### Backend
The backend can be deployed to any Node.js hosting service:

```bash
# Set environment variables on your hosting platform
# Deploy the server/ folder
```

### Database
- **Development**: Uses SQLite (no setup required)
- **Production**: Supports Neon PostgreSQL (automatic fallback to SQLite)

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification
- `POST /api/auth/test-recaptcha` - Test reCAPTCHA integration

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/account` - Delete user account

## 🧪 Testing

Visit `/recaptcha-test` in your browser to test the reCAPTCHA Enterprise integration with real-time verification.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Visit the `/support` page in the application
- Check the comprehensive FAQ section

## 🎯 Roadmap

- [ ] Advanced analytics dashboard
- [ ] Automated music distribution
- [ ] Revenue tracking and reporting
- [ ] Mobile app development
- [ ] API rate limiting dashboard
- [ ] Advanced user roles and permissions

---

**Built with ❤️ by the WinningDistro Team**

Empowering artists and music professionals worldwide with cutting-edge distribution technology.
