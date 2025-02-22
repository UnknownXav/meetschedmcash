"use client"; // This is necessary to use client-side routing

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  // Automatically redirect to /dashboard when the component mounts
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);


}
