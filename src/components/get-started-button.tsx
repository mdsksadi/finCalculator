"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";

const TARGET_ID = "calculators";
const TARGET_HREF = `/#${TARGET_ID}`;

export function GetStartedButton() {
  const pathname = usePathname();
  const router = useRouter();
  const pendingScroll = useRef(false);

  useEffect(() => {
    if (pendingScroll.current && pathname === "/") {
      pendingScroll.current = false;
      document
        .getElementById(TARGET_ID)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pathname]);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById(TARGET_ID);

    // Already on the home page: scroll directly, even if the hash is unchanged.
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", TARGET_HREF);
      return;
    }

    // On another page: navigate home first, then scroll once it renders.
    event.preventDefault();
    pendingScroll.current = true;
    router.push(TARGET_HREF);
  }

  return (
    <Link
      href={TARGET_HREF}
      onClick={handleClick}
      className={buttonVariants({ size: "sm", className: "rounded-full" })}
    >
      Get started
    </Link>
  );
}
