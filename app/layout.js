import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flashcard from Text",
  description: "Create Flashcard from Text",
};

export default function RootLayout({ children }) {
  return (
    <>
      <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </ClerkProvider>
    </>
  );
}
