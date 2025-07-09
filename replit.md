# KNOUX VERSA - The Uncensored AI Nexus

## Overview

KNOUX VERSA is an advanced AI-powered image transformation platform that combines unlimited creative potential with sophisticated technical architecture. This full-stack application provides users with the ability to select regions of images and transform them using natural language commands in both Arabic and English, without restrictions or censorship.

The system implements a modern web application architecture with React frontend, Express backend, and optional Electron desktop support, featuring glassmorphism UI design and advanced AI integration capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS with custom CSS variables for theming
- **UI Components**: Shadcn/ui design system with custom glassmorphism styling
- **State Management**: React hooks and context patterns
- **Internationalization**: Custom language provider supporting Arabic (RTL) and English (LTR)
- **Canvas Manipulation**: Multiple canvas implementations for image selection and editing

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL via Neon with Drizzle ORM
- **File Handling**: Multer for image uploads with size limits
- **AI Integration**: Modular AI service architecture supporting HuggingFace and other providers

### Desktop Application
- **Framework**: Electron with secure IPC communication
- **Preload Script**: Secure bridge between main and renderer processes
- **Build System**: Custom build scripts for production packaging

## Key Components

### Image Processing Pipeline
- **Upload Handler**: Secure file upload with validation (JPEG, PNG, WebP up to 10MB)
- **Canvas System**: Multiple canvas implementations (Simple, Advanced, Fabric.js-based)
- **Selection Tools**: Rectangle, circle, and freehand selection tools
- **AI Integration**: Modular AI service manager with support for multiple providers

### AI Services Architecture
- **Service Manager**: Central orchestration of AI transformations
- **HuggingFace Integration**: Free tier integration for image processing models
- **Model Support**: Stable Diffusion, ControlNet, and specialized image processing models
- **VIP System**: Encrypted access control for advanced features

### User Interface Components
- **Glassmorphism Design**: Semi-transparent cards with neon accents
- **Neural Background**: Animated SVG neural network visualization
- **Services Layout**: Modular service selection with customization panels
- **Results Comparison**: Before/after image comparison with interactive slider
- **Processing Modal**: Real-time progress tracking with animated effects

### Database Schema
- **Users**: Basic user authentication
- **Transformations**: History of AI transformations with metadata
- **VIP Sessions**: Encrypted session management for premium features

## Data Flow

1. **Image Upload**: User uploads image via drag-and-drop or file picker
2. **Selection**: User selects image regions using canvas tools
3. **Command Input**: Natural language prompt in Arabic or English
4. **AI Processing**: Backend routes request to appropriate AI service
5. **Result Display**: Transformed image shown in comparison view
6. **Download/Share**: Users can save results or share transformations

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL (free tier supported)
- **AI Services**: HuggingFace Inference API (free models)
- **UI Framework**: Radix UI components via Shadcn/ui
- **Canvas Manipulation**: Fabric.js for advanced selection tools

### Development Tools
- **Build System**: Vite for frontend bundling
- **Database Migrations**: Drizzle Kit for schema management
- **Type Safety**: TypeScript throughout the stack
- **Linting**: ESLint with TypeScript support

### Optional Integrations
- **Desktop**: Electron for native application
- **Advanced AI**: Support for local model execution
- **Cloud Storage**: Configurable for image persistence

## Deployment Strategy

### Development Environment
- **Mock Storage**: In-memory storage when database is unavailable
- **Hot Reload**: Vite development server with HMR
- **Environment Configuration**: Flexible .env support

### Production Considerations
- **Database Setup**: Automated setup script for easy deployment
- **Static Assets**: Optimized build output with asset compression
- **Security**: Helmet middleware with CORS configuration
- **Performance**: Compression middleware and optimized bundling

### Electron Distribution
- **Cross-Platform**: Windows, macOS, and Linux support
- **Auto-Updates**: Configurable update system
- **Security**: Secure IPC with context isolation

## Changelog

Changelog:
- July 03, 2025. Initial setup
- July 03, 2025. Successfully migrated from Replit Agent to Replit environment
- July 03, 2025. Enhanced interface design with beautiful 3D background, KNOUX VERSE logo, and organized service grid
- July 03, 2025. Fixed dependencies (tsx, canvas system libraries) and ensured proper security practices
- July 03, 2025. Added PostgreSQL database with Drizzle ORM, successfully migrated schema and switched from MockStorage to DatabaseStorage
- July 03, 2025. Fixed Fabric.js v6.7.0 import issues, updated AdvancedImageCanvas to use new API structure
- July 03, 2025. Restored complete interface with three main sections: AI Services, Local Tools (30 tools), and Models Manager
- July 09, 2025. Successfully migrated from Replit Agent to Replit environment, fixed tsx dependency issues, resolved Local AI Tools component errors, verified all core components are working properly
- July 09, 2025. Added comprehensive Elysian Canvas: Artistic Templates Gallery with 50+ professional adult-oriented templates, complete VIP system, advanced AI processing pipeline, and full customization capabilities

## User Preferences

Preferred communication style: Simple, everyday language.