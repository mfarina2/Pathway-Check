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

### Pages
- Home page (`/`) - Marketing landing page with hero, problem/solution, testimonials
- Pathway form (`/check`) - Multi-step form for user input (3 steps: personal info, baseball profile, target schools)
- Results page (`/results/:id`) - Displays personalized pathway analysis
- Pricing page (`/pricing`) - Three pricing tiers (Free, Recruit Plan, Serious Commit)
- Sample Report page (`/sample-report`) - Example pathway analysis for Michael Farina
- FAQ page (`/faq`) - Categorized questions and answers (6 categories)
- About page (`/about`) - Mission, story, team, and approach
- How It Works page (`/how-it-works`) - Detailed 3-step walkthrough
- Resources page (`/resources`) - Blog with 5 sample articles and category filtering
- Contact page (`/contact`) - Contact form with name, email, subject, message

### Shared Components
- `client/src/components/layout/Header.tsx` - Fixed navigation header with mobile hamburger menu
- `client/src/components/layout/Footer.tsx` - Site footer with product/resources/company links
- `client/src/components/layout/PageWrapper.tsx` - Page wrapper with Header, Footer, and background effects

### Backend Architecture
- **Framework**: Express.js 5 with TypeScript
- **API Pattern**: REST API with JSON responses
- **Server**: Node.js with HTTP server (supports both development and production modes)

API Endpoints:
- `POST /api/pathway-check` - Create a new pathway analysis
- `GET /api/pathway-check/:id` - Retrieve a pathway analysis by ID

### Data Storage
- **Database**: PostgreSQL via `pg` driver
- **ORM**: Drizzle ORM with Zod schema validation
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)

Database tables:
- `users` - Basic user authentication (id, username, password)
- `pathway_checks` - Pathway analysis records (firstName, lastName, email, position, classYear, targetSchools, currentLevel, goals, results as JSONB)

### Key Design Decisions

1. **Monorepo Structure**: Client and server code coexist with shared types in `shared/` directory, enabling type safety across the stack.
2. **Schema-First Validation**: Using `drizzle-zod` to generate Zod schemas from database schema, ensuring consistent validation.
3. **Dark Theme Design**: Dark athletic-themed color scheme (black #0a0a0a background, red #dc2626 accents, blue #3b82f6 hints). Custom utility classes prefixed with "pc-" (pc-card, pc-reveal, pc-text-gradient, pc-red-glow).
4. **Results Generation**: Pathway results are computed server-side based on position competition data and level multipliers, stored as JSONB for flexibility.
5. **Custom Fonts**: Outfit (body) and Red Hat Display (headings) via Google Fonts.

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
