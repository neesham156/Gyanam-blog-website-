import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const { pathname } = req.nextUrl;
 

  const token = await getToken({
    req,
    secret: process.env.SECRET,
    secureCookie:
      process.env.NEXTAUTH_URL?.startsWith("http://") ??
      !!process.env.VERCEL_URL,
  });

  // let url = req.nextUrl.clone();

  // url.pathname = "user/login";

  if (pathname.includes("login") && token) {
    return NextResponse.redirect(`${process.env.BASE_URL}/`);
  }
}
