"use client";
import { HeroUIProvider } from "@heroui/react";
import { Providers } from "./providers";

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <HeroUIProvider>{children}</HeroUIProvider>
    </Providers>
  );
}