# 📚 Redux Learning Guide - Step by Step

তোমার API INTE project এর সম্পূর্ণ Redux integration বুঝার জন্য **step-by-step guide**।

---

## 📖 Reading Order (কোনটা আগে পড়বে)

### **Level 1: Foundation (শুরু করো এখান থেকে)** 🌱

#### 1️⃣ Redux Store Setup

```
📁 store/store.js
```

**কি আছে:** Redux store configuration  
**কেন পড়বে:** Redux এর central hub, সব state এখানে থাকে  
**Key Points:**

- `configureStore` দিয়ে store তৈরি
- `auth` এবং `ui` reducer add করা
- এটা app এর brain

---

#### 2️⃣ Auth Slice (Authentication State)

```
📁 store/slices/authSlice.js
```

**কি আছে:** Login/Logout logic  
**কেন পড়বে:** Authentication কিভাবে কাজ করে বুঝতে  
**Key Points:**

- `isAuthenticated` - logged in কিনা
- `token` - JWT token storage
- `login()` - login করলে call হয়
- `logout()` - logout করলে call হয়
- `checkAuth()` - page load এ check করে

**Code Flow:**

```javascript
// Login
dispatch(login(token))
  → state.isAuthenticated = true
  → localStorage.setItem("token", token)

// Logout
dispatch(logout())
  → state.isAuthenticated = false
  → localStorage.removeItem("token")

// Check Auth
dispatch(checkAuth())
  → localStorage থেকে token check
  → থাকলে isAuthenticated = true
```

---

#### 3️⃣ UI Slice (UI Preferences)

```
📁 store/slices/uiSlice.js
```

**কি আছে:** Theme, sidebar, modal state  
**কেন পড়বে:** UI state management বুঝতে  
**Key Points:**

- `theme` - light/dark mode
- `sidebarOpen` - sidebar open/close
- `activeModal` - কোন modal open আছে

---

### **Level 2: Integration (Redux কিভাবে use হচ্ছে)** 🔗

#### 4️⃣ Main Entry Point

```
📁 main.jsx
```

**কি আছে:** App এর entry point, Redux Provider  
**কেন পড়বে:** Redux কিভাবে app এ integrate হয়েছে  
**Key Points:**

```javascript
<Provider store={store}>
  <QueryClientProvider>
    <RouterProvider />
  </QueryClientProvider>
</Provider>
```

- Redux Provider সবার উপরে
- TanStack Query Provider ভিতরে
- এটা দিয়ে সব components Redux access পায়

---

#### 5️⃣ Navbar Component

```
📁 Components/Navbar.jsx
```

**কি আছে:** Navigation bar, auth state display  
**কেন পড়বে:** Redux state কিভাবে read করে  
**Key Points:**

```javascript
// Redux state read করা (useSelector)
const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

// Redux action dispatch করা (useDispatch)
const dispatch = useDispatch();
dispatch(logout());
dispatch(checkAuth());
```

**Flow:**

```
1. Component load হয়
2. useEffect run হয় → dispatch(checkAuth())
3. Redux state check করে
4. isAuthenticated true হলে Profile/Logout দেখায়
5. false হলে Login/Register দেখায়
```

---

#### 6️⃣ Login Hook

```
📁 hooks/useLogin.js
```

**কি আছে:** Login mutation, Redux integration  
**কেন পড়বে:** Login করলে Redux কিভাবে update হয়  
**Key Points:**

```javascript
onSuccess: (data) => {
  dispatch(login(data.token)); // Redux update
  navigate("/profile"); // Redirect
};
```

**Flow:**

```
1. User login form submit করে
2. API call হয় (TanStack Query)
3. Success হলে dispatch(login(token))
4. Redux state update হয়
5. Navbar automatically re-render হয়
6. Profile page এ redirect হয়
```

---

#### 7️⃣ Protected Route

```
📁 Components/ProtectedRoute.jsx
```

**কি আছে:** Route guard for authenticated users  
**কেন পড়বে:** Redux দিয়ে route protection  
**Key Points:**

```javascript
const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

if (!isAuthenticated) {
  return <Navigate to="/login" />;
}
return children;
```

**Flow:**

```
1. User /profile access করতে চায়
2. ProtectedRoute check করে isAuthenticated
3. false হলে /login এ redirect
4. true হলে page দেখায়
```

---

#### 8️⃣ Public Route

```
📁 Components/PublicRoute.jsx
```

**কি আছে:** Route guard for non-authenticated users  
**কেন পড়বে:** Logged in users কে login page এ যেতে দেয় না  
**Key Points:**

```javascript
const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

if (isAuthenticated) {
  return <Navigate to="/profile" />;
}
return children;
```

**Flow:**

```
1. Logged in user /login access করতে চায়
2. PublicRoute check করে isAuthenticated
3. true হলে /profile এ redirect
4. false হলে login page দেখায়
```

---

### **Level 3: Complete Flow (পুরো System)** 🌊

#### 🔄 Login Flow (শুরু থেকে শেষ)

```
1. User Login.jsx এ যায়
   ↓
2. Email/Password enter করে submit করে
   ↓
3. useLogin hook API call করে
   ↓
4. Server response আসে (token সহ)
   ↓
5. onSuccess: dispatch(login(token))
   ↓
6. authSlice.js এ login action run হয়
   ↓
7. Redux state update:
   - isAuthenticated = true
   - token = "jwt_token"
   - localStorage.setItem("token", "jwt_token")
   ↓
8. Navbar component re-render হয়
   ↓
9. useSelector নতুন state পায়
   ↓
10. Profile/Logout buttons দেখায়
    ↓
11. navigate("/profile") redirect করে
    ↓
12. ProtectedRoute check করে isAuthenticated
    ↓
13. true, তাই Profile page দেখায়
```

---

#### 🔄 Logout Flow

```
1. User Navbar এ Logout click করে
   ↓
2. handleLogout() function call হয়
   ↓
3. dispatch(logout())
   ↓
4. authSlice.js এ logout action run হয়
   ↓
5. Redux state update:
   - isAuthenticated = false
   - token = null
   - localStorage.removeItem("token")
   ↓
6. Navbar re-render হয়
   ↓
7. Login/Register buttons দেখায়
   ↓
8. navigate("/login") redirect করে
```

---

#### 🔄 Page Refresh Flow

```
1. User page refresh করে (F5)
   ↓
2. App load হয়
   ↓
3. main.jsx run হয়, Redux Provider setup হয়
   ↓
4. Navbar component mount হয়
   ↓
5. useEffect run হয়
   ↓
6. dispatch(checkAuth())
   ↓
7. authSlice.js এ checkAuth action run হয়
   ↓
8. localStorage.getItem("token") check করে
   ↓
9. Token থাকলে:
   - isAuthenticated = true
   - token = stored_token
   ↓
10. Navbar সঠিক buttons দেখায়
    ↓
11. User logged in থাকে
```

---

## 📊 File Dependency Tree

```
main.jsx (Entry Point)
  ├── store/store.js (Redux Store)
  │   ├── store/slices/authSlice.js
  │   └── store/slices/uiSlice.js
  │
  ├── App.jsx
  │   ├── Components/Navbar.jsx (uses authSlice)
  │   └── Outlet (Routes)
  │       ├── Components/Login.jsx
  │       │   └── hooks/useLogin.js (dispatches login)
  │       │
  │       ├── Components/Register.jsx
  │       │   └── hooks/useRegister.js
  │       │
  │       ├── ProtectedRoute (uses authSlice)
  │       │   └── Components/Profile.jsx
  │       │       ├── Components/UpdateProfile.jsx
  │       │       ├── Components/ChangePassword.jsx
  │       │       └── Components/DeleteAccount.jsx
  │       │
  │       └── PublicRoute (uses authSlice)
  │           ├── Login
  │           └── Register
```

---

## 🎯 Redux ব্যবহার করা Files (Priority Order)

### **High Priority (Must Read)** ⭐⭐⭐

1. **store/store.js** - Redux setup
2. **store/slices/authSlice.js** - Auth logic
3. **main.jsx** - Provider setup
4. **Components/Navbar.jsx** - useSelector/useDispatch example
5. **hooks/useLogin.js** - Redux dispatch in hooks

### **Medium Priority (Should Read)** ⭐⭐

6. **Components/ProtectedRoute.jsx** - Route guard
7. **Components/PublicRoute.jsx** - Route guard
8. **store/slices/uiSlice.js** - UI state example

### **Low Priority (Optional)** ⭐

9. Other components (Profile, Login, Register) - TanStack Query use করে

---

## 💡 Key Concepts

### **useSelector** - Redux State Read করা

```javascript
import { useSelector } from "react-redux";

const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
const token = useSelector((state) => state.auth.token);
const theme = useSelector((state) => state.ui.theme);
```

### **useDispatch** - Redux Action Trigger করা

```javascript
import { useDispatch } from "react-redux";
import { login, logout } from "../store/slices/authSlice";

const dispatch = useDispatch();

dispatch(login(token)); // Login
dispatch(logout()); // Logout
dispatch(checkAuth()); // Check auth
```

### **Redux State Structure**

```javascript
{
  auth: {
    isAuthenticated: false,
    token: null
  },
  ui: {
    theme: "light",
    sidebarOpen: true,
    activeModal: null
  }
}
```

---

## 🚀 Learning Path

### **Day 1: Basics**

1. Read `store/store.js`
2. Read `store/slices/authSlice.js`
3. Understand state structure

### **Day 2: Integration**

1. Read `main.jsx` (Provider)
2. Read `Components/Navbar.jsx` (useSelector/useDispatch)
3. See how components use Redux

### **Day 3: Complete Flow**

1. Read `hooks/useLogin.js`
2. Read `ProtectedRoute.jsx` and `PublicRoute.jsx`
3. Trace complete login/logout flow

### **Day 4: Practice**

1. Open Redux DevTools
2. Login and watch state change
3. Logout and watch state clear
4. Refresh and watch checkAuth

---

## 🔧 Redux DevTools

**Install:** [Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools)

**Usage:**

1. Open browser DevTools (F12)
2. Click "Redux" tab
3. See state tree
4. See dispatched actions
5. Time-travel debugging

---

## ✅ Summary

**তোমার project এ Redux:**

- ✅ Authentication state management
- ✅ UI preferences (theme, sidebar, modal)
- ✅ Automatic state synchronization
- ✅ Persistent login (localStorage sync)
- ✅ Route protection

**Reading order:**

1. store.js → authSlice.js → main.jsx
2. Navbar.jsx → useLogin.js
3. ProtectedRoute.jsx → PublicRoute.jsx

**Practice:**

- Login/Logout করে Redux DevTools দেখো
- State changes track করো
- Complete flow বুঝো

এখন step by step পড়া শুরু করো! 🚀
