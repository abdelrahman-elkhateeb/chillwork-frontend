import { createBrowserRouter, Navigate } from "react-router-dom"

import { ROUTES } from "@/config/routes"
import {
  ActivatePage,
  GuestOnly,
  LoginPage,
  RequireRole,
  RequireStaff,
  RoleHomeRedirect,
} from "@/features/auth"
import { AdminHomePage } from "@/features/home"
import { NewPartPage, PartPage, PartsPage } from "@/features/parts"
import { AdminRequestPage, AdminRequestsPage } from "@/features/requests"
import { ScheduleVisitPage } from "@/features/scheduling"
import { SettingsPage } from "@/features/settings"
import { AdminShell, TechnicianShell } from "@/features/shell"
import {
  NewTechnicianPage,
  TechnicianPage,
  TechniciansPage,
} from "@/features/technicians"
import {
  ApprovePartsPage,
  DevicePartsPage,
  InvoicePage,
  MePage,
  MyVisitsPage,
  OutcomePage,
  VisitPage,
} from "@/features/visits"

export const router = createBrowserRouter([
  {
    element: <GuestOnly />,
    children: [{ path: ROUTES.login, element: <LoginPage /> }],
  },
  // Public: a technician opens it before they have a password.
  { path: ROUTES.activate, element: <ActivatePage /> },
  {
    element: <RequireStaff />,
    children: [
      { path: ROUTES.root, element: <RoleHomeRedirect /> },
      {
        element: <RequireRole role="ADMIN" />,
        children: [
          {
            element: <AdminShell />,
            children: [
              { path: ROUTES.home, element: <AdminHomePage /> },
              { path: ROUTES.requests, element: <AdminRequestsPage /> },
              { path: ROUTES.request, element: <AdminRequestPage /> },
              { path: ROUTES.scheduleVisit, element: <ScheduleVisitPage /> },
              { path: ROUTES.technicians, element: <TechniciansPage /> },
              { path: ROUTES.newTechnician, element: <NewTechnicianPage /> },
              { path: ROUTES.technician, element: <TechnicianPage /> },
              { path: ROUTES.parts, element: <PartsPage /> },
              { path: ROUTES.newPart, element: <NewPartPage /> },
              { path: ROUTES.part, element: <PartPage /> },
              { path: ROUTES.settings, element: <SettingsPage /> },
            ],
          },
        ],
      },
      {
        element: <RequireRole role="TECHNICIAN" />,
        children: [
          {
            element: <TechnicianShell />,
            children: [
              { path: ROUTES.visits, element: <MyVisitsPage /> },
              { path: ROUTES.visit, element: <VisitPage /> },
              { path: ROUTES.deviceParts, element: <DevicePartsPage /> },
              { path: ROUTES.approveParts, element: <ApprovePartsPage /> },
              { path: ROUTES.outcome, element: <OutcomePage /> },
              { path: ROUTES.invoice, element: <InvoicePage /> },
              { path: ROUTES.me, element: <MePage /> },
            ],
          },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to={ROUTES.root} replace /> },
])
