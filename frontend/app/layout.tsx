import ScrollToTop from "@/components/ScrollToTop";import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import ProvidersWrapper from "./providers-wrapper";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans, noto } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-noto antialiased",
          noto.className
        )}
      >
        <ScrollToTop />
        {/* ✅ ครอบ HeroUIProvider ไว้ภายใน Providers */}
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <ProvidersWrapper>
            <div className="relative flex flex-col min-h-screen">
              {/* Navbar (อยู่บนสุด) */}
              <Navbar />

              {/* Main content */}
              <main className="mt-10">
                {children}
              </main>

              {/* Footer */}
              <footer className="w-full flex items-center justify-center py-3">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="https://heroui.com?utm_source=next-app-template"
                  title="heroui.com homepage"
                >
                  <span className="text-default-600">Powered by</span>
                  <p className="text-primary">HeroUI</p>
                </Link>
              </footer>
            </div>
          </ProvidersWrapper>
        </Providers>
      </body>
    </html>
  );
}
