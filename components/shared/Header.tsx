import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <header className="w-full border-b-2 border-yellow-500 mb-10">
        <div className="flex items-center justify-between mt-3 p-3">
            <Link href="/" className="w-28">
                <Image src="/assets/images/fuse_logo.svg" width={128} height={38} 
                alt="Fuse AI Logo" />
            </Link>

            <SignedIn>
                <nav className="md:flex-between hidden w-full max-w-xs">
                   <NavItems /> 
                </nav>
            </SignedIn>
            <div className="flex w-32 justify-end gap-3 mr-5">
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                    <MobileNav />
                </SignedIn>
                <SignedOut>
                    <Button asChild className="rounded-full bg-yellow-500 p-7" size="lg">
                        <Link href="/sign-in" className="text-black text-2xl hover:text-white">Login</Link>
                    </Button>
                </SignedOut>

            </div>
            
        </div>
    </header>

  )
}

export default Header