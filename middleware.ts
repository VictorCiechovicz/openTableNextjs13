import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose';


export async function middleware(req: NextRequest, res: NextResponse) {


  const bearToken = req.headers.get("authorization") as string;


  if (!bearToken) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }), { status: 401 }
    )
  }

  const token = bearToken.split(" ")[1]

  if (!token) {

    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }), { status: 401 }
    )
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }), { status: 401 }
    )
  }

}

export const config = {
  matcher: ['/api/auth/me']
}
