import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./screens/Homepage/HomePage";
import LoginPage from "./screens/Loginpage/LoginPage";
import PrivateRoute from "./routers/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import DetailsPage from "./screens/Detailspage/DetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
    errorElement: <h2>Page not found</h2>,
  },
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
  {
    path: "*",
    element: <h2>404 Not Found</h2>, // catch-all
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
