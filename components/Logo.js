import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap4-z-10">
      <Image src="/icon.png" alt="Booking logo" height={60} width={60} />
    </Link>
  );
}
