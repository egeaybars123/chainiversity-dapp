"use client";

import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";

import "@rainbow-me/rainbowkit/styles.css";

import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
// chains and connectors
import { polygonMumbai } from "wagmi/chains";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "Wallets",
    wallets: [metaMaskWallet({ chains })],
  },
]);

const config = createConfig({
  autoConnect: true,
  connectors: connectors,
  publicClient,
  webSocketPublicClient,
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Chainiversity</title>
        <meta
          name="description"
          content="Learn Chainlink Development with Chainiversity"
        ></meta>
      </head>
      <body className={`${inter.className} h-full min-h-screen`}>
        <div className="main">
          <div className="gradient" />
        </div> 
        <WagmiConfig config={config}>
          <RainbowKitProvider modalSize="compact" chains={chains}>
            <header>
              <Nav />
            </header>
            <main className="app h-full">{children}</main>

            <div className="mt-20">
            <footer className="fixed bottom-0 bg-indigo-500 text-indigo-50 p-2 w-screen z-50">
              StickyFooter
            </footer>
            </div>

          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
