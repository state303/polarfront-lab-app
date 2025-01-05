import "@/globals.css";
import { ThemeProvider } from "next-themes";
import WebGLLayout from "@/components/canvas/WebGLLayout";

export const metadata = {
    title: "PFLab",
    description: "Under Construction",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head />
            <body className="antialiased">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem={true}
                    storageKey="pflab-site-theme"
                >
                    <WebGLLayout>{children}</WebGLLayout>
                </ThemeProvider>
            </body>
        </html>
    );
}
