# VoteFlow - Secure Voting Platform

A modern, professional voting platform built for schools, organizations, and churches. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **User Authentication & Management** - Secure login/signup with JWT tokens
- **Election Management** - Create, edit, and manage elections with scheduling
- **Candidate Profiles** - Rich candidate profiles with photos, bios, and manifestos
- **Secure Voting** - Device fingerprinting and fraud prevention
- **Real-time Analytics** - Live voting results and detailed analytics
- **Notifications** - Email and SMS notifications for voting events
- **Admin Controls** - Pause, resume, and close elections
- **Custom Branding** - Organization-specific theming and branding

### Security Features
- **Two-Factor Authentication (2FA)** - TOTP/SMS-based authentication
- **Device Fingerprinting** - Track and prevent duplicate voting
- **Rate Limiting** - Prevent abuse and spam
- **Audit Logs** - Complete voting history and audit trail
- **IP Logging** - Track voting locations and patterns

### User Experience
- **Modern UI/UX** - Clean, professional Apple-like design
- **Responsive Design** - Works perfectly on all devices
- **Real-time Updates** - Live election status and results
- **Accessibility** - WCAG compliant design
- **Dark Mode** - Coming soon

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form management and validation
- **Recharts** - Data visualization and charts
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications

### Backend Integration
- **RESTful API** - PHP/CodeIgniter backend (separate project)
- **JWT Authentication** - Secure token-based auth
- **Axios** - HTTP client for API communication
- **FingerprintJS** - Device fingerprinting

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd voteflow-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   REACT_APP_APP_NAME=VoteFlow
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, Card, etc.)
│   └── layout/         # Layout components (Navbar, Sidebar, etc.)
├── contexts/           # React contexts (Auth, Theme, etc.)
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   └── ...             # Other page components
├── services/           # API services and utilities
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
└── styles/             # Global styles and CSS
```

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Code Style

This project uses:
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

### Component Guidelines

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow the established component patterns
- Use Tailwind CSS for styling
- Include proper error handling

## 🚀 Deployment

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder**
   - Upload to your web server
   - Configure your server to serve `index.html` for all routes
   - Set up environment variables for production

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:8000/api` |
| `REACT_APP_APP_NAME` | Application name | `VoteFlow` |

## 📱 Features in Detail

### Authentication
- Secure login/signup with email/password
- JWT token management
- Remember me functionality
- Password reset (coming soon)

### Election Management
- Create elections with start/end dates
- Add multiple candidates
- Set eligibility rules
- Real-time status updates
- Admin controls (pause/resume/close)

### Voting Interface
- Clean, intuitive voting experience
- Candidate profiles with photos and bios
- Real-time vote confirmation
- Device fingerprinting for security

### Analytics Dashboard
- Live voting results
- Turnout statistics
- Device and browser analytics
- Export functionality (coming soon)

## 🔒 Security

### Authentication Security
- JWT tokens with expiration
- Secure password hashing (backend)
- Rate limiting on login attempts
- Session management

### Voting Security
- Device fingerprinting
- IP address logging
- One vote per user per election
- Audit trail for all actions

### Data Protection
- HTTPS encryption
- Secure API communication
- Input validation and sanitization
- XSS and CSRF protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Roadmap

### Upcoming Features
- [ ] Dark mode support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Advanced security features
- [ ] Integration with payment gateways
- [ ] Advanced notification system

### Version History
- **v1.0.0** - Initial release with core voting functionality
- **v1.1.0** - Enhanced analytics and reporting
- **v1.2.0** - Advanced security features
- **v2.0.0** - Complete platform overhaul

---

Built with ❤️ for transparent and secure voting 