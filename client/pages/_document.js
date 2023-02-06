import {Html, Head, Main, NextScript} from 'next/document'
import React from "react";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&family=Roboto+Mono&family=Roboto:wght@300;400&display=swap"
                        rel="stylesheet"/>
                <script src="https://kit.fontawesome.com/ee97ebf0ee.js" crossOrigin="anonymous"></script>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
