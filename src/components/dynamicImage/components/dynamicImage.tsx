'use client'
import Image from 'next/image'
import { getImage } from '@lib/getImage'

export default async function DynamicImage({
    url,
    alt,

}: {
    url: string
    alt?: string
}) {
    const { base64, img } = await getImage(url)

    return (

        <Image
            {...img}
            alt={alt || ''}
            placeholder='blur'
            blurDataURL={base64}
            layout='fill'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />

    )
}