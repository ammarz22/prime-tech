import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrimeTechLogo } from "@/components/brand/prime-tech-logo";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-4 text-center text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[45vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }}
        aria-hidden
      />

      <Link href="/" className="relative mb-8">
        <PrimeTechLogo className="h-10" />
      </Link>

      <div className="relative flex size-16 items-center justify-center rounded-full border border-white/15 bg-white/5">
        <SearchX className="size-6 text-brand-cyan" strokeWidth={1.5} />
      </div>

      <p className="relative mt-6 text-8xl font-semibold tracking-tight text-white/10">404</p>
      <h1 className="relative -mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        Page not found.
      </h1>
      <p className="relative mt-3 max-w-sm text-balance text-white/55">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>

      <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
        <Button render={<Link href="/" />} size="lg" className="h-12 gap-2 rounded-full px-6 text-base">
          Back Home
          <ArrowRight className="size-4" />
        </Button>
        <Button
          render={<Link href="/products" />}
          size="lg"
          variant="outline"
          className="h-12 gap-2 rounded-full border-white/20 bg-white/5 px-6 text-base text-white hover:bg-white/10 hover:text-white"
        >
          Explore Products
        </Button>
      </div>
    </div>
  );
}
