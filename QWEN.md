# Project Context: CivicConnect React Application

## Project Overview
This directory contains the CivicConnect React application - a crowdsourced civic issue reporting system. The application allows citizens to report civic issues like potholes, streetlight problems, garbage collection issues, etc., and track their resolution. It features a modern UI with dark/light theme support, map visualization, data charts, and local storage persistence.

The application is built with React and Vite, using modern web technologies and libraries for mapping, charting, and UI components.

## Technologies Used
- **Frontend Framework**: React 18+ with JSX
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **UI Libraries**: 
  - Leaflet.js with React-Leaflet for map functionality
  - Chart.js with react-chartjs-2 for data visualization
  - Font Awesome for icons
- **State Management**: React useState and useEffect hooks
- **Styling**: Custom CSS with CSS variables for theming
- **Persistence**: localStorage for data and theme persistence
- **Development Tools**: ESLint for code quality

## Project Architecture
The application follows a component-based architecture with a clear separation of concerns:

```
src/
├── App.jsx              # Main application component with routing
├── main.jsx             # Application entry point
├── index.css            # Global styles and theme definitions
├── components/          # Reusable UI components
│   ├── Header.jsx       # Navigation header with theme toggle
│   ├── Footer.jsx       # Application footer
│   ├── Toast.jsx        # Notification component
│   └── MapPreview.jsx   # Map visualization component
├── pages/               # Page components for routing
│   ├── Home.jsx         # Homepage with quick report form
│   ├── ReportIssue.jsx  # Issue reporting form
│   ├── Issues.jsx       # List of reported issues with filtering
│   └── Dashboard.jsx    # Data visualization dashboard
├── utils/               # Utility functions
│   └── theme.js         # Theme persistence functions
└── assets/              # Static assets (images, etc.)
```

## Key Features Implemented
1. **Issue Reporting**: Users can report civic issues with details, category, urgency level, location, and optional photo
2. **Geolocation**: Automatic location detection with manual override
3. **Map Integration**: Interactive map preview using Leaflet.js
4. **Dashboard Analytics**: Charts showing issue statistics by status and category
5. **Issue Tracking**: Users can view, search, and filter reported issues
6. **Status Management**: Toggle issue status between pending and resolved
7. **Theme Support**: Dark/light mode with user preference persistence
8. **Data Export**: Export reports as JSON
9. **Data Persistence**: localStorage for maintaining data between sessions
10. **Responsive Design**: Mobile-friendly layout

## Development Environment
- **Package Manager**: npm
- **Development Server**: Vite development server with HMR
- **Linting**: ESLint with React-specific rules
- **Bundling**: Vite for production builds

## Building and Running
### Development
To start the development server with hot module replacement:
```bash
npm run dev
```

### Production Build
To create a production build:
```bash
npm run build
```

### Preview Production Build
To preview the production build locally:
```bash
npm run preview
```

### Linting
To run ESLint for code quality checks:
```bash
npm run lint
```

## Development Conventions
1. **Component Structure**: Components are organized by type (pages vs reusable components)
2. **State Management**: Using React hooks for local state management
3. **Routing**: Using React Router DOM for client-side routing
4. **Styling**: CSS variables for theme management with light and dark modes
5. **Data Persistence**: localStorage for client-side data storage
6. **Code Quality**: ESLint configuration with React best practices
7. **Naming**: PascalCase for components, camelCase for variables and functions

## Dependencies
### Production Dependencies
- react, react-dom: Core React libraries
- react-router-dom: Client-side routing
- leaflet, react-leaflet: Map visualization
- chart.js, react-chartjs-2: Data visualization
- @fortawesome/fontawesome-free: Icons

### Development Dependencies
- @vitejs/plugin-react: React plugin for Vite
- vite: Build tool and development server
- eslint: Code linting
- @types/react, @types/react-dom: TypeScript definitions

## Project Status
This is a prototype/demo application built for a Smart India Hackathon (SIH) project. It's a fully functional single-page application that demonstrates the core features of a civic issue reporting system. The application uses client-side storage and does not have a backend API, making it suitable for demonstration purposes.