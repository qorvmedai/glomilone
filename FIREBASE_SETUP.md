# Firebase Setup & Deployment Guide for CMS Admin Panel

Follow these steps to initialize your free Firebase project and connect it to your Vite/React site.

---

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Create a project** (or **Add project**).
3. Name your project (e.g., `glomilone-cms`).
4. (Optional) Disable or enable Google Analytics, then click **Create project**.

---

## Step 2: Register Web Application & Copy Configuration

1. On your Firebase project dashboard, click the **Web icon (`</>`)** to add an app.
2. Register the app with a nickname (e.g. `Glomilone Web`).
3. Copy your project's `firebaseConfig` keys.
4. Open the `.env` file in the root of this project and paste your keys:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=glomilone-cms.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=glomilone-cms
VITE_FIREBASE_STORAGE_BUCKET=glomilone-cms.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

---

## Step 3: Enable Firebase Authentication & Create Admin User

1. In the left navigation bar, go to **Build > Authentication**.
2. Click **Get Started**.
3. Under **Sign-in method**, choose **Email/Password**, enable it, and click **Save**.
4. Go to the **Users** tab and click **Add user**.
5. Create your admin account (e.g., `admin@yourdomain.com`) with a secure password.

---

## Step 4: Enable Firestore Database & Apply Security Rules

1. In the left navigation, go to **Build > Firestore Database** and click **Create database**.
2. Choose a location closest to your users.
3. Start in **Production mode**.
4. Go to the **Rules** tab in Firestore.
5. Paste the content from `firestore.rules`:

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /content/{pageId} {
      allow read: if true;
      allow write: if request.auth != null;
      match /{subcollection=**} {
        allow read: if true;
        allow write: if request.auth != null;
      }
    }
    match /settings/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```
6. Click **Publish**.

---

## Step 5: Enable Firebase Storage & Apply Security Rules

1. In the left navigation, go to **Build > Storage** and click **Get started**.
2. Keep default bucket settings and click **Done**.
3. Go to the **Rules** tab in Storage.
4. Paste the content from `storage.rules`:

```rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /content/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```
5. Click **Publish**.

---

## Step 6: Test Admin Panel & Public Integration

1. Run `npm run dev` in your workspace.
2. Navigate to `http://localhost:5173/admin/login`.
3. Sign in using the Admin account credentials created in Step 3.
4. Select a page from the Dashboard (e.g. `Home`), edit text/image fields, and click **Save All Changes**.
5. Check your public site (`http://localhost:5173`) to see live updates reflected immediately!
