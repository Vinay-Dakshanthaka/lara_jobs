import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/candidate/Dashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import EmailForm from "./components/signUp/EmailForm";
import Loading from "./components/loading/Loading";
import { Toaster } from "react-hot-toast";
import { NotFound } from "./404Page/NotFound";
import UploadQuestionsToLink from "./placement-test/test-link/UploadQuestionsToLink";

// Lazy load components
const SignInForm = React.lazy(() => import("./components/signIn/SignInForm"));
const ForgotPassword = React.lazy(() => import("./components/signIn/ForgotPassword"));
const AddSubject = React.lazy(() => import("./placement-test/subject/AddSubject"));
const Profile = React.lazy(() => import("./components/candidate/Profile"));
const CreateTestLink = React.lazy(()=> import("./placement-test/test-link/CreateTestLink"))
const AllPlacementTests = React.lazy(()=> import("./placement-test/test-link/AllPlacementTests"))
const EditTestLinkQuestions = React.lazy(()=> import("./placement-test/questions/EditTestLinkQuestions"))
const AddQuestions = React.lazy(()=> import("./placement-test/questions/AddQuestions"))
// const ManageTests = React.lazy(() => import("./components/admin/ManageTests"));
// const AddQuestion = React.lazy(() => import("./components/admin/AddQuestion"));
// const ViewQuestions = React.lazy(() => import("./components/admin/ViewQuestions"));

/** ProtectedRoute -  authentication & role-based access */
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/signin" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/not-found" />;
  }

  return children;
};

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/signup" element={<EmailForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/not-found" element={<NotFound />} />

            {/* Protected Dashboard Routes (for all authenticated users) */}
            <Route
              path="/common-dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Profile />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="subject/add-subject" element={<AddSubject />} />
              <Route path="testlink/create" element={<CreateTestLink />} />
              <Route path="testlink/all-links" element={<AllPlacementTests />} />
              <Route path="test/add-new-question/:test_id" element={<AddQuestions />} />
              <Route path="test/edit-question/:test_id" element={<EditTestLinkQuestions />} />
              <Route path="test/upload-excel-link/:test_id" element={<UploadQuestionsToLink />} />
              {/* <Route path="manage-tests" element={<ManageTests />} />
              <Route path="add-question" element={<AddQuestion />} />
              <Route path="view-questions" element={<ViewQuestions />} /> */}
            </Route>

            {/* Catch-all 404 Route */}
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
