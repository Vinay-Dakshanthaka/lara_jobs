// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import PhoneForm from './components/signUp/PhoneForm';
// import PasswordForm from './components/signUp/PasswordForm';
// import EmailForm from './components/signUp/EmailForm';

// function App() {

//   const [emailVerified, setEmailVerified] = useState(false);
//   const [phoneVerified, setPhoneVerified] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {!emailVerified && <EmailForm onOtpVerified={() => setEmailVerified(true)} />}
//       {emailVerified && !phoneVerified && (
//         <PhoneForm onPhoneVerified={() => setPhoneVerified(true)} />
//       )}
//       {phoneVerified && <PasswordForm />}
//     </div>
//   );
// }

// export default App


import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './components/candidate/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import EmailForm from './components/signUp/EmailForm';
import Loading from './components/loading/Loading';
import { Toaster } from 'react-hot-toast';

// Lazy load components
const SignInForm = React.lazy(() => import('./components/signIn/SignInForm'));
const ForgotPassword = React.lazy(() => import('./components/signIn/ForgotPassword'));

// ProtectedRoute component that checks for authentication and role
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user || !user.token) {
    // Redirect to signin if not authenticated
    return <Navigate to="/signin" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect if the user doesn't have the required role
    return <Navigate to="/" />;
  }

  // If the user is authenticated and has the correct role (if any), render the children (protected route content)
  return children;
};

function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <Router>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<EmailForm />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/common-dashboard" element={<Dashboard />} />

              {/* Protected Routes for authenticated users */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Admin Protected Route */}
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/*redirect to login if path doesn't match */}
              <Route path="*" element={<Navigate to="/signup" />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;

