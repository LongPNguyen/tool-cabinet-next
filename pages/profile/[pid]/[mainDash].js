import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Layout from "../../../components/Layout/layout"
import Sidebar from "../../../components/Sidebar/sidebar"
import Post from "./post"
import Orders from "./orders"

const MainDash = () => {
    const [tabs, setTabs] = useState()
    const router = useRouter()
    const { pid, mainDash } = router.query
    
    return (
      <Layout>
            <div class="container-fluid">
                <div class="row flex-nowrap">
                    <Sidebar pid={pid}/>
                    <div class="col py-3">
                        {
                         mainDash === 'post' ? <Post/> :
                         mainDash === 'orders' ? <Orders/> :
                         'hi'
                        }
                    </div>
                </div>
            </div>
      </Layout>
    )
  }
  
export default MainDash