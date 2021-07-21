import {useEffect, useState} from 'react'
import dbConnect from '../../util/mongodb'
import { useRouter } from "next/router"
import Layout from '../../components/Layout/layout'
import ToolsComp from '../../Components/Tools/tools'
import Tools from '../../models/Tool'
import Link from 'next/link'
import Router from 'next/router'

export default function Search({tools}) {
  const [schValue, setSchValue] = useState()
  const router = useRouter()
  const { result } = router.query
  const handleSubmit = (e) => {
    e.preventDefault()
    Router.push(`/search/${schValue}`)
  }
  
  useEffect(() => {
      typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
  }, [])


  return (
    <Layout>
            <div className="container col-xl-12 px-4">
              <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-lg-12 justify-content-center">
                    <form className="d-flex" onSubmit={handleSubmit}>
                      <input
                       className="form-control me-2" 
                       type="text" 
                       placeholder="Search" 
                       aria-label="Search"
                       onChange={(e)=>{setSchValue(e.target.value)}}
                       />
                       <Link href="/search/[result]" as={`/search/${schValue}`} style={{color: "white"}}>
                        <a><span className="btn btn-primary">Search</span></a>
                       </Link>
                    </form>
                    <p style={{margin:"1em"}}><em>Search results for: &quot;{result}&quot;</em></p>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center flex-column" id="tools">
              <div className="container">
              <div className="row g-2">
                {tools.length === 0 ? 
                <div>
                    <h1 align="center">Sorry, we were unable to find any search results for <em>&quot;{result}&quot;</em></h1>
                </div> : 
                tools.map((tool)=>(
                  <ToolsComp key={tool._id} tools={tool}/>
                ))}
              </div>
              </div>
            </div>
    </Layout>
  )
}

export async function getServerSideProps({params}) {
  await dbConnect()

  /* find all the data in our database */
  const results = await Tools.find({
      "$or": [
        {"title" : {"$regex": params.result }},
        {"description" : {"$regex": params.result }},
        {"category" : {"$regex": params.result }},
        {"tags" : {"$regex": params.result }},
      ]
  });
  const grabTools = results.map((doc) => {
    const tool = doc
    tool._id = tool._id.toString()
    return tool
  })

  const tools = JSON.parse(JSON.stringify(grabTools))

  return { props: { tools: tools } }
}
