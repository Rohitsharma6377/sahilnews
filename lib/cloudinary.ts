export function cloudinaryUrl(publicId: string, width = 1200, height = 630) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  if (!cloud) return ''
  return `https://res.cloudinary.com/${cloud}/image/upload/c_fill,f_auto,q_auto,w_${width},h_${height}/${publicId}.jpg`
}
