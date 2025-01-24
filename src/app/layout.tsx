import "./globals.css";
import ConvexClientProvider from "../components/providers/ConvexClientProvider";
import Footer from "../components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
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
