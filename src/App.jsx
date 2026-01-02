import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./screens/Homepage/HomePage";
import LoginPage from "./screens/Loginpage/LoginPage";
import PrivateRoute from "./routers/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import DetailsPage from "./screens/Detailspage/DetailsPage";

const router = createBrowserRouter([
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/details/:slno",
    element: (
      <PrivateRoute>
        <DetailsPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
