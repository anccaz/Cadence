import {SignIn} from "@clerk/nextjs"
import { dark } from "@clerk/themes";

export default function Page(){
    return <main>
    <h1 className = "flex items-center justify-center ">
        Welcome to Cadence
    </h1> 
    
    <SignIn appearance={{
           baseTheme: dark,
          }} />
    </main>
}