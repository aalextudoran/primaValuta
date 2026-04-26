import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/api/rates" && request.method === "POST") {
    const requestToken = request.headers.get("x-admin-token");
    const adminToken = process.env.ADMIN_TOKEN;

    if (!adminToken || requestToken !== adminToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/rates"],
};
