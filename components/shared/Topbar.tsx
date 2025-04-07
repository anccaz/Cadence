import Image from "next/image";
import Link from "next/link";

function Topbar() {
  return (
    <nav className="topbar">
      <Link href="/" className="flexiterms-center gap-4">
        <Image src="/logo.png" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Cadence

        </p>
      </Link>
    </nav>
  )
}

export default Topbar;