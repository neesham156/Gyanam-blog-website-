import { Session } from "inspector";
import { getToken } from "next-auth/jwt";
import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  console.log("in");
  const token = await getToken({
    req,
    secret: process.env.SECRET,
    secureCookie:
      process.env.NEXTAUTH_URL?.startsWith("http://") ??
      !!process.env.VERCEL_URL,
  });

  //   let url = req.nextUrl.clone();

  //   url.pathname = "user/login";

  if (token) {
    return NextResponse.redirect(`${process.env.BASE_URL}/`);
  }
}
