import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/client";
import Layout from "../../../components/Layout/layout";
import { useRouter } from 'next/router'
import Sidebar from "../../../components/Sidebar/sidebar";

export default function Secret(){
    const[session, loading] = useSession();
    const[content, setContent] = useState();
    const router = useRouter()
    const { pid } = router.query

    if(typeof window !== "undefined" && loading){
        return null;
    }
    
    if(!session){
        return (
            <main>
                <div>
                    <h1>You aren't signed in, please sign in first</h1>
                    <button onClick={()=>{signIn()}}>Sign In</button>
                </div>
            </main>
        )
    }
    return(
        <Layout>
            <div class="container-fluid">
                <div class="row flex-nowrap">
                    <Sidebar pid={pid}/>
                    <div class="col py-3">
                        Hello
                    </div>
                </div>
            </div>
        </Layout>
    )
}