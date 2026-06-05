import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 z-10">
      <Image
        src="/icon.png"
        alt="StayFinder logo"
        height={60}
        width={60}
        priority
      />
      <span className="text-2xl font-semibold tracking-tight">StayFinder</span>
    </Link>
  );
}
