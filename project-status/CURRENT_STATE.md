# StudyVault Current State

> **Last Updated**: 2026-09-27  
> **Status**: Full Project Audit Complete & Documented  
> **Primary Maintainer / Author**: Antigravity AI Pair Programmer

---

## Project Overview
**StudyVault** (formerly SPPU Student Notes Marketplace) is a community-driven academic resource marketplace and study library designed primarily for students of **Savitribai Phule Pune University (SPPU)**, with planned support for competitive examinations (JEE, NEET) and general engineering courses.

The application allows students to:
- Navigate course materials through an intuitive academic hierarchy: **Branch $\rightarrow$ Semester $\rightarrow$ Subject $\rightarrow$ Catalogues/Resources**.
- Access free and paid PDF notes, previous year question papers (PYQs), lab manuals, and assignments.
- Buy paid notes securely via Razorpay with instant PDF delivery.
- Rate, review, and comment on study materials.
- Operate a seller dashboard to upload content, monitor download numbers, track ratings, and view earnings.

---

## Tech Stack
- **Build Tool / Bundler**: Vite 8.0.14 with `@vitejs/plugin-react` (Rollup-powered production builds).
- **Frontend Framework**: React 18.3.1 (Functional components, Hooks, Context API).
- **Routing**: React Router DOM 7.15.1 with lazy-loaded route-level code splitting (`React.lazy` + `Suspense`).
- **Styling**: Tailwind CSS 3.4.17 with PostCSS and Autoprefixer. Google Fonts: `Inter`.
- **Iconography**: Lucide React 0.468.0.
- **Backend-as-a-Service**: Firebase SDK 12.13.0
  - **Firebase Authentication**: User accounts, Google OAuth popup, password reset.
  - **Cloud Firestore**: Real-time NoSQL database for metadata, notes, comments, ratings, and payments.
  - **Firebase Storage**: Secure file hosting for uploaded PDF resources.
- **Payment Gateway**: Razorpay Web Checkout SDK (`https://checkout.razorpay.com/v1/checkout.js`).
- **Deployment Platform**: Vercel (configured with SPA rewrites).

---

## Frontend Structure
The frontend is organized as a client-side Single Page Application (SPA):

```
src/
├── main.jsx                     # Mounts app into #root inside BrowserRouter
├── App.jsx                      # Route switchboard, sticky Navbar, and HomePage component
├── AuthContext.jsx              # Global authentication context & state management
├── firebase.js                  # Firebase app, auth, db, and storage initialization
├── index.css                    # Global CSS variables, font imports, focus ring defaults
├── components/
│   ├── ui.jsx                   # Reusable UI primitives (Avatar, DashboardStat, ErrorMessage, etc.)
│   ├── RouteSpinner.jsx         # Suspense route loading fallback
│   └── CommentSection.jsx       # Real-time note discussion list & comment submission form
├── data/
│   └── sppuSubjects.js          # Academic data dictionary: branches, semesters, subject syllabi
├── hooks/
│   ├── useNotes.js              # Real-time Firestore snapshot listener on all notes
│   ├── useNote.js               # Real-time Firestore snapshot listener on single note by ID
│   └── useSellerPayments.js     # Real-time Firestore query for a seller's payment logs
├── lib/
│   ├── constants.js             # Filter lists, accent color maps, and Razorpay Key ID
│   ├── errors.js                # Human-readable error message mappers for Auth/Firestore/Storage
│   ├── noteActions.js           # Atomic rating transactions, Razorpay checkout, PDF downloader
│   ├── sppu.js                  # Helper functions bridging data/sppuSubjects.js to components
│   └── utils.js                 # Note filtering/sorting, file formatting, avatar utilities
└── pages/
    ├── CategoriesPage.jsx       # Grid of subjects with note counts
    ├── SppuBranchesPage.jsx     # SPPU Engineering branches list with statistics
    ├── SemesterSelectionPage.jsx# Semester cards for a selected branch (Sem 1 to 8)
    ├── SubjectMarketplacePage.jsx# Subjects list for a selected branch & semester
    ├── SubjectPlaceholderPage.jsx# Catalogue collections for a specific subject
    ├── CatalogueDetailPage.jsx  # Individual resource files within a catalogue
    ├── NoteDetailPage.jsx       # Single note viewer with PDF download, rating & comments
    ├── DashboardPage.jsx        # Creator dashboard (earnings, downloads, note edit/delete)
    ├── UploadPage.jsx           # Multi-step catalogue & resource upload form
    ├── LoginPage.jsx            # Sign-in page with Email/Password & Google Sign-In
    ├── RegisterPage.jsx         # Registration page for new student accounts
    ├── BranchPlaceholderPage.jsx # Alias re-exporting SemesterSelectionPage
    └── SemesterPlaceholderPage.jsx # Alias re-exporting SubjectMarketplacePage
```

---

## Backend Structure
There is **no standalone custom Express/Node server**. The architecture is 100% serverless, leveraging Firebase directly from the browser:
- **Client $\rightarrow$ Firebase Auth**: Handles account registration, login tokens, session persistence.
- **Client $\rightarrow$ Cloud Firestore**: Reads and writes document data directly, enforced strictly by declarative security rules in [`firestore.rules`](file:///c:/Users/tejas/sppu_student_website/firestore.rules).
- **Client $\rightarrow$ Firebase Storage**: Direct multipart binary uploads for PDF files, guarded by [`storage.rules`](file:///c:/Users/tejas/sppu_student_website/storage.rules).
- **Client $\rightarrow$ Razorpay Gateway**: Direct modal invocation via public Razorpay Key ID.

---

## Database
Cloud Firestore is used as the document store with the following collections and document schemas:

### 1. `users/{userId}`
Stores student profile records created automatically upon first login/registration:
- `uid` *(string)*: Unique Firebase Auth UID.
- `name` *(string)*: Full student name.
- `email` *(string)*: Email address.
- `photoURL` *(string)*: Profile picture URL.
- `providerIds` *(array of strings)*: Auth providers (`password`, `google.com`).
- `createdAt` *(serverTimestamp)*: Account creation time.
- `lastLoginAt` *(serverTimestamp)*: Last activity timestamp.

### 2. `notes/{noteId}`
Primary storage for study note documents:
- `title` *(string)*: Note title.
- `description` *(string)*: Detailed description.
- `subject` *(string)*: Subject name.
- `semester` *(number)*: Semester (currently validated in rules).
- `tags` *(array of strings)*: Keyword tags.
- `price` *(string)*: Display price (e.g., `'Free'` or `'Rs. 49'`).
- `priceType` *(string)*: `'free'` or `'paid'`.
- `priceAmount` *(number)*: Numeric price in INR.
- `storagePath` *(string)*: Firebase Storage bucket path.
- `fileName` *(string)*: Original uploaded filename.
- `uploadedBy` *(string)*: Uploader's UID.
- `uploaderName` *(string)*: Uploader's display name.
- `uploaderAvatar` *(string)*: Uploader's photo URL.
- `downloads` *(number)*: Total download counter.
- `rating` *(number)*: Current aggregate rating (0 to 5).
- `ratingCount` *(number)*: Number of ratings received.
- `createdAt` *(serverTimestamp)*: Upload timestamp.

### 3. `notes/{noteId}/ratings/{userId}`
Subcollection recording individual user ratings to prevent duplicate voting:
- `rating` *(number)*: Star rating given (1 to 5).
- `userId` *(string)*: Rating author UID.
- `userName` *(string)*: Rating author name.
- `userAvatar` *(string)*: Rating author photo URL.
- `createdAt` *(serverTimestamp)*: Rating timestamp.

### 4. `notes/{noteId}/comments/{commentId}`
Subcollection for real-time discussion:
- `text` *(string)*: Comment message (max 1000 characters).
- `userId` *(string)*: Comment author UID.
- `userName` *(string)*: Comment author name.
- `userAvatar` *(string)*: Comment author photo URL.
- `createdAt` *(serverTimestamp)*: Timestamp.

### 5. `payments/{paymentId}`
Payment transaction records saved following successful Razorpay checkout:
- `noteId` *(string)*: ID of the purchased note.
- `noteTitle` *(string)*: Note title.
- `subject` *(string)*: Note subject.
- `uploadedBy` *(string)*: Note creator UID.
- `payerId` *(string)*: Buyer's UID.
- `payerName` *(string)*: Buyer's name.
- `payerEmail` *(string)*: Buyer's email.
- `amountPaise` *(number)*: Paid amount in paise.
- `amountRupees` *(number)*: Paid amount in INR.
- `currency` *(string)*: `'INR'`.
- `status` *(string)*: `'success'`.
- `razorpayPaymentId` *(string)*: Razorpay transaction reference ID.
- `razorpayOrderId` *(string)*: Razorpay order ID.
- `razorpaySignature` *(string)*: Razorpay verification signature.
- `createdAt` *(serverTimestamp)*: Transaction timestamp.

---

## Authentication
Managed centrally via [`AuthContext.jsx`](file:///c:/Users/tejas/sppu_student_website/src/AuthContext.jsx):
- **Email/Password**: `createUserWithEmailAndPassword` and `signInWithEmailAndPassword`.
- **Google OAuth**: `signInWithPopup(auth, new GoogleAuthProvider())`.
- **Password Reset**: `sendPasswordResetEmail(auth, email)`.
- **Persistence**: Switches between `browserLocalPersistence` (Remember Me) and `browserSessionPersistence`.
- **Protected Routes**: `<ProtectedRoute>` wrapper redirects unauthenticated traffic to `/login` preserving target location in `state.from`.

---

## API Endpoints
As a serverless Firebase application, there are no internal Express/REST endpoints. The app communicates with:
- **Firebase Auth REST API**: `https://identitytoolkit.googleapis.com`
- **Cloud Firestore gRPC-web / REST API**: `https://firestore.googleapis.com`
- **Cloud Storage API**: `https://firebasestorage.googleapis.com`
- **Razorpay Checkout API**: `https://api.razorpay.com` via loaded `checkout.js` script.

---

## Existing Routes

| Route | Component | Access | Description |
|---|---|---|---|
| `/` | `HomePage` (`App.jsx`) | Public | Landing page with hero, search bar, category shortcuts, top catalogues, and top creators. |
| `/categories` | `CategoriesPage` | Public | Grid of all subjects with uploaded note counts. |
| `/sppu` | `SppuBranchesPage` | Public | SPPU branch selector (FE, IT, Computer, AIDS, ENTC, Mech, Civil). |
| `/sppu/:branchSlug` | `SemesterSelectionPage` | Public | Semester selector for the chosen branch (e.g. Sem 1–8). |
| `/sppu/:branchSlug/:semesterSlug` | `SubjectMarketplacePage` | Public | Subjects available for the chosen branch and semester. |
| `/sppu/:branchSlug/:semesterSlug/:subjectSlug` | `SubjectPlaceholderPage` | Public | Catalogues and bundles available for the subject. |
| `/sppu/:branchSlug/:semesterSlug/:subjectSlug/:catalogueId` | `CatalogueDetailPage` | Public | List of resources inside a catalogue with individual download buttons. |
| `/note/:id` | `NoteDetailPage` | Public | Detailed view of a note, rating widget, comments, and PDF download/pay button. |
| `/dashboard` | `DashboardPage` | **Protected** | Seller overview: uploaded notes, downloads, revenue, profile edit, note CRUD. |
| `/upload` | `UploadPage` | **Protected** | Multi-resource catalogue creation and upload interface. |
| `/login` | `LoginPage` | Public | Email and Google login with password reset. |
| `/register` | `RegisterPage` | Public | User registration form. |
| `*` | `<Navigate to="/" />` | Public | Catch-all redirect to homepage. |

---

## Existing Features
1. **Curriculum Hierarchy**: Branch $\rightarrow$ Semester $\rightarrow$ Subject drilldown tailored to SPPU syllabus.
2. **User Authentication**: Dual-mode login (Google OAuth & Email/Password) with persistent sessions.
3. **Note Download Engine**:
   - Free note downloads trigger direct blob downloads with a popup-blocked fallback.
   - Increment of download count in Firestore.
4. **Payment Monetization**:
   - Razorpay payment modal with automatic INR to paise conversion.
   - Transaction logging in Firestore `payments` collection.
5. **Interactive Rating System**:
   - 1-to-5 star rating widget.
   - Firestore transaction computing updated average rating atomically without race conditions.
6. **Live Commenting**:
   - Real-time Firestore snapshot listener on comments.
   - User avatar and timestamp rendering.
7. **Creator Dashboard**:
   - Cumulative download statistics, rating averages, and calculated earnings.
   - Edit note metadata (title, description, price).
   - Delete note (removes document, storage PDF file, and subcollections).
   - Display name update.

---

## Working Features
- ✅ Firebase Authentication & session state management.
- ✅ Routing, lazy loading, and suspense spinners.
- ✅ Note detail rendering, live ratings, and live comments on `/note/:id`.
- ✅ Note editing and deletion on `/dashboard`.
- ✅ Razorpay checkout integration logic in `noteActions.js`.
- ✅ SPPU branch & semester browsing for First Year, Information Technology, and Computer Engineering.
- ✅ Production Vite build (`vite build`) compiles cleanly without warnings or errors.

---

## 🛡️ DO NOT BREAK (Critical Working Contracts)

The following working systems, contracts, and patterns **MUST BE PRESERVED** during all future file-by-file changes and refactorings:

### 1. Authentication & Session State (`src/AuthContext.jsx`)
- **Do not break**:
  - `GoogleAuthProvider` popup login (`loginWithGoogle`).
  - Email/password authentication (`loginWithEmail`, `registerWithEmail`).
  - Automatic Firestore user synchronization in `ensureUserDocument(user)` on `onAuthStateChanged`.
  - Persistence selection (`browserLocalPersistence` vs `browserSessionPersistence`) based on the "Remember Me" flag.
  - Password reset dispatch via `sendPasswordResetEmail`.
  - `<ProtectedRoute>` redirect mechanism preserving the intended destination in `location.state.from`.

### 2. Database Connection & Client Singleton (`src/firebase.js`)
- **Do not break**:
  - Direct Firebase client singleton exports: `auth`, `db`, `storage`.
  - The `firebaseReady` Promise export used across hooks and actions to guarantee initialized Firebase instances before attempting queries.
  - Real-time reactive listeners (`onSnapshot`) in `useNotes`, `useNote`, and `useSellerPayments`.

### 3. Note Interactions, Atomic Ratings & Comments (`src/lib/noteActions.js`, `src/components/CommentSection.jsx`)
- **Do not break**:
  - Transaction-based rating aggregation (`submitRating`): Calculates weighted average `rating` and increments `ratingCount` atomically inside a Firestore `runTransaction`.
  - Duplicate rating prevention: Rejects submission if `notes/{noteId}/ratings/{userId}` already exists.
  - Real-time comment stream on `notes/{noteId}/comments` ordered chronologically by `createdAt`.

### 4. PDF Download & Monetization Engine (`src/lib/noteActions.js`)
- **Do not break**:
  - Free note direct binary download via `handleDownload(url, fileName)` (creates temporary `<a>` element with blob URL, plus popup fallback if blocked).
  - Razorpay checkout initiation (`openRazorpayCheckout`): Passes `amountPaise = priceAmount * 100`, attaches prefill user data, and opens the standard checkout modal.
  - Atomic increment of note download counter: `updateDoc(doc(db, 'notes', note.id), { downloads: increment(1) })`.
  - Transaction record creation in `payments` collection with complete payment metadata and Razorpay signature.

### 5. Seller Management & Data Integrity (`src/pages/DashboardPage.jsx`)
- **Do not break**:
  - Note ownership isolation: Only notes where `note.uploadedBy === user.uid` can be edited or deleted.
  - Complete deletion lifecycle: When deleting a note, both the Storage object (`deleteObject`), Firestore subcollections (`ratings`, `comments`), and the primary note document MUST be cleaned up.
  - Earnings calculation logic: `totals.earnings` derived directly from successful payments (`status === 'success'`).

### 6. Academic Curriculum Routing (`src/App.jsx`, `src/data/sppuSubjects.js`, `src/lib/sppu.js`)
- **Do not break**:
  - Hierarchical URL structure: `/sppu/:branchSlug/:semesterSlug/:subjectSlug`.
  - Slug generation via `slugifyAcademicName`: Keeps URLs clean, lowercase, hyphen-delimited, and replaces `&` with `and`.
  - Existing branch routes for `first-year-engineering`, `information-technology`, and `computer-engineering`.

### 7. Build Pipeline & Deployment Contracts (`vite.config.js`, `vercel.json`, `package.json`)
- **Do not break**:
  - Production build command: `chmod +x node_modules/.bin/vite && vite build` (or `vite build`).
  - Manual Rollup vendor chunking (`output.manualChunks` in `vite.config.js`).
  - Vercel client-side SPA rewrite rule in `vercel.json`:
    ```json
    { "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
    ```
  - Static script inclusion of `<script src="https://checkout.razorpay.com/v1/checkout.js"></script>` in `index.html`.

---

## 🔍 VERIFIED vs ASSUMED (Feature Audit Matrix)

Every capability in the application is audited below against its actual verification status:
- **`VERIFIED`** — Tested and confirmed functioning in this environment.
- **`PARTIAL`** — Exists in UI/code, but incomplete or disconnected.
- **`BROKEN`** — Currently failing due to rules, code mismatch, or missing logic.
- **`ASSUMED`** — Valid code exists, but requires live browser sessions / live credentials to execute.
- **`UNKNOWN`** — Cannot be determined from client source code alone.

| Feature Area | Specific Functionality | Status | Details / Evidence |
|---|---|---|---|
| **Build & Tooling** | Production bundling & chunking | **`VERIFIED`** | `vite build` completed with code 0; 1616 modules transformed, valid `dist/` created. |
| **Build & Tooling** | Tailwind CSS & PostCSS compilation | **`VERIFIED`** | All utility classes compile cleanly without purge errors. |
| **Routing** | Client-side routing & Code Splitting | **`VERIFIED`** | `React.lazy` + `Suspense` with `RouteSpinner` successfully resolves all 13 routes. |
| **Academic Hierarchy** | SPPU FE, IT, and Comp Eng syllabus | **`VERIFIED`** | `sppuSubjects.js` exports complete subject arrays for FE (Sem 1-2), IT (Sem 3-8), and Comp (Sem 3-8). |
| **Academic Hierarchy** | AIDS, ENTC, Mech, Civil syllabi | **`PARTIAL`** | Branch metadata exists in `sppuBranchMeta`, but subject mappings are empty `{}` objects. |
| **Upload Pipeline** | Catalogue creation UI & validation | **`PARTIAL`** | UI form, cascading branch/semester/subject dropdowns, and file selectors exist. |
| **Upload Pipeline** | Cloud Storage & Firestore persistence | **`BROKEN`** | `handleSubmit` runs a 1.5s simulated `setTimeout`; does not upload binaries or create documents. |
| **Catalogue Browsing** | Subject catalogues & resource listing | **`PARTIAL`** | Pages render responsive cards, but rely entirely on static arrays (`mockCatalogues`, `mockResources`). |
| **Search Engine** | Homepage search bar | **`PARTIAL`** | Controlled input updates local `search` state, but has no search listener, filter, or redirect. |
| **Category Browsing** | Subject catalog note aggregator | **`PARTIAL`** | Renders subject cards, but links to `/?subject=...#notes` which the homepage no longer renders. |
| **Security Rules** | Firestore note creation rules | **`BROKEN`** | `firestore.rules` enforces `semester in [3, 4]`, actively blocking notes for Semesters 1, 2, 5, 6, 7, 8. |
| **Security Rules** | Storage file upload rules | **`BROKEN`** | `storage.rules` permits only `application/pdf`, while `UploadPage` UI allows `.doc`, `.zip`, `.rar`. |
| **Authentication** | Google OAuth popup sign-in | **`ASSUMED`** | Firebase `signInWithPopup` code is standard; requires live browser session and authorized domain. |
| **Authentication** | Email & Password Login / Register | **`ASSUMED`** | Firebase Auth calls exist and handle error codes; requires live Firebase Auth API response. |
| **Authentication** | Session persistence & Remember Me | **`ASSUMED`** | `browserLocalPersistence` vs `browserSessionPersistence` code is correctly configured. |
| **Note Detail View** | Dynamic note document retrieval | **`ASSUMED`** | `useNote(id)` hooks `onSnapshot` on `notes/{id}`; works assuming note exists in Firestore. |
| **Note Interactions** | Transactional rating submission | **`ASSUMED`** | `submitRating` Firestore `runTransaction` logic is sound, but unverified against live Firestore. |
| **Note Interactions** | Real-time comment threads | **`ASSUMED`** | `CommentSection` snapshot query is correctly implemented; unverified against live Firestore. |
| **Monetization** | Razorpay checkout modal | **`ASSUMED`** | `openRazorpayCheckout` creates `new window.Razorpay({...})`; depends on valid `VITE_RAZORPAY_KEY_ID`. |
| **Downloads** | Direct PDF download & CORS fallback | **`ASSUMED`** | Blob streaming code with popup fallback is sound, but depends on live valid PDF URLs. |
| **Dashboard** | Note CRUD & Seller Analytics | **`ASSUMED`** | Ownership filter `note.uploadedBy === user.uid` and deletion cascade exist; unverified live. |
| **Backend State** | Live database content & indexes | **`UNKNOWN`** | Cannot inspect live Cloud Firestore documents or existing deployed composite indexes. |

---

## Broken/Incomplete Features
- ❌ **`UploadPage.jsx` does not persist data**: Form submission executes a dummy `setTimeout` (mock) rather than uploading files to Firebase Storage or creating documents in Firestore.
- ❌ **Catalogue pages use static mock data**: `SubjectPlaceholderPage.jsx` and `CatalogueDetailPage.jsx` render hardcoded mock objects (`mockCatalogues`, `mockResources`) instead of reading live database entries.
- ❌ **Incomplete syllabus in `sppuSubjects.js`**: AIDS, ENTC, Mechanical Engineering, and Civil Engineering have empty subject maps (`{}`), rendering empty semester pages.
- ❌ **Homepage Search disconnected**: The search input on `HomePage` stores input in local component state but does not filter items or navigate anywhere.
- ❌ **`CategoriesPage` link mismatch**: Cards link to `/?subject=...#notes`, but the redesigned `HomePage` no longer accepts `?subject` queries or renders the legacy notes grid.

---

## Known Bugs
- 🐛 **Firestore Rule Semester Rejection**: `firestore.rules` enforces `request.resource.data.semester in [3, 4]`. Any note submitted for Semester 1, 2, 5, 6, 7, or 8 throws `permission-denied`.
- 🐛 **Storage MIME-Type & Size Mismatch**: `storage.rules` permits only `application/pdf` under 25MB, whereas `UploadPage.jsx` allows `.doc`, `.docx`, `.zip`, `.rar`.
- 🐛 **Visual Theme Discrepancy**: Home and SPPU navigation pages use an Indigo/Dark theme (`#6366f1` / `#141414`), while Note Details, Dashboard, and Auth pages use a Mint/Teal theme (`#2dd4bf` / `#11131a`).

---

## Environment Variables
The following environment variable is expected by the client:

| Variable | Required | Description |
|---|---|---|
| `VITE_RAZORPAY_KEY_ID` | Optional / Recommended | Public Razorpay key ID for payment checkouts (referenced in `src/lib/constants.js`). |

> *Note: Firebase credentials currently reside directly in [`src/firebase.js`](file:///c:/Users/tejas/sppu_student_website/src/firebase.js). In a production environment, these should be transitioned into `.env` (e.g. `VITE_FIREBASE_API_KEY`, etc.).*

---

## Deployment
- **Hosting Target**: Vercel.
- **Routing Configuration**: [`vercel.json`](file:///c:/Users/tejas/sppu_student_website/vercel.json) rewrites all incoming routes to `index.html` for client-side routing.
- **Build Command**: `chmod +x node_modules/.bin/vite && vite build` (or `vite build`).
- **Output Directory**: `dist/`.

---

## Important Files

| File | Significance |
|---|---|
| [`src/App.jsx`](file:///c:/Users/tejas/sppu_student_website/src/App.jsx) | Route map, Navbar, and HomePage layout. |
| [`src/AuthContext.jsx`](file:///c:/Users/tejas/sppu_student_website/src/AuthContext.jsx) | Central authentication provider and Firebase user doc synchronizer. |
| [`src/firebase.js`](file:///c:/Users/tejas/sppu_student_website/src/firebase.js) | Core Firebase instances (`auth`, `db`, `storage`). |
| [`src/data/sppuSubjects.js`](file:///c:/Users/tejas/sppu_student_website/src/data/sppuSubjects.js) | Complete university syllabus dictionary and helper slug generators. |
| [`src/lib/noteActions.js`](file:///c:/Users/tejas/sppu_student_website/src/lib/noteActions.js) | Razorpay payment flow, rating transactions, PDF download streaming. |
| [`src/pages/UploadPage.jsx`](file:///c:/Users/tejas/sppu_student_website/src/pages/UploadPage.jsx) | Upload UI requiring Firebase integration. |
| [`firestore.rules`](file:///c:/Users/tejas/sppu_student_website/firestore.rules) | Security and validation constraints for Firestore collections. |
| [`storage.rules`](file:///c:/Users/tejas/sppu_student_website/storage.rules) | File upload constraints for Firebase Storage. |

---

## Current UI
- **Typography**: Inter (Google Fonts) with weights 400, 500, 600, 700.
- **Base Background**: Dark `#0f0f0f` with card containers at `#141414`.
- **Card Borders**: Subtle translucent white borders (`rgba(255, 255, 255, 0.06)`).
- **Accent Palettes**:
  - Primary Accent: Indigo (`#6366f1`) with hover shadows `rgba(99, 102, 241, 0.12)`.
  - Secondary Accents: Mint (`#2dd4bf`), Amber/Ember (`#f59e0b`), Orchid (`#a78bfa`).
- **Layouts**: Responsive grid layouts (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`) with sticky headers and mobile navigation drawer.

---

## Data Models

### 1. `Catalogue` (Front-End Model)
```typescript
interface Catalogue {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  creatorName: string;
  coverImageUrl?: string;
  branchSlug: string;
  semesterSlug: string;
  subjectSlug: string;
  rating: number;
  ratingCount: number;
  downloads: number;
  resources: CatalogueResource[];
  createdAt: Timestamp;
}

interface CatalogueResource {
  id: string;
  title: string;
  type: 'Notes' | 'PYQ' | 'Practical' | 'Assignment' | 'Project';
  description?: string;
  fileName: string;
  fileSize: number;
  storagePath: string;
  fileUrl?: string;
}
```

### 2. `Note` (Existing Firestore Model)
```typescript
interface Note {
  id: string;
  title: string;
  description: string;
  subject: string;
  semester: number;
  tags: string[];
  price: string;
  priceType: 'free' | 'paid';
  priceAmount: number;
  storagePath: string;
  fileName: string;
  uploadedBy: string;
  uploaderName: string;
  uploaderAvatar?: string;
  downloads: number;
  rating: number;
  ratingCount: number;
  createdAt: Timestamp;
}
```

---

## Future Work
The recommended sequence of file-by-file implementation:

1. **Step 1: Security Rules Fix (`firestore.rules`)**
   - Permit semesters 1 through 8 in `validNoteCreate` and add support for catalogue schemas.
2. **Step 2: Syllabus Completion (`src/data/sppuSubjects.js`)**
   - Add subjects for AIDS, ENTC, Mechanical, and Civil branches so all branch cards lead to complete subject catalogs.
3. **Step 3: Real Upload Flow (`src/pages/UploadPage.jsx`)**
   - Replace mock `setTimeout` with multi-file upload to Firebase Storage and document creation in Firestore.
4. **Step 4: Dynamic Subject & Catalogue Pages (`SubjectPlaceholderPage.jsx`, `CatalogueDetailPage.jsx`)**
   - Query Firestore for catalogues matching `branchSlug`, `semesterSlug`, and `subjectSlug`.
5. **Step 5: Visual Theme Unification**
   - Consolidate on a uniform color palette (e.g. Indigo/Slate) across `DashboardPage`, `NoteDetailPage`, and `LoginPage`.
6. **Step 6: Search & Filter Integration (`App.jsx`)**
   - Connect the homepage search bar to live search results across subjects and notes.
