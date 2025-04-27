import AccountProfile from "@/components/shared/forms/AccountProfile"
import MiddleWare from "@/middleware"
import {currentUser} from '@clerk/nextjs/server';

async function Page() {
    const user = await currentUser();

    const userInfo = {};

    const userData = {
        id: user?.id,
        objectId: userInfo?._id,
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user.firstName || "",
        bio: userInfo?.bio || "",
        image: userInfo?.image || user.imageUrl,
        genre: userInfo?.genre || "",
        instrument: userInfo?.instrument || ""
    } //Visit this again when we need to actually set up user info from database

    return(<main className ="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
        <h1 className="font-bold font-serif text-gray-200 tracking-tight">
            Onboarding
        </h1>  
        <p className = "font-bold font-serif text-gray-200 tracking-tight">
            Complete your profile now to use Cadence 
        </p> 

        <section className = "mt-9 bg-dark-2 p-10">
            <AccountProfile  user = {userData} 
            btnTitle="Continue"/>
        </section>

    </main>)

}
export default Page