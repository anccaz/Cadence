import {ClerkProvider, UserButton} from "@clerk/nextjs";

export default function Home() {
  return (
    <ClerkProvider>
      <div>
        <UserButton afterSignOutUrl ="/"/>
      </div>
    </ClerkProvider>
  )
}

async function Page() {
  return(<main>
      <h1 className = "head-text">
          Onboarding
      </h1>  
  </main>)

}
//export default Page