import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';

import SearchBar from './components/searchbar/SearchBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative">
          <div className="absolute left-0 top-0 size-full">
            <Image
              src="/assets/football-logo.svg"
              width={1300}
              height={800}
              priority
              alt="backgroundImage"
              className="h-screen w-full object-contain"
            />
          </div>
          <div
            className="absolute left-0 top-0 h-screen w-full bg-gradient-to-b
                          from-black/10 to-black"
          />
          <div className="relative">
            <SearchBar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
