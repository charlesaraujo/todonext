import { LoadingOverlay } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import SEO from "./seo";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

  if (status === "loading")
    return (
      <>
        <SEO
          title="Carregando - A Fazer"
          description="Cadastre e conclua suas tarefas em qualquer lugar do mundo"
        />
        <LoadingOverlay visible={true} />
      </>
    );

  return <>{children}</>;
};

export default ProtectedRoute;
