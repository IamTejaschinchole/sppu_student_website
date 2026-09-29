# 🔍 Comprehensive Project Analysis & Architecture Specification

> **Repository**: `IamTejaschinchole/sppu_student_website`  
> **App Name**: SPPU Student Notes & Marketplace (StudyVault)  
> **Target Audience**: Pune University (SPPU) engineering students & general competitive exam tracks (JEE / NEET).

---

## 1. Technical Stack Breakdown

| Layer | Technologies | Purpose |
|---|---|---|
| **Build & Bundler** | Vite 8.0.14 | Ultra-fast HMR and Rollup production bundling |
| **UI Framework** | React 18.3.1 | Component-driven architecture |
| **Routing** | React Router DOM 7.15.1 | Client-side routing with lazy-loaded code-splitting |
| **Styling** | Tailwind CSS 3.4.17 + PostCSS | Utility-first CSS with dark theme tokens |
| **Icons** | Lucide React 0.468.0 | Consistent iconography |
| **Backend / DB** | Firebase 12.13.0 | Firestore (NoSQL), Auth, Storage |
| **Payments** | Razorpay Client SDK | Handles UPI/Card checkouts for paid notes |

---

## 2. Directory Structure & File Map

```
sppu_student_website/
├── dist/                        # Production build artifacts
├── firestore.rules              # Cloud Firestore security & schema constraints
├── storage.rules                # Cloud Storage upload security rules
├── tailwind.config.js           # Theme extensions (colors: ink, panel, line, mint, ember, orchid)
├── vite.config.js               # React plugin & node_modules manual chunking
├── index.html                   # HTML mount point + Razorpay script inclusion
├── package.json                 # Project dependencies & scripts
├── project-status/              # AI handover, current state & changelogs
│   ├── CURRENT_STATE.md
│   ├── PROJECT_ANALYSIS.md
│   └── CHANGELOG.md
└── src/
    ├── main.jsx                 # Mounts App in BrowserRouter
    ├── App.jsx                  # Main route tree, Navbar, and HomePage component
    ├── AuthContext.jsx          # Auth provider handling session state & user sync
    ├── firebase.js              # Initializes Firebase App, Auth, Firestore, and Storage
    ├── index.css                # Global font imports, CSS root variables, focus rings
    ├── components/
    │   ├── ui.jsx               # Reusable UI primitives: Avatar, FilterSelect, Pagination, etc.
    │   ├── RouteSpinner.jsx     # Suspense fallback indicator
    │   └── CommentSection.jsx   # Real-time note comments listener & input form
    ├── data/
    │   └── sppuSubjects.js      # Static academic hierarchy: branches, semesters, subject lists
    ├── hooks/
    │   ├── useNotes.js          # Firestore snapshot listener for all notes
    │   ├── useNote.js           # Firestore snapshot listener for a single note by ID
    │   └── useSellerPayments.js # Firestore query for seller earnings and transactions
    ├── lib/
    │   ├── constants.js         # Subject catalog, sort options, accents
    │   ├── errors.js            # Normalized error messages for Auth, Storage, Payments, Rating
    │   ├── noteActions.js       # Transaction-based rating, Razorpay checkout, PDF downloader
    │   ├── sppu.js              # Bridge functions accessing SPPU branches and semester metadata
    │   └── utils.js             # Sorting, filtering, file sanitization, date formatting
    └── pages/
        ├── SppuBranchesPage.jsx       # SPPU Branch selection (FE, IT, Comp, AIDS, etc.)
        ├── SemesterSelectionPage.jsx  # Semester selection within a branch (Sem 1 - 8)
        ├── SubjectMarketplacePage.jsx # Subject selection within a semester
        ├── SubjectPlaceholderPage.jsx # Catalogue list for a specific subject
        ├── CatalogueDetailPage.jsx    # Resources & downloads within a catalogue
        ├── NoteDetailPage.jsx         # Single note view with download, rating & comments
        ├── DashboardPage.jsx          # Creator dashboard (earnings, downloads, note CRUD)
        ├── UploadPage.jsx             # Catalogue & resource upload form
        ├── LoginPage.jsx              # Sign-in form (Google popup + Email/password)
        ├── RegisterPage.jsx           # Account creation form
        ├── CategoriesPage.jsx         # Subject category grid
        ├── BranchPlaceholderPage.jsx   # Re-export alias of SemesterSelectionPage
        └── SemesterPlaceholderPage.jsx # Re-export alias of SubjectMarketplacePage
```

---

## 3. Data Flow & Routing Architecture

### Route Hierarchy

```
/                                   -> HomePage (App.jsx)
/categories                         -> CategoriesPage
/sppu                               -> SppuBranchesPage
/sppu/:branchSlug                   -> SemesterSelectionPage
/sppu/:branchSlug/:semesterSlug     -> SubjectMarketplacePage
/sppu/:branchSlug/:semesterSlug/:subjectSlug                -> SubjectPlaceholderPage
/sppu/:branchSlug/:semesterSlug/:subjectSlug/:catalogueId   -> CatalogueDetailPage
/note/:id                           -> NoteDetailPage
/dashboard                          -> DashboardPage (ProtectedRoute)
/upload                             -> UploadPage (ProtectedRoute)
/login                              -> LoginPage
/register                           -> RegisterPage
```

---

## 4. Firestore Schema & Security Rules Analysis

### Collections

#### 1. `users/{userId}`
- **Read/Write**: Owned by authenticated user (`request.auth.uid == userId`).
- **Fields**: `uid`, `name`, `email`, `photoURL`, `providerIds`, `createdAt`, `lastLoginAt`.

#### 2. `notes/{noteId}`
- **Read**: Public (`allow read: if true;`).
- **Create**: Authenticated user (`request.resource.data.uploadedBy == request.auth.uid`).
- **Update**: Allowed if:
  - Owner updates title, description, price, priceType, priceAmount.
  - Payer/downloader increments download count.
  - Any signed-in user updates aggregate rating atomically (`ratingCount + 1`).
- **Delete**: Owner only.
- **Subcollections**:
  - `ratings/{userId}`: User rating record.
  - `comments/{commentId}`: Real-time discussion threads.

#### 3. `payments/{paymentId}`
- **Read**: Signed-in payer or seller.
- **Create**: Signed-in payer only.
- **Fields**: `noteId`, `amountPaise`, `razorpayPaymentId`, `payerId`, `uploadedBy`, etc.

### ⚠️ Security Rule Flaw Discovered
In `firestore.rules`:
```javascript
request.resource.data.semester in [3, 4]
```
This hardcoded rule prevents creating notes for Semester 1, 2, 5, 6, 7, and 8.

---

## 5. Storage Security Rules Analysis (`storage.rules`)
- **Path**: `/notes/{userId}/{fileName}`
- **Rules**:
  - `allow read: if signedIn();`
  - `allow create: if signedIn() && request.auth.uid == userId && contentType == 'application/pdf' && size < 25MB`
  - `allow delete: if signedIn() && request.auth.uid == userId`

---

## 6. Discrepancies & Gap Inventory

1. **UploadPage Mock Mode**:
   - `UploadPage.jsx` has a `setTimeout` mock for form submission. Files are not saved to Firebase Storage, and catalogue records are not stored in Firestore.
2. **Dynamic Data on Catalogue Pages**:
   - `SubjectPlaceholderPage.jsx` and `CatalogueDetailPage.jsx` display static mock items instead of fetching from Firestore.
3. **Empty Branch Data**:
   - AIDS, ENTC, Mechanical, and Civil branches in `src/data/sppuSubjects.js` are empty objects.
4. **Color Theme Split**:
   - Two competing styling approaches exist: Indigo (`#6366f1`) vs. Mint (`#2dd4bf`).
5. **Homepage Search**:
   - The search input does not redirect or filter catalog items dynamically.
