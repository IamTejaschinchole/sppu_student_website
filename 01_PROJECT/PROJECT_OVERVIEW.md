# StudyVault Project Overview

## What Are We Building?

**StudyVault** is an existing student notes/resource marketplace that was already built and functional before this redesign project. It is NOT being built from scratch.

The existing website has:
- Real Firebase Authentication (Google OAuth + Email/Password)
- Real Firestore database with live notes, ratings, comments, payments
- Real Firebase Storage for file uploads/downloads
- Real Razorpay payment integration
- Real users and real data
- Complete SPPU academic navigation (Branch → Semester → Subject → Catalogue)
- Full seller dashboard with earnings tracking
- Note CRUD operations

## Main Objective

The purpose of the current project is:

```
EXISTING STUDYVAULT
+
EXISTING REAL FUNCTIONALITY
+
STITCH-INSPIRED FRONTEND
=
FINAL STUDYVAULT
```

We are transforming the frontend/UI while preserving the existing functional architecture. The Firebase backend, data model, and business logic remain the source of truth.

## Stitch Design

Stitch was used to create the visual design/reference for the frontend redesign.

### Design Direction: "Luminous Scholar Liquid Glass"

**Visual Principles:**
- Dark background (#0f131c deep obsidian-navy)
- Glassmorphism with translucent surfaces
- Backdrop blur effects
- Premium student/education marketplace aesthetic
- Modern navigation
- Clean typography
- Professional spacing
- Electric blue/cyan/violet accents
- Polished but not obviously AI-generated

**Design Tokens:**
- Background: `#0f131c`
- Surface: `#141824`
- Electric Blue: `#4d8eff`
- Cyan: `#4cd7f6`
- Violet: `#a078ff`
- Indigo: `#6366f1`
- Mint: `#2dd4bf`

**Typography:**
- Plus Jakarta Sans (headings)
- Inter (body text)

**Important Distinction:**
- **STITCH** = Visual/Design reference only
- **EXISTING STUDYVAULT CODE/FIREBASE** = Functional source of truth
- Do not force the application architecture to match mockups
- Map design intent to existing real components

## Functionality That Must Remain

The following existing functionality MUST be preserved:

### Authentication
- Google OAuth popup login
- Email/password authentication
- Password reset
- Session persistence (Remember Me)
- User profile synchronization

### Firebase Architecture
- Firestore real-time listeners
- Firebase Storage uploads/downloads
- All existing collections and document schemas
- Security rules (except where explicitly required for new features)

### Core Features
- Note uploads with real Firebase Storage
- Note downloads with payment flow
- Transaction-based rating system with duplicate prevention
- Real-time comments
- Seller dashboard with analytics
- Note editing and deletion
- Earnings/payment data tracking
- SPPU route hierarchy (all routes preserved)
- Search/filter functionality
- Razorpay payment integration

### Phase 4 Features (Added During Redesign)
- My Library (saved/bookmarked notes)
- Public Contributor Profile

**Critical Rule:**
The redesign must NOT replace real functionality with mock/demo functionality. All UI must use real Firebase data.

## No Fake Data Rule

The project must NEVER introduce fake:
- Users
- Avatars
- Notes
- Ratings
- Downloads
- Earnings
- Resources
- Catalogue entries

Unless explicitly required for development/testing and clearly isolated from production data.

If data does not exist, the UI must gracefully handle the missing data.

## Current Technology

**Verified from package.json:**
- React: 18.3.1
- Vite: 8.0.14
- Tailwind CSS: 3.4.17
- Firebase: 12.13.0
- React Router DOM: 7.15.1
- Lucide React: 0.468.0
- Razorpay: Web Checkout SDK (loaded via script in index.html)

**Build Tool:** Vite with Rollup
**Deployment:** Vercel (configured with SPA rewrites)

## Final Product Goal

The finished StudyVault should be:

The original functional StudyVault with its real Firebase architecture and data, presented through the new Stitch-inspired "Luminous Scholar Liquid Glass" frontend.

**Key Points:**
- Same Firebase backend
- Same data model
- Same business logic
- Same routes
- Same real functionality
- New visual design
- Consistent UI across all pages
