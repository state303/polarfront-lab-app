import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";

const BreadcrumbSlot = ({ paths }) => {
    const breadcrumbItems = [];
    let breadcrumbPage = <></>;

    const parts = paths.filter((path) => path.length !== 0);

    for (let i = 0; i < parts.length; i++) {
        const route = parts[i];

        if (i === parts.length - 1) {
            const href = `/${parts.join("/")}`;
            breadcrumbPage = (
                <BreadcrumbItem>
                    <BreadcrumbLink href={href} className="capitalize hover:opacity-70 block">
                        Current
                    </BreadcrumbLink>
                </BreadcrumbItem>
            );
        } else {
            const href = `/${parts.slice(0, i - 1).join("/")}`;
            breadcrumbItems.push(
                <React.Fragment key={href}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={href} className="capitalize hover:opacity-70">
                            {route}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </React.Fragment>,
            );
        }
    }

    return (
        <Breadcrumb className="z-100">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="capitalize hover:opacity-70">
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {breadcrumbItems}
                {breadcrumbPage}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbSlot;
