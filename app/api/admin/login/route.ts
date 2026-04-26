import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminPassword || !adminToken) {
    return NextResponse.json({ error: "Configurare admin incompletă." }, { status: 500 });
  }

  try {
    const body = (await request.json()) as { password?: string };
    if (!body.password || body.password !== adminPassword) {
      return NextResponse.json({ error: "Parolă invalidă." }, { status: 401 });
    }

    return NextResponse.json({ token: adminToken });
  } catch {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }
}
