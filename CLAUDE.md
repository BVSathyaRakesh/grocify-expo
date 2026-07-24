# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Grocify** is a React Native + Expo mobile app for managing grocery lists with user authentication, cross-platform support (iOS, Android, Web), and a Postgres database backend.

**Stack:**
- Framework: Expo SDK 57 with React Router (file-based routing in `src/app/`)
- Frontend: React Native, React 19, TypeScript, NativeWind (Tailwind CSS)
- Backend: Expo Router API routes (`src/app/api/`), Neon Postgres database
- Database ORM: Drizzle ORM with PostgreSQL dialect
- Auth: Clerk (OAuth-based sign-in/sign-up)
- UI: @expo/ui (native components), SF Symbols (iOS), Material Design icons (Android)
- Styling: Tailwind CSS via NativeWind v4

## Project Structure

```
src/
  app/
    _layout.tsx              # Root layout with ClerkProvider + ThemeProvider
    (auth)/
      _layout.tsx            # Auth stack navigation
      sign-in.tsx            # Sign-in screen (OAuth + social login)
      sign-up.tsx            # Sign-up screen
    (tabs)/
      _layout.tsx            # Tab navigation (NativeTabs with 3 main routes)
      index.tsx              # Grocery list screen
      planner.tsx            # Add/manage items screen
      insights.tsx           # Analytics/stats screen
    api/
      items/
        index+api.ts         # GET/POST for grocery items
        [id]+api.ts          # PATCH/DELETE for specific item
        clear-purchased+api.ts # POST to clear purchased items
  lib/
    server/
      db/
        client.ts            # Drizzle client with Neon + schema
        schema.ts            # Drizzle ORM table definitions
      db-actions.ts          # DB query functions (list, create, update, delete, clear)
  components/
    themed-text.tsx          # Text component with theme support
    themed-view.tsx          # View component with theme support
  hooks/
    useSocialAuth.ts         # Custom hook for social auth
  providers/                 # Custom providers

drizzle/                     # Generated migrations (Drizzle)
scripts/
  seed-grocery.cjs           # Seed script for development data
```

## Frequently Used Commands

```bash
# Development
npm start                    # Start dev server (choose web/iOS/Android in prompt)
npm run ios                  # Run on iOS simulator
npm run android              # Run on Android emulator
npm run web                  # Run web version

# Linting
npm run lint                 # Run ESLint (via expo lint)

# Database
npm run db:push              # Push schema changes to Postgres (via drizzle-kit)
npm run seed:grocery         # Seed development data

# Reset (DESTRUCTIVE)
npm run reset-project        # Reset app to blank state, move old code to app-example/
```

## Key Architecture Decisions

### Database & Backend
- **Neon Postgres** with Drizzle ORM replaces traditional Express server
- API routes are Expo Router handlers (`+api.ts` naming) that run on native via EAS Hosting or a backend server
- Database schema is defined in `src/lib/server/db/schema.ts` and migrated via `drizzle-kit push`
- All DB logic is in `src/lib/server/db-actions.ts` and called from API routes

### Authentication
- **Clerk** handles OAuth (Google, Apple, etc.) and session management
- Token cache stored via `@clerk/expo/token-cache`
- Protected tabs route redirects to sign-in if `!isSignedIn`

### Routing & Navigation
- **Expo Router** with file-based routes in `src/app/`
- Auth stack (`(auth)`) separate from main tabs (`(tabs)`)
- `NativeTabs` at `src/app/(tabs)/_layout.tsx` for bottom tab bar (iOS/Android native look)
- Typed routes enabled via `experiments.typedRoutes: true` in app.json

### Styling
- **NativeWind v4** (Tailwind CSS for React Native)
- Global CSS in `src/global.css`
- Dark/light themes via `useColorScheme()` and context
- Tab tint colors defined in `_layout.tsx` per theme

### UI Components
- @expo/ui for native-feel components and SF Symbols on iOS / Material icons on Android
- Themed wrapper components (ThemedText, ThemedView) for consistent styling

## Database Schema

**Table: `grocery_items`**
- `id` (text, PK): UUID
- `name` (text, NOT NULL): Item name
- `category` (text, NOT NULL): Category string
- `quantity` (integer, default 1): Amount needed
- `purchased` (boolean, default false): Mark as bought
- `priority` (text, default "medium"): Priority level
- `updated_at` (bigint): Timestamp in ms for ordering

No user table (managed by Clerk). Items are currently global; consider adding user_id to schema if per-user lists needed.

## API Routes

**GET /api/items** → Returns all items ordered by `updated_at` DESC
**POST /api/items** → Create item (requires `name`, `category`, `priority`)
**PATCH /api/items/[id]** → Update item (quantity or purchased status)
**DELETE /api/items/[id]** → Delete item
**POST /api/items/clear-purchased** → Delete all purchased items

All routes return JSON with `{ item/items/ok/error }` and appropriate status codes.

## Environment Setup

Create a `.env.local` file (or `.env`) with:
```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-key>
DATABASE_URL=postgresql://user:pass@host/dbname  # Neon connection string
```

See `.env` for template. Clerk key must be prefixed with `EXPO_PUBLIC_` to be accessible in client code.

## Important Notes

- **React Compiler** enabled (`experiments.reactCompiler: true`)
- **Typed Routes** enabled for type-safe navigation
- **Migrations**: Run `npm run db:push` after schema changes; migrations are generated in `drizzle/` directory
- **API Routes**: Use `+api.ts` naming for Expo Router HTTP endpoints
- **Testing**: No tests currently configured; add Jest if needed (see README)
- **Pre-commit Hooks**: Check if `.git/hooks/` has any linting/formatting requirements
