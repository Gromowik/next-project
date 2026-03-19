import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen w-full flex-col px-4 py-10 md:w-[70vw] md:px-0 xl:max-w-[1280px]">
        {children}
      </div>
    </div>
  );
}
