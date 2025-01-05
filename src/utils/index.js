import tunnel from "tunnel-rat";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * In and out tunnel for the reusability of React Three Fiber Canvas instance.
 * @func
 */
export const r3f = tunnel();

/**
 * Merges multiple tailwind-css class-name directives into a single string.
 * @param {...string} inputs - tailwind-css class name(s) to be merged.
 * @returns {string} - merged tailwind-css class names.
 */
export const cn = (...inputs) => twMerge(clsx(inputs));

export const getDevicePixelRatio = () => {
    if (typeof window !== "undefined" && typeof window.devicePixelRatio !== "undefined") {
        return window.innerWidth <= 768 ? 1.3 : Math.max(window.devicePixelRatio, 2);
    } else {
        return 1.3;
    }
};
