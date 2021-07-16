import dbConnect from "../../../util/mongodb"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useSession, signIn, getSession } from "next-auth/client"
import Layout from "../../../components/Layout/layout"
import Sidebar from "../../../components/Sidebar/sidebar"
import Users from "../../../models/User"
import Tools from "../../../models/Tool"
import Leads from "../../../models/Leads"
import Post from "./postPage"
import Orders from "./ordersPage"
import EditPost from "./edit/[id]";

const MainDash = ({user, tool, lead}) => {
    const[session, loading] = useSession();
    const [tabs, setTabs] = useState()
    const router = useRouter()
    const { pid, dash } = router.query

    const sideBarRoute = () =>{}

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
    
    return (
      <Layout>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <Sidebar pid={pid}/>
                    <div className="col py-3">
                        {
                         dash === 'post' ? <Post pid={pid} user={user} tool={tool}/> :
                         dash === 'orders' ? <Orders user={user} tool={tool} leads={lead}/> :
                         dash ===  `edit/*` ? <EditPost/> :
                         "hello"
                        }
                    </div>
                </div>
            </div>
      </Layout>
    )
  }

export async function getServerSideProps({req}) {
  await dbConnect()
  const session = await getSession({ req });

  /* find all the data in our database */
  const user = await Users.findById(session.id);
  user._id = user._id.toString()
  // this allows the data to be read with the correct data type
  const parseUser = JSON.parse(JSON.stringify(user))

  const results = await Tools.find({ownerId: session.id});
  const tools = results.map((doc) => {
    const tool = doc
    tool._id = tool._id.toString()
    return tool
  })
  const parseTools = JSON.parse(JSON.stringify(tools))

  const leads = await Leads.find({ owner: session?.id });
  const lead = leads.map((doc)=>{
    const leadx = doc
    leadx._id = leadx._id.toString()
    return leadx
  })

  const parseLeads = JSON.parse(JSON.stringify(lead))


  return { props: { user: parseUser, tool: parseTools, lead: parseLeads } }
}
  
export default MainDash