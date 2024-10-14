import { LoadingSpinner } from "../ui/LoadingSpinner"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/features/authentication/contexts/AuthProvider"

const PrivatePage = ({ children }) => {
  const { user, isLoadingUser } = useAuth()
  const location = useLocation()

  if (isLoadingUser) return <LoadingSpinner className="w-24 h-24" />

  if (user == null) return <Navigate to="/login" replace state={{ location }} />

  return children
}

export {PrivatePage};
