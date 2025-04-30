import {SignIn} from "@clerk/nextjs"
import { dark } from "@clerk/themes";

export default function Page(){
    return <main className = "font-serif flex flex-col items-center w-full bg-gradient-to-br from-white via-[#b9a9de] to-[#8C70C4] pt-16 pb-44">
    <h1 className = "text-5xl font-extrabold text-[#8C70C4] drop-shadow-lg mb-6 text-center ">
        Welcome to Cadence
    </h1> 
    
    <SignIn appearance={{
           baseTheme: dark,
          }} />
    </main>
}