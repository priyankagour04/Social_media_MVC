import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import routes from "./Route";
import Home from "../pages/home/Home.jsx";
import Search from "../pages/search/Search.jsx";
import ViewProfile from "../pages/profile/ViewProfile.jsx";
import { lazy, Suspense } from "react";
import Notification from "../pages/notification/Notification.jsx";
import EditProfile from "../pages/profile/EditProfile.jsx";
import FollowerList from "../pages/connections/FollowerList.jsx";
import FollowingList from "../pages/connections/FollowingList.jsx";
// Lazy load components for better performance
const Login = lazy(() => import("../features/auth/Login.jsx"));
const SignUp = lazy(() => import("../features/auth/Signup.jsx"));
const ForgetPassword = lazy(() =>
  import("../features/auth/ForgetPassword.jsx")
); // Lazy load Navbar

const AppRoutes = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route path={routes.login.path} element={<Login />} />
        <Route path={routes.signup.path} element={<SignUp />} />
        <Route path={routes.forgetPassword.path} element={<ForgetPassword />} />

        {/* Protected Routes */}
        <Route
          path={routes.home.path}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.profile.path}
          element={
            <ProtectedRoute>
              <ViewProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.editProfile.path}
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.search.path}
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.notifications.path}
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.followers.path}
          element = {
            <ProtectedRoute>
              <FollowerList/>
            </ProtectedRoute>
          }
        />
        <Route
          path= {routes.following.path}
          element = {
            <ProtectedRoute>
              <FollowingList/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  </Router>
);
export default AppRoutes;
