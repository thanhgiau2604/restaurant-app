import { MAX_MB, UPLOAD_FOLDER } from "@/constants"

export async function uploadImage(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  if (!cloudName) {
    throw new Error("Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME.")
  }

  // (Optional) basic client validation
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.")
  }

  if (file.size > MAX_MB * 1024 * 1024) {
    throw new Error(`Image is too large (max ${MAX_MB}MB).`)
  }

  // 1) Get signature from your Next.js API
  const signRes = await fetch("/api/cloudinary/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder: UPLOAD_FOLDER }),
  })

  if (!signRes.ok) {
    const msg = await safeReadError(signRes)
    throw new Error(msg || "Failed to sign Cloudinary upload.")
  }

  const { timestamp, signature, apiKey } = (await signRes.json()) as {
    timestamp: number
    signature: string
    apiKey: string
  }

  if (!timestamp || !signature || !apiKey) {
    throw new Error("Invalid signing response from server.")
  }

  // 2) Upload directly to Cloudinary
  const formData = new FormData()
  formData.append("file", file)
  formData.append("api_key", apiKey)
  formData.append("timestamp", String(timestamp))
  formData.append("signature", signature)
  formData.append("folder", UPLOAD_FOLDER)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  )

  if (!response.ok) {
    const msg = await safeReadCloudinaryError(response)
    throw new Error(msg || "Cloudinary upload failed.")
  }

  const data = (await response.json()) as { secure_url?: string }
  if (!data.secure_url) {
    throw new Error("Cloudinary did not return an image URL.")
  }

  return data.secure_url
}

async function safeReadError(res: Response) {
  try {
    const data = (await res.json()) as any
    return data?.error || data?.message
  } catch {
    return ""
  }
}

async function safeReadCloudinaryError(res: Response) {
  try {
    const data = (await res.json()) as any
    return data?.error?.message || data?.message
  } catch {
    return ""
  }
}
