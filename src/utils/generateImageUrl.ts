// fileName: wdding_01
// format: jpg | webp
// option: c_fill, w_400

// https://res.cloudinary.com/dxq8lly54/image/upload/v1731086624/wedding_06_g0l4pi.jpg
// https://res.cloudinary.com/dxq8lly54/image/upload/v1731087679/wedding_06_jlelwn.webp

interface GenerateImageUrlType {
  fileName: string
  format: 'jpg' | 'webp'
  option?: string
}

const generateImageUrl = ({
  fileName,
  format,
  option = 'q_auto,c_fill',
}: GenerateImageUrlType) => {
  return `https://res.cloudinary.com/dxq8lly54/image/upload/${option}/${fileName}.${format}`
}

export default generateImageUrl
