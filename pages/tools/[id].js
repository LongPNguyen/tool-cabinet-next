import { useState } from 'react'
import dbConnect from '../../util/mongodb'
import Tools from '../../models/Tool'
import Users from '../../models/User'
import Layout from '../../components/Layout/layout'
import styles from '../../components/Styles/index.module.css'
import { DatePicker, Space, Alert } from 'antd';
import moment from 'moment';
import Quote from '../../components/Modals/quoteForm'

export default function ToolPage({tool, owner}) {
  const [dates, setDates] = useState([])
  const [validation, setValidation] = useState("")

  const { RangePicker } = DatePicker;

  function onChange(dates, dateStrings) {
    // console.log('From: ', dates[0], ', to: ', dates[1]);
    // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    setValidation("valid")
    setDates(dateStrings)
  }

  const handleSubmit = (e) => {
    if (dates.length === 2) {
      setValidation("valid")
    } else {
      setValidation("invalid")
    }
  }

  return (
    <Layout>
      {/* desktop */}
      <div className="container">
        <div className={`row ${styles.gallery}`}>
          <div className={`col ${styles.galleryImg}`}>
            <img src={tool.images} className="img-fluid" style={{borderRadius:'5 0 0 5', height:'100%', width:'100%'}}/>
          </div>
          <div className="col">
            <div className="row" style={{height:"50%", marginBottom:'12px'}} >
              <div className="col">
                <img src={tool.images} width="100%" height="100%" className="img-fluid"/>
              </div>
              <div className="col">
                <img src={tool.images} style={{borderRadius:'0 5 0 0'}} className="img-fluid" />
              </div>
            </div>
            <div className="row" style={{height:"50%", marginBottom:'12px'}}>
              <div className="col">
              <img src={tool.images} width="100%" height="100%" className="img-fluid"/>
              </div>
              <div className="col">
              <img src={tool.images} style={{borderRadius:'0 0 5 0'}} className="img-fluid"/>
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
                    <div className="input-group">
                    <Space direction="vertical" size={12}>
                      <RangePicker
                        ranges={{
                          Today: [moment(), moment()],
                          'This Month': [moment().startOf('month'), moment().endOf('month')],
                        }}
                        onChange={onChange}
                        name={dates}
                        id="validationCustomUsername"
                        aria-describedby="inputGroupPrepend"
                      />
                    </Space>
                    </div>                 
                      {validation === "invalid" ?
                        <div style={{marginTop:'1em'}}>
                        <Alert message="Please select your dates" type="error" />
                        </div>
                        : null                    
                      }
                    </div>
                    <button onClick={()=>{handleSubmit()}} type="button" className="btn btn-primary" data-bs-toggle={validation === "valid" ? "modal" : ""} data-bs-target="#quoteModal">
                      Request a Quote
                    </button>
                    <Quote dates={dates} tool={tool} owner={owner}/>
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

export async function getServerSideProps({params}) {
  await dbConnect()

  /* find all the data in our database */
  const tool = await Tools.findById(params.id).lean();
  tool._id = tool._id.toString()

  const user = await Users.findById(tool.ownerId).lean();
  user._id = user._id.toString()

  return { props: { tool: tool, owner: user._id } }
}
  