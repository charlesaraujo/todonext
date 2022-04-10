import { useRouter } from "next/router";
import { ReactNode } from "react";
import ProtectedRoute from "./protectedRoute";

const authRoutes = ["/todos"];

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <>
      {authRoutes.includes(router.pathname) ? (
        <ProtectedRoute>{children}</ProtectedRoute>
      ) : (
        children
      )}
    </>
  );
};
