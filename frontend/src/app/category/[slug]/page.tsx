"use client";

import { usePathname, useRouter } from "next/navigation";

export default function Category() {
  const pathname = usePathname();
  const router = useRouter()

  console.log(router);

  return <div>category</div>;
}
