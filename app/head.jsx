const title = "Polarfront Lab";
const url = "https://pflab.io/";
const description = "Polarfront Lab Official Web";
const author = "Polarfront Lab";
const designer = "state303";
const publisher = "state303";

export default function Head() {
    return (
        <>
            {/* Recommended Meta Tags */}
            <meta charSet="utf-8" />
            <meta name="language" content="english" />
            <meta httpEquiv="content-type" content="text/html" />
            <meta name="author" content={author} />
            <meta name="designer" content={designer} />
            <meta name="publisher" content={publisher} />

            {/* Search Engine Optimization Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta
                name="keywords"
                content="Music, Art, Audio Engineering, Spatial Audio, Recording, Interactive Art, Art Education"
            />
            <meta name="robots" content="index,follow" />
            <meta name="distribution" content="web" />
            {/*
      Facebook Open Graph meta tags
        documentation: https://developers.facebook.com/docs/sharing/opengraph */}
            <meta property="og:title" content={title} />
            <meta property="og:type" content="site" />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={"/icons/android-icon-512.png"} />
            <meta property="og:site_name" content={title} />
            <meta property="og:description" content={description} />

            <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
            <link rel="apple-touch-icon" sizes="16x16" href="/icons/favicon-16x16.png" />
            <link rel="apple-touch-icon" sizes="32x32" href="/icons/favicon-32x32.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="mask-icon" color="#000000" href="/img/logo.svg" />
            <link rel="apple-touch-startup-image" href="/icons/apple-touch-icon.png" />

            {/* Meta Tags for HTML pages on Mobile */}
            {/* <meta name="format-detection" content="telephone=yes"/>
        <meta name="HandheldFriendly" content="true"/>  */}
            <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1.0" />
            <meta name="theme-color" content="#000" />
            <link rel="shortcut icon" href="/icons/apple-touch-icon.png" />
        </>
    );
}
