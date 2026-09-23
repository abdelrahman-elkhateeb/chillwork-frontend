import { createBrowserRouter, Navigate } from "react-router-dom"

import { ROUTES } from "@/config/routes"
import { AccountPage } from "@/features/account"
import { GuestOnly, LoginPage, RequireAuth, SignupPage } from "@/features/auth"
import { LandingPage } from "@/features/landing"

export const router = createBrowserRouter([
  { path: ROUTES.home, element: <LandingPage /> },
  {
    element: <GuestOnly />,
    children: [
      { path: ROUTES.login, element: <LoginPage /> },
      { path: ROUTES.signup, element: <SignupPage /> },
    ],
  },
  {
    element: <RequireAuth />,
    children: [{ path: ROUTES.account, element: <AccountPage /> }],
  },
  { path: "*", element: <Navigate to={ROUTES.home} replace /> },
])
