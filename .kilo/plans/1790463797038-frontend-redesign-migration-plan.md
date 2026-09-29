# StudyVault Frontend Redesign Migration Plan

## Design vs Product

- **Design ZIPs** in `zip folders/` are visual references only. They show desired look and feel but do not dictate architecture, data model, or routes.
- **Existing StudyVault codebase** is the source of truth for functionality, data, Firebase architecture, and routes.
- Do not force the application architecture to match the mockups. Map design intent to existing real components; do not invent missing backend structures to satisfy a mockup.

## Real Data Only

- No fake names.
- No fake avatars.
- No fake resources.
- No fake ratings.
- No fake download counts.
- No fake earnings.
- No fake users.
- No mock API responses.
- If data does not exist, the UI must gracefully handle the missing data.

---

## My Library — NOT CURRENTLY IMPLEMENTED

**Status:** There is no library/saved/bookmarks mechanism in the existing Firebase schema or codebase.

- Do NOT use `uploadedBy == currentUser.uid` as a substitute for "My Library". That is "My Uploads", which already exists as the Notes Uploaded section in the Dashboard.
- "My Library" would require a new Firebase collection (e.g., `userLibrary/{userId}/savedNotes`) or a `savedBy` array field on notes, plus Firestore rules, plus a UI to save/bookmark resources. None of this exists.
- If we decide to implement a real library later, the minimum required Firebase structure would be:
  - A `savedNotes` subcollection under each user document: `users/{uid}/savedNotes/{noteId}` with fields `{noteId, savedAt}`.
  - Or a `savedBy` array field on each note document: `notes/{noteId}.savedBy = [uid, ...]`.
  - Firestore rules to allow read/write only for the owning user.
  - A UI component to toggle save/bookmark on note cards and the note detail page.
  - A new route or tab to display saved notes.
- Until then, "My Library" must be marked as NOT CURRENTLY IMPLEMENTED and not shown as a functional tab.

---

## Contributor Profile — NOT CURRENTLY IMPLEMENTED

**Status:** There is no public contributor/profile page in the existing application.

- The private `/dashboard` route is a seller dashboard for managing your own notes, profile display name, and earnings. It is NOT a public contributor profile page.
- A public Contributor Profile would require:
  - A new route (e.g., `/contributor/:uid` or `/u/:uid`).
  - A Firestore `users` collection or profile document with public fields (displayName, photoURL, bio, etc.).
  - A query to fetch the contributor's notes (`useNotes()` filtered by `uploadedBy == uid`).
  - Display of real stats: note count, average rating, total downloads, total earnings (if public).
  - Firestore rules to control what is publicly visible.
- Currently, the `users` collection may not exist or may only contain private auth data. No public profile fields are verified to exist.
- Do not invent bios, followers, badges, or other social statistics that have no backing in the Firebase schema.

---

## Data Availability Matrix

| UI Data | Exists? | Actual Firebase Source | Action |
|---|---|---|---|
| User name | YES | `AuthContext` → `user.displayName` or email prefix | Use `getUserName(user)` |
| User email | YES | `AuthContext` → `user.email` | Display only if user consents |
| User avatar | PARTIAL | `AuthContext` → `user.photoURL` (Google only) | Show if present, else `InitialsAvatar` |
| User bio | NO | N/A | Do not display; mark as not implemented |
| Uploaded resources | YES | `notes` collection filtered by `uploadedBy == uid` | Use `useNotes()` + filter |
| Resource title | YES | `notes/{id}.title` | Display directly |
| Resource description | YES | `notes/{id}.description` | Display directly |
| Resource subject | YES | `notes/{id}.subject` | Display directly |
| Resource branch | PARTIAL | `notes/{id}.tags[0]` (branch slug) | Extract from tags if present |
| Resource semester | YES | `notes/{id}.semester` | Display directly |
| Resource file | YES | `notes/{id}.storagePath` or `fileUrl` | Download via `downloadNote()` |
| Resource price | YES | `notes/{id}.price` or `priceType` / `priceAmount` | Use `isFreeNote()`, `getNotePriceAmount()` |
| Download count | YES | `notes/{id}.downloads` (incremented on download) | Display directly |
| Ratings | YES | `notes/{id}.rating` and `ratingCount` | Use `RatingControl` component |
| Comments | YES | `notes/{id}/comments` subcollection | Use `CommentSection` component |
| Earnings | YES | `payments` collection filtered by `uploadedBy == uid` and `status == 'success'` | Use `useSellerPayments()` |
| Saved/bookmarked resources | NO | N/A | NOT CURRENTLY IMPLEMENTED |
| Purchased resources | NO | N/A | No purchase history mechanism exists |
| Contributor statistics | PARTIAL | Derived from `useNotes()` + `useSellerPayments()` | Calculate in Dashboard only |
| Categories | YES | `getSubjectCounts(notes)` from `utils.js` | Use in CategoriesPage |
| Branches | YES | `sppuBranches` static data in `sppu.js` | Display branch cards |
| Subjects | YES | `sppuSubjects.js` + `getSubjectCounts(notes)` | Display subject cards |
| Semesters | YES | `sppuSubjects.js` per branch | Display semester cards |

---

## 1. Page Mapping

| New Design | Existing Route | Existing Component | Real Data Source | Action |
|---|---|---|---|---|
| Homepage | `/` | `HomePage` in App.jsx | `useNotes()` → notes collection | Redesign with live data |
| Browse/Marketplace | `/sppu` | `SppuBranchesPage` | `sppuBranches` static data + note counts from Firestore | Redesign with live note counts |
| Contributor Profile | `/dashboard` | `DashboardPage` | `useAuth()`, `useNotes()`, `useSellerPayments()` | Redesign contributor view |
| Login | `/login` | `LoginPage` | `useAuth()` → loginWithEmail, loginWithGoogle | Redesign auth form |
| Upload | `/upload` | `UploadPage` | `useAuth()`, Firebase Storage, Firestore | Verify/fix upload flow |
| Resource Detail | `/note/:id` | `NoteDetailPage` | `useNote(id)`, `CommentSection`, `noteActions` | Redesign note viewer |
| My Library | `/dashboard` (tab) | `DashboardPage` | **NOT CURRENTLY IMPLEMENTED** | Add library tab only after explicit decision |
| 404 | `*` | Navigate to `/` | N/A | Add 404 component |
| Contributor Dashboard | `/dashboard` | `DashboardPage` | `useNotes()`, `useSellerPayments()` | Redesign dashboard |

---

## 2. Route Decisions

- Keep all existing routes unchanged.
- SPPU hierarchy must remain:
  - `/sppu`
  - `/sppu/:branch`
  - `/sppu/:branch/:semester`
  - `/sppu/:branch/:semester/:subject`
  - `/sppu/:branch/:semester/:subject/:catalogue`
- Do not remove, flatten, or unnecessarily change these routes.
- No new routes required for redesign.

---

## 3. Functional Gaps

### Must Fix Before Redesign
- `SubjectPlaceholderPage.jsx` - static mock data, needs Firestore query
- `CatalogueDetailPage.jsx` - static mock data, needs Firestore query
- `HomePage` search - disconnected, needs filtering
- `sppuSubjects.js` - empty syllabi for AIDS, ENTC, Mech, Civil

### Can Fix During Redesign
- Theme unification (Indigo vs Mint split)
- `UploadPage.jsx` - verify real Firebase upload works
- `CategoriesPage.jsx` - broken link to `/?subject=...#notes`

### Not Required
- Firebase architecture changes
- Backend changes (none exists)
- Database schema changes

---

## 4. Component Strategy

### Reuse Existing
- `Avatar`, `InitialsAvatar` from `ui.jsx`
- `RatingControl` from `ui.jsx`
- `CommentSection` component
- `RouteSpinner` component
- `useNotes`, `useNote`, `useSellerPayments` hooks
- `noteActions.js` functions
- `AuthContext` auth provider

### Create New
- `GlassCard` - glassmorphism card component
- `SearchBar` - enhanced search with filtering
- `ResourceGrid` - responsive resource grid
- `LoadingState` / `EmptyState` / `ErrorState`
- `Navbar` - redesigned with glassmorphism
- `Footer` component
- `FilterPanel` - filter sidebar

---

## 5. Design System

Colors from new design:
- Background: `#0f131c`
- Primary: `#4d8eff`
- Cyan: `#4cd7f6`
- Violet: `#a078ff`
- Surface glass: rgba with backdrop-blur

Fonts:
- Plus Jakarta Sans (headings)
- Inter (body)

Tailwind config additions needed:
- New color palette
- Glassmorphism utilities
- backdrop-blur support

---

## 6. Data Flow

### Homepage
`useNotes()` → filter/sort → display notes and contributors

### Browse
`sppuBranches` → note counts from Firestore → branch cards

### Contributor Profile
**NOT CURRENTLY IMPLEMENTED** — No public contributor profile page exists. The private `/dashboard` is a seller dashboard, not a public profile. A public profile would require a new route, a `users` profile collection, and Firestore rules. See the Contributor Profile section above.

### Resource Detail
`useNote(id)` → note data + `CommentSection` → download/rating

### My Library
**NOT CURRENTLY IMPLEMENTED** — No library/saved/bookmarks mechanism exists in Firebase. `useNotes()` filtered by `uploadedBy == uid` is "My Uploads", not "My Library". A real library would require a new Firebase collection, Firestore rules, UI, and route. See the My Library section above.

### Dashboard
`useNotes()` + `useSellerPayments()` → earnings, downloads, note management

---

## 7. Implementation Order

### Phase 1 — Fix Existing Functionality

1. Fix `sppuSubjects.js` - add missing branch syllabi for AIDS, ENTC, Mech, Civil
2. Fix `SubjectPlaceholderPage.jsx` - replace static mock data with Firestore query for catalogues
3. Fix `CatalogueDetailPage.jsx` - replace static mock data with Firestore query for resources
4. Fix `HomePage` search - connect to live `useNotes()` filtering via `filterAndSortNotes()`
5. Fix `CategoriesPage.jsx` - fix broken `/?subject=...#notes` link

### Phase 2 — Establish Design System

6. Update Tailwind config with new design tokens (colors `#0f131c`, `#4d8eff`, `#4cd7f6`, `#a078ff`)
7. Add glassmorphism utilities and backdrop-blur support
8. Create shared components: `GlassCard`, `LoadingState`, `EmptyState`, `ErrorState`, `Footer`

### Phase 3 — Redesign Existing Real Pages

9. Redesign `Navbar` with glassmorphism
10. Redesign `HomePage` with new design using live data (no fake names, avatars, ratings, downloads)
11. Redesign `SppuBranchesPage` and hierarchy pages (`SemesterSelectionPage`, `SubjectMarketplacePage`) with live note counts from Firestore
12. Redesign `NoteDetailPage` with new design using real uploader name, real downloads, real rating
13. Redesign `DashboardPage` with new design using real earnings from `useSellerPayments()`, real note CRUD
14. Redesign `LoginPage` with glassmorphism
15. Redesign `UploadPage` with new design, verify real Firebase upload works
16. Add 404 page component

### Phase 4 — New Functionality (only if explicitly decided)

17. My Library — requires new Firebase collection, Firestore rules, UI, and route. NOT CURRENTLY IMPLEMENTED.
18. Public Contributor Profile — requires new route, `users` profile collection, Firestore rules. NOT CURRENTLY IMPLEMENTED.

### Phase 5 — Testing

19. Test all existing functionality
20. Test all redesigned pages
21. Verify Firebase data loads on each page
22. Verify search/filter works
23. Verify upload/download/rating/comments flow
24. Verify dashboard CRUD works
25. Verify auth flows work
26. Build and deploy test

---

## 8. Files to Modify

### Core Pages (redesign)
- `src/App.jsx` - update `Navbar`, `HomePage`, add 404 route
- `src/pages/SppuBranchesPage.jsx` - redesign with live note counts
- `src/pages/SemesterSelectionPage.jsx` - redesign
- `src/pages/SubjectMarketplacePage.jsx` - redesign
- `src/pages/SubjectPlaceholderPage.jsx` - fix Firestore query + redesign
- `src/pages/CatalogueDetailPage.jsx` - fix Firestore query + redesign
- `src/pages/NoteDetailPage.jsx` - redesign with real data
- `src/pages/DashboardPage.jsx` - redesign with real data
- `src/pages/LoginPage.jsx` - redesign
- `src/pages/UploadPage.jsx` - redesign + verify upload

### Shared Components
- `src/components/ui.jsx` - add `GlassCard`, `LoadingState`, `EmptyState`, `ErrorState`
- `src/components/Navbar.jsx` (new) - glassmorphism navbar
- `src/components/Footer.jsx` (new)
- `src/components/GlassCard.jsx` (new)

### Config
- `tailwind.config.js` - new colors, glassmorphism utilities
- `src/index.css` - global styles for new design

### Data Layer (fix only, do not change architecture)
- `src/data/sppuSubjects.js` - add missing branch syllabi

---

## 9. Files to Preserve (do not rewrite)

- `src/firebase.js` - Firebase singleton
- `src/AuthContext.jsx` - authentication context
- `src/lib/noteActions.js` - rating, download, payment logic
- `src/lib/errors.js` - error message helpers
- `src/lib/sppu.js` - SPPU branch data
- `src/lib/constants.js` - constants
- `src/lib/utils.js` - utility functions
- `src/hooks/useNotes.js` - notes data hook
- `src/hooks/useNote.js` - single note hook
- `src/hooks/useSellerPayments.js` - seller payments hook
- `src/components/CommentSection.jsx` - comments component
- `src/components/RouteSpinner.jsx` - route loading spinner
- `firestore.rules` - Firebase security rules
- `storage.rules` - Firebase storage rules

---

## 10. Risks

- **Firebase security rules** — must remain compatible with all redesigned pages
- **Storage rules** — PDF/ZIP/DOC/RAR allowed; must not change
- **Razorpay integration** — payment flow must remain intact
- **Authentication** — `AuthContext` must not be broken
- **Real-time listeners** — `useNotes()`, `useNote()`, `useSellerPayments()` must continue working
- **SPPU routing** — `/sppu/:branch/:semester/:subject/:catalogue` must remain functional
- **Existing working functionality** — must not break during redesign
- **Real data only** — no fake names, avatars, ratings, downloads, earnings, or users