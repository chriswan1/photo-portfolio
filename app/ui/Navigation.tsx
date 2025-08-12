import Link from "next/link";

export function Navigation() {
  return (
    <nav className="flex gap-12 text-sm ml-auto">
      <Link className="underline underline-offset-4 hover:no-underline" href="/">Home</Link>
      <Link className="underline underline-offset-4 hover:no-underline" href="/gallery">Gallery</Link>
      <Link className="underline underline-offset-4 hover:no-underline" href="/about">About</Link>
    </nav>
  );
}
