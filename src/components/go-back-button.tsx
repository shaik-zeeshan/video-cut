"use client";

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const GoBackButton = () => {
  const router = useRouter();
  const goBack = () => {
    console.log(window.history?.length);
    if (window.history?.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };
  return (
    <button
      onClick={goBack}
      role="link"
      aria-label="go back"
      className="flex items-center gap-5 transition-all hover:gap-3"
    >
      <MoveLeft size={32} />
      Back
    </button>
  );
};
