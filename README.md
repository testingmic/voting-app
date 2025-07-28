# VoteFlow - Modern Voting Platform

A comprehensive, modern voting platform built with React, TypeScript, and Tailwind CSS. VoteFlow enables organizations, institutions, and communities to create, manage, and run secure elections with real-time results, advanced analytics, and a beautiful user experience.

## 🚀 Features

### Core Functionality
- **Election Management**: Create, edit, and manage elections with multiple positions and candidates
- **Real-time Voting**: Live voting interface with instant results
- **Advanced Analytics**: Comprehensive insights into voting patterns and results
- **User Management**: Role-based access control with organization member management
- **Security**: Enterprise-grade security with 2FA support and device fingerprinting

### User Experience
- **Modern UI/UX**: Beautiful, responsive design with glassmorphism effects
- **Dark Mode**: Full dark mode support with customizable themes
- **Mobile-First**: Optimized for all devices and screen sizes
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

### Advanced Features
- **Subscription Management**: Integrated Paystack payment processing
- **Notification System**: Real-time notifications for election updates
- **File Upload**: Support for candidate photos and election fliers
- **Password Reset**: Complete password reset flow with email validation
- **Multi-step Forms**: Intuitive wizards for complex operations

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Features Overview](#features-overview)
- [Usage Guide](#usage-guide)
- [API Integration](#api-integration)
- [Customization](#customization)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Support](#support)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/voting-app.git
   cd voting-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
voting-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── GlassCard.tsx
│   │   ├── layout/             # Layout components
│   │   │   └── Navbar.tsx
│   │   ├── settings/           # Settings components
│   │   │   ├── ProfileSettings.tsx
│   │   │   ├── SecuritySettings.tsx
│   │   │   ├── NotificationSettings.tsx
│   │   │   └── AppearanceSettings.tsx
│   │   └── organization/       # Organization components
│   │       └── MembersTab.tsx
│   ├── contexts/               # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/                  # Custom hooks
│   │   └── useClickOutside.ts
│   ├── pages/                  # Page components
│   │   ├── auth/               # Authentication pages
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignupPage.tsx
│   │   │   ├── ForgotPasswordPage.tsx
│   │   │   └── ResetPasswordPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── ElectionsPage.tsx
│   │   ├── CreateElectionPage.tsx
│   │   ├── EditElectionPage.tsx
│   │   ├── VotingPage.tsx
│   │   ├── CandidatesPage.tsx
│   │   ├── AnalyticsPage.tsx
│   │   ├── SettingsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── OrganizationPage.tsx
│   │   ├── SubscriptionPage.tsx
│   │   ├── NotificationsPage.tsx
│   │   └── LandingPage.tsx
│   ├── services/               # API services
│   │   ├── api.ts
│   │   └── paystack.ts
│   ├── types/                  # TypeScript interfaces
│   │   └── index.ts
│   ├── utils/                  # Utility functions
│   │   └── cn.ts
│   ├── styles/                 # Global styles
│   │   └── index.css
│   ├── App.tsx                 # Main app component
│   └── index.tsx               # App entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎯 Features Overview

### Authentication System
- **Login/Signup**: Secure authentication with email/password
- **Password Reset**: Complete flow with email validation
- **2FA Support**: Two-factor authentication setup
- **Session Management**: Persistent login with localStorage

### Election Management
- **Multi-step Creation**: Intuitive wizard for creating elections
- **Position Management**: Add multiple positions with custom descriptions
- **Candidate Management**: Add candidates with photos and bios
- **Image Upload**: Support for election fliers and candidate photos
- **Draft System**: Save elections as drafts for later editing

### Voting Interface
- **Public Voting**: Clean, accessible voting interface
- **Real-time Validation**: Election status and voter eligibility checks
- **Multi-position Voting**: Vote for multiple positions in one session
- **Confirmation Flow**: Review votes before submission

### Analytics & Reporting
- **Real-time Results**: Live election results and statistics
- **Voting Patterns**: Detailed analytics on voter behavior
- **Device Analytics**: Browser and device usage statistics
- **Export Capabilities**: Download results and reports

### Organization Management
- **Member Management**: Add, edit, and manage organization members
- **Role-based Access**: Different permission levels for members
- **Branding**: Custom organization branding and settings

### Subscription & Billing
- **Plan Management**: Free, Pro, and Enterprise plans
- **Paystack Integration**: Secure payment processing
- **Payment Methods**: Manage payment methods and billing
- **Usage Tracking**: Monitor plan usage and limits

## 📖 Usage Guide

### For Administrators

#### Creating an Election
1. Navigate to **Elections** → **Create Election**
2. **Step 1**: Enter election details (title, description, dates, image)
3. **Step 2**: Add positions with descriptions
4. **Step 3**: Add candidates (existing or new)
5. **Step 4**: Review and activate or save as draft

#### Managing Elections
- **Edit**: Modify election details, positions, and candidates
- **Activate/Deactivate**: Control election status
- **View Results**: Access real-time analytics and results
- **Share Link**: Copy voting link for distribution

#### Organization Setup
1. **Add Members**: Invite team members with specific roles
2. **Configure Branding**: Set organization logo and colors
3. **Manage Billing**: Handle subscriptions and payment methods

### For Voters

#### Casting Votes
1. Access the voting link provided by the organization
2. Verify election status and eligibility
3. Review election information and candidates
4. Select candidates for each position
5. Review selections and submit votes
6. Receive confirmation of successful voting

### For Organization Members

#### Managing Profile
- Update personal information
- Configure notification preferences
- Set up two-factor authentication
- Manage security settings

#### Viewing Analytics
- Access real-time election results
- Review voting patterns and statistics
- Export data for external analysis

## 🔌 API Integration

### Authentication Endpoints
```typescript
// Login
POST /api/auth/login
Body: { email: string, password: string }

// Signup
POST /api/auth/signup
Body: { name: string, email: string, password: string, organization: string }

// Password Reset
POST /api/auth/forgot-password
Body: { email: string }

POST /api/auth/reset-password
Body: { token: string, email: string, password: string }
```

### Election Endpoints
```typescript
// Create Election
POST /api/elections
Body: { title: string, description: string, startDate: Date, endDate: Date, positions: Position[] }

// Get Elections
GET /api/elections

// Update Election
PUT /api/elections/:id

// Delete Election
DELETE /api/elections/:id
```

### Voting Endpoints
```typescript
// Submit Vote
POST /api/votes
Body: { electionId: string, votes: Vote[] }

// Get Results
GET /api/elections/:id/results
```

## 🎨 Customization

### Theme Customization
The application supports extensive theming through the `ThemeContext`:

```typescript
// Available theme options
interface ThemeSettings {
  theme: 'light' | 'dark';
  primaryColor: string;
  accentColor: string;
  density: 'compact' | 'comfortable';
  radius: 'small' | 'medium' | 'large';
}
```

### CSS Custom Properties
Global appearance is controlled through CSS custom properties:

```css
:root {
  --color-primary: #8b5cf6;
  --color-accent: #ec4899;
  --spacing-base: 1rem;
  --radius-base: 0.5rem;
}
```

### Component Customization
All UI components are built with Tailwind CSS and can be customized:

```typescript
// Example: Custom button variant
<Button 
  variant="custom" 
  className="bg-gradient-to-r from-blue-500 to-purple-500"
>
  Custom Button
</Button>
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_PAYSTACK_PUBLIC_KEY=your-paystack-public-key
REACT_APP_APP_NAME=VoteFlow
```

### Deployment Options

#### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

#### Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Configure environment variables

#### AWS S3 + CloudFront
1. Build the project
2. Upload to S3 bucket
3. Configure CloudFront distribution

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent code formatting
- Write meaningful commit messages
- Add tests for new features

## 📞 Support

### Documentation
- **User Guide**: Access the in-app documentation at `/docs`
- **API Documentation**: Available at `/api-docs`
- **Video Tutorials**: Check our YouTube channel

### Getting Help
- **Email Support**: support@voteflow.com
- **Live Chat**: Available in the app dashboard
- **Community Forum**: Discuss with other users
- **GitHub Issues**: Report bugs and request features

### Status Page
Check our service status at: https://status.voteflow.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for the beautiful icons
- **React Hot Toast** for notifications
- **React Router** for navigation
- **Axios** for HTTP requests

---

**VoteFlow** - Making voting accessible, secure, and transparent for everyone.

*Built with ❤️ for organizations, institutions, and communities worldwide.* 