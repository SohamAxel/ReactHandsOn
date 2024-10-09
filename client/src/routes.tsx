import { Navigate, RouteObject } from "react-router-dom"
import { RootLayout } from "@/layouts/RootLayout"
import { ErrorPage } from "@/pages/ErrorPage"
import { TaskListPage } from "@/pages/tasks/TaskListPage"
import { NewTaskPage } from "@/pages/tasks/NewTaskPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import SignupForm from "./features/authentication/components/SignupForm"
import AuthLayout from "./features/authentication/Layouts/AuthLayout"
import LoginForm from "./features/authentication/components/LoginForm"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/tasks" replace />,
          },
          {
            path: "tasks",
            children: [
              { index: true, element: <TaskListPage /> },
              { path: "new", element: <NewTaskPage /> },
            ],
          },
          {
            element: <AuthLayout />,
            children: [
              { 
                path: "signup", element: <SignupForm />
              },
              { 
                path: "login", element: <LoginForm />
              },
            ]
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]
