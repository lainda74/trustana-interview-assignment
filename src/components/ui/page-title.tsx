"use client";

import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

export default function PageTitle() {
  const pathname = usePathname();

  const title = useMemo(() => {
    const segment = pathname.split("/").filter(Boolean).pop() || "dashboard";
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }, [pathname]);

  return <h1 className="text-2xl font-bold mb-4 px-8">{title}</h1>;
}