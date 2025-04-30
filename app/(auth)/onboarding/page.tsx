import AccountProfile from "@/components/shared/forms/AccountProfile"
import MiddleWare from "@/middleware"
import {currentUser} from '@clerk/nextjs/server';

async function Page() {
    const clerkUser = await currentUser();

    const userInfo = {};

    const userData = {
        id: clerkUser.id,
        objectId: "",
        username: clerkUser?.username || "",
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        name: clerkUser.firstName || "",
        image: clerkUser.imageUrl,
        genre: "",
        instrument: userInfo?.instrument || ""
    } //Visit this again when we need to actually set up user info from database

    return(<main className="font-serif flex flex-col items-center w-full bg-gradient-to-br from-white via-[#b9a9de] to-[#8C70C4] pt-16 pb-44">
        <h1 className="font-extrabold font-serif text-[#5D4197] tracking-tight">
            Onboarding
        </h1>  

        <p className = "font-bold font-serif text-[#5D4197] tracking-tight ">
            Complete your profile now to use Cadence 
        </p> 

        <section className = "mt-9 bg-dark-2 p-10">
            <AccountProfile  user = {userData} 
            btnTitle="Continue"/>
        </section>

    </main>)

}
export default Page