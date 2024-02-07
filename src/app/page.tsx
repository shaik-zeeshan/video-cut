import { Button } from "@/components/ui/button";
import { VideotapeIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col">
      <nav className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3 ">
          <VideotapeIcon className="h-6 w-6" />
          <div className="text-sm">video-cut</div>
        </div>
        {/* <ul className="flex gap-5">
          <li>
            <Button variant="ghost">Sign Up</Button>
          </li>
          <li>
            <Button variant="outline">Log In</Button>
          </li>
        </ul> */}
      </nav>
      <main className="flex flex-1 flex-col items-center justify-center gap-5">
        <h1 className="w-1/3 text-center text-4xl font-bold leading-relaxed">
          Convert and Trim Videos to Suit Your Needs
        </h1>
        <Button asChild>
          <Link href="/video">Get Started</Link>
        </Button>
      </main>
    </div>
  );
}
