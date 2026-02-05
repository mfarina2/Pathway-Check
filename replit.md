# PathwayCheck

## Overview

PathwayCheck is a web application designed to help high school baseball recruits evaluate playing-time opportunities at colleges. The platform allows recruits to input their information (position, class year, target schools, current playing level) and receive personalized pathway analysis including competition metrics, depth chart projections, and verification questions to ask during the recruiting process.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend follows a page-based architecture with three main routes:
- Home page (`/`) - Marketing landing page
- Pathway form (`/check`) - Multi-step form for user input
- Results page (`/results/:id`) - Displays pathway analysis

### Backend Architecture
- **Framework**: Express.js 5 with TypeScript
- **API Pattern**: REST API with JSON responses
- **Server**: Node.js with HTTP server (supports both development and production modes)

The server handles:
- Static file serving in production
- Vite dev server integration in development
- API endpoints for pathway check creation and retrieval

### Data Storage
- **Database**: PostgreSQL via `pg` driver
- **ORM**: Drizzle ORM with Zod schema validation
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)

Database tables:
- `users` - Basic user authentication (id, username, password)
- `pathway_checks` - Pathway analysis records with results stored as JSONB

### Key Design Decisions

1. **Monorepo Structure**: Client and server code coexist with shared types in `shared/` directory, enabling type safety across the stack.

2. **Schema-First Validation**: Using `drizzle-zod` to generate Zod schemas from database schema, ensuring consistent validation.

3. **Dark Theme Design**: The application uses a dark, athletic-themed color scheme (black background, red accents, blue hints) matching the baseball/sports aesthetic.

4. **Results Generation**: Pathway results are computed server-side based on position competition data and level multipliers, stored as JSONB for flexibility.

## External Dependencies

### Database
- PostgreSQL database (connection via `DATABASE_URL` environment variable)
- Drizzle Kit for schema migrations (`npm run db:push`)

### Third-Party Services
- None currently integrated (no authentication providers, payment systems, or external APIs)

### Key NPM Packages
- `@tanstack/react-query` - Server state management
- `drizzle-orm` / `drizzle-zod` - Database ORM and validation
- `express` v5 - HTTP server framework
- `connect-pg-simple` - PostgreSQL session store (available but not actively used)
- Full shadcn/ui component suite via Radix UI primitives