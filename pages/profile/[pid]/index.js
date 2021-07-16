import { useSession, signIn } from "next-auth/client";
import { useRouter } from 'next/router'
import MainDash from "./[dash]";

export default function Secret(){
    const[session, loading] = useSession();

    if(typeof window !== "undefined" && loading){
        return null;
    }
    
    if(!session){
        return (
                <div>
                    <h1>You aren't signed in, please sign in first</h1>
                    <button onClick={()=>{signIn()}}>Sign In</button>
                </div>
        )
    }
    return(
      <>
        <MainDash/>
      </>
    )
}