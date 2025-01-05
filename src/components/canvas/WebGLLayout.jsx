"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { getDevicePixelRatio } from "@/utils";
import { useNavbarStore } from "@/stores/useNavbarStore";

const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: false });

const WebGLLayout = ({ children }) => {
    const ref = useRef();
    const { isOpen } = useNavbarStore();

    return (
        <div className="relative w-dvw h-dvh grid items-center justify-center grid-rows-1 grid-cols-1" ref={ref}>
            <div className="w-full h-full col-start-1 row-start-1">{children}</div>
            {ref.current && (
                <Scene
                    dpr={getDevicePixelRatio()}
                    frameloop={isOpen ? "depend" : "always"}
                    className={"w-full h-full col-start-1 row-start-1"}
                    eventSource={ref}
                    eventPrefix="client"
                />
            )}
        </div>
    );
};

export default WebGLLayout;
