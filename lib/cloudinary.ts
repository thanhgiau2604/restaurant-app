export async function uploadImage(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !uploadPreset) {
    throw new Error("Missing Cloudinary environment variables.")
  }

  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", uploadPreset)

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Cloudinary upload failed.")
  }

  const data = (await response.json()) as { secure_url?: string }
  if (!data.secure_url) {
    throw new Error("Cloudinary did not return an image URL.")
  }

  return data.secure_url
}
