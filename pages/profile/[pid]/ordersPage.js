const Orders = ({leads}) => {

  console.log(leads)

    return (
      <div className="container">
        <h1>Pending Requests</h1>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="row">
              <div className="col-lg-2 col fw-bold">
                Item
              </div>
              <div className="col-lg-6 col fw-bold">
                Lead Info
              </div>
              <div className="col-lg-2 col fw-bold">
                Status
              </div>
              <div className="col-lg-2 col fw-bold">
                Validation
              </div>
            </div>
          </li>
          {leads.map(lead => {return(
          <li key={lead._id} className="list-group-item">
          <div className="row">
            <div className="col-lg-2 col-12">
              <img className="img-thumbnail" style={{height:"100px", width:"100px"}} src={lead.toolImage}/>
              <p>{lead.toolTitle}</p>
            </div>
            <div className="col-lg-6 col-12">
              <div className="row">
                <div className="col">
                <p>name: <br/>{lead.name}</p>
                <p>email: <br/>{lead.email}</p>
                <p>phone: <br/>{lead.phone}</p>
                </div>
                <div className="col">
                <p>dates: <br/>{lead.dates[0]} - {lead.dates[1]}</p>
                <p>message: <br/>{lead.message}</p> 
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-6">
              <p style={{color:"orange"}}>{lead.toolStatus}</p>
            </div>
            <div className="col-lg-2 col-6">
              <p><span style={{color:"green"}}>Accept</span> | <span style={{color:"red"}}>Decline</span></p>
            </div>
          </div>
          </li>
          )})}
        </ul>
      </div>
    )
  }

export default Orders