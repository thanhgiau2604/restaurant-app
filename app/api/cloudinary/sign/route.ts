import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    folder?: string
    public_id?: string
  }

  const timestamp = Math.floor(Date.now() / 1000)

  // Any params you want to include in the signature must match what you send to Cloudinary.
  const paramsToSign: Record<string, string | number> = { timestamp }
  if (body.folder) paramsToSign.folder = body.folder
  if (body.public_id) paramsToSign.public_id = body.public_id

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  )

  return NextResponse.json({
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  })
}
