import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import ProtectedRoute from "./protectedRoute";

const authRoutes = ["/todos"];

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") return null;

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
