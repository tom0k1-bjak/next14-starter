"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const NavigationTestPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  console.log(pathname);
  console.log(searchParams.get("A"));

  return (
    <div>
      <Link href="/" prefetch={false}>
        Click here
      </Link>
      <button>Write and Redirect</button>
    </div>
  );
};

export default NavigationTestPage;
