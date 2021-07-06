import {useEffect} from 'react'
import Head from 'next/head'
import { connectToDatabase } from '../util/mongodb'
import Layout from '../components/Layout/layout'
import { useSession } from 'next-auth/client'
import Link from 'next/dist/client/link'
import Tools from '../Components/Tools/tools'

export default function Home({tools}) {
  const [ session, loading ] = useSession()
  useEffect(() => {
      typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
  }, [])
  return (
    <Layout>
            <div className="container col-xxl-8 px-4 py-5">
              <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                  <img src="/images/toolcabinetlogo.jpg" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
                </div>
                <div className="col-lg-6">
                  <h1 className="display-5 fw-bold lh-1 mb-3">Find the tools you need for the job at hand</h1>
                  <p className="lead">With Tool Cabinet finding a the right tool for the job is a walk in the park, rent from local tool suppliers and grow the community!</p>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-start">

                    <form className="d-flex">
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                      <button className="btn btn-primary" type="submit">Search</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center" style={{marginBottom: "10em"}}>
            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Discover</button>
            </div>
            <div className="d-flex align-items-center flex-column">
              <h1 style={{margin:"1em", borderBottom:"1px solid red"}}>Tools</h1>
              <div className="container">
              <div className="row">
                {tools.map((tool)=>(
                  <Tools tools={tool}/>
                ))}
              </div>
              </div>
            </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase()

  const toolData = await db.collection("tools").find({}).toArray();

  const tools = JSON.parse(JSON.stringify(toolData))

  return {
    props: { tools: tools },
  }
}
