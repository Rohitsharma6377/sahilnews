import Link from 'next/link'
import Image from 'next/image'
import LogoImg from '@/app/logo.jpeg'

export function Logo({ size = 22 }: { size?: number }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2 select-none">
      <Image
        src={LogoImg}
        alt="SahilNews logo"
        priority
        height={size}
        width={Math.max(1, Math.round((LogoImg.width / LogoImg.height) * size))}
      />
      <span className="font-heading text-xl font-bold leading-none">
        SahilNews
      </span>
    </Link>
  )
}
