import {ClerkProvider} from "@clerk/nextjs"
import { Inter } from "next/font/google"

import '../globals.css';


export const metadata = {
    title: 'Cadence',
    description: 'Find your next band today'
}

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({children} : {
    children: React.ReactNode}){
    return (
    <ClerkProvider> 
        <html lang = "en">
            <body className= {`${inter.className} dark`}>
                <div className="flex items-center justify-center">{children}</div>
            </body>
        </html>
    </ClerkProvider>
        )}