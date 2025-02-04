import "./globals.css";
import ConvexClientProvider from "../components/providers/ConvexClientProvider";
import Footer from "../components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

export const MetaData : Metadata = {
  title : "Code Daily",
  description : "A dynamic platform where users can run code in multiple languages, design web pages with HTML, CSS, and JS, post their code, and explore others' creations—basically, a coder's playground without the annoying bugs (hopefully)."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className=" min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex flex-col justify-between">
            <ConvexClientProvider>{children}</ConvexClientProvider>
          <Footer />
          <Toaster position="bottom-center"/>
        </body>
      </html>
    </ClerkProvider>
  );
}
