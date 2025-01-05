"use client";

import React from "react";

const Footer = () => {
    return (
        <footer className={`z-30 text-sm md:text-base px-8 py-8 text-foreground`}>
            <div>© {new Date().getFullYear()} Polarfront Lab - All Rights Reserved.</div>
            <div>
                Developed by <a href="https://echovisionlab.com">EchoVisionLab</a>
            </div>
        </footer>
    );
};

export default Footer;
