import imageUrlBuilder from '@sanity/image-url'
import type { Image } from '@sanity/types'
import { parseISO, format } from 'date-fns'

export function formatDate(
  date: string,
  formatString: string = 'dd MMM yyyy',
): string {
  // Parse the ISO date string
  const dateObject = parseISO(date)

  // Format the date using date-fns
  return format(dateObject, formatString)
}

export function urlFor(source: Image) {
  const sanity = useSanity()
  const builder = imageUrlBuilder(sanity.client)
  return builder.image(source)
}

export function extractColorFromImage(
  image: HTMLImageElement,
  fullColorBg?: boolean,
  primaryColor?: string | undefined,
): string {
  if (primaryColor) {
    return primaryColor
  }

  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const ctx = canvas.getContext('2d')
  ctx!.drawImage(image, 0, 0, image.width, image.height)

  const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  let colorCounts: { [color: string]: number } = {}
  let maxCount = 0
  let dominantColor = ''

  for (let i = 0; i < data.length; i += 4) {
    let r = Math.floor(data[i] / 32) * 32
    let g = Math.floor(data[i + 1] / 32) * 32
    let b = Math.floor(data[i + 2] / 32) * 32

    if (data[i + 3] > 0) {
      // Exclude fully transparent pixels
      if (!(r === g && g === b)) {
        // Exclude grayscale (where R=G=B)
        let color = `rgb(${r}, ${g}, ${b})`

        colorCounts[color] = (colorCounts[color] || 0) + 1
        if (colorCounts[color] > maxCount) {
          maxCount = colorCounts[color]
          dominantColor = color
        }
      }
    }
  }

  return dominantColor
    ? dominantColor
        .replace('rgb', 'rgba')
        .replace(')', fullColorBg ? ', 1)' : ', 0.1)')
    : 'rgba(255, 255, 255, 0.1)'
}

export async function processImageAndExtractColor(
  url: string,
  fullColorBg?: boolean,
  primaryColor?: string | undefined,
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = url
    img.onload = () => {
      const color = extractColorFromImage(img, fullColorBg, primaryColor)
      resolve(color)
    }
  })
}
