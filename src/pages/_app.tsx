import Globallayout from "@/component/layout";
import UserLayout from "@/pages/[user]/component/user/UserLayout";

import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import { QueryClientProvider,QueryClient } from "react-query";
const queryClient=new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider>
      
      {!router.pathname.startsWith("/landing_page")?( 
  router.pathname.startsWith("/[user]") && !router.pathname.startsWith("/[user]/create") ? (
  <UserLayout>
    <Component {...pageProps} />
  </UserLayout>
  ) : (
  <>
    <Globallayout>
    <QueryClientProvider client={queryClient}>   
         <Component {...pageProps} />
      </QueryClientProvider>


    </Globallayout>
  </>
  )
):(

  <Component {...pageProps} />

)}
    </SessionProvider>
  );
}
