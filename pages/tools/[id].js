import { useState, useEffect} from 'react'
import { dbConnect } from '../../util/mongodb'
import Layout from '../../components/Layout/layout'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import styles from '../../components/Styles/index.module.css'
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import Quote from '../../components/Modals/quoteForm'

export default function ToolPage({tools}) {
  const [ session, loading ] = useSession()
  const [tool, setTool] = useState({})
  const [dates, setDates] = useState([])
  const router = useRouter()

  useEffect(() => {
      typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null

      const { id } = router.query
      const fetchData = async() => {
          for(let i = 0; i < tools.length; i++){
              if(tools[i]._id === id){
                  setTool(tools[i])
              } else {
                  <div>
                      Error
                  </div>
              }
            }
      };
       fetchData()
  }, [])

  const { RangePicker } = DatePicker;

  function onChange(dates, dateStrings) {
    // console.log('From: ', dates[0], ', to: ', dates[1]);
    // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    setDates(dateStrings)
  }

  return (
    <Layout>
      {/* desktop */}
      <div className="container">
        <div className={`row ${styles.gallery}`}>
          <div className={`col ${styles.galleryImg}`}>
            <img src={tool.selectedFile} className="img-fluid" style={{borderRadius:'5 0 0 5', height:'100%', width:'100%'}}/>
          </div>
          <div className="col">
            <div className="row" style={{height:"50%", marginBottom:'12px'}} >
              <div className="col">
                <img src={tool.selectedFile} width="100%" height="100%" className="img-fluid"/>
              </div>
              <div className="col">
                <img src={tool.selectedFile} style={{borderRadius:'0 5 0 0'}} className="img-fluid" />
              </div>
            </div>
            <div className="row" style={{height:"50%", marginBottom:'12px'}}>
              <div className="col">
              <img src={tool.selectedFile} width="100%" height="100%" className="img-fluid"/>
              </div>
              <div className="col">
              <img src={tool.selectedFile} style={{borderRadius:'0 0 5 0'}} className="img-fluid"/>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{marginBottom:'2em'}}>
          {/* left column */}
          <div className="col-8" style={{borderRight:"1px solid black"}}>
            <div className="row">
              <div className="col-lg-8 col-xs-12">
                <h1>{tool.title}</h1>
                <p>{tool.description}</p>
              </div>
              {/* right side left column */}
              <div className="col-lg-4 col-xs-12 d-flex justify-content-start">
                <div className="card" style={{width: "18rem"}}>
                  <div className="card-body">
                    <h5 className="card-title">${tool.pricePerDay} / <span style={{fontSize:'80%', color:"grey"}}>Day</span></h5>
                    <h6 className="card-subtitle mb-2 text-muted"></h6>
                    <div className="card-text" style={{margin:"1em 0"}}>
                    <Space direction="vertical" size={12}>
                      <RangePicker
                        ranges={{
                          Today: [moment(), moment()],
                          'This Month': [moment().startOf('month'), moment().endOf('month')],
                        }}
                        onChange={onChange}
                      />
                    </Space>
                    </div>
                    <Quote dates={dates}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* right column */}
          <div className="col-4">
                <img className="img-thumbnail" src="https://i1.wp.com/i.pinimg.com/originals/2e/bc/2a/2ebc2a4c4874d77c575cac4c00594a0f.jpg?ssl=1"/>
                <p style={{fontSize:'1vw', paddingLeft:"5px"}}>
                  {tool.storeName || 'My Rental Store Name'}<br/>
                  123 Rental Street Kansas City, MO 64118<br/>
                  (816)111-1111<br/>
                  store@email.com
                </p>
          </div>
        </div>
      </div>
      {/* mobile */}
    </Layout>
  )
}

export async function getServerSideProps(context) {
    const { db } = await dbConnect()
  
    const toolData = await db.collection("tools").find({}).toArray();
  
    const tools = JSON.parse(JSON.stringify(toolData))
  
    return {
      props: { tools: tools },
    }
  }
  