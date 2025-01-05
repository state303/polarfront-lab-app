import React, { ReactNode } from "react";
import Header from "@/components/layout/header/DefaultHeader";
import Footer from "@/components/layout/footer/DefaultFooter";

export default async function HomeLayout({ children }) {
    const title = await getGlobalData().then((data) => data.title);
    return (
        <div className="flex flex-col w-dvw h-dvh justify-between">
            <Header title={title} />
            <main className="px-8 flex-1 overflow-y-auto">{children}</main>
            <Footer />
        </div>
    );
}
