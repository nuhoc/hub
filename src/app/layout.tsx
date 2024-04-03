import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import "~/styles/globals.css";

import { Inter, Shrikhand, Raleway } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "./_components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const shrikhand = Shrikhand({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-shrikhand',
})

const raleway = Raleway({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
})

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <html lang="en" className="bg-white bg-cover bg-topo-pattern w-full h-full">
      <body className={`font-sans ${inter.variable} ${shrikhand.variable} ${raleway.variable}`}>
        <TRPCReactProvider>
          <Navbar loggedIn={!!session} />
          <div>{children}</div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
