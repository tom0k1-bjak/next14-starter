// middleware is independent from any node js libraries.
import NextAuth from "next-auth";
import { authConfig } from "../lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // If we don't add matcher, middleware will be invoked for every route in my project.
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
