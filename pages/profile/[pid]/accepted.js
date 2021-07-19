import LeadInfo from "../../../components/orders/leadInfo";

const Accepted = ({lead}) => {

    return (
      <div className="container">
        <h1>Accepted Request</h1>
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
        {lead.map(lead => {if(lead.toolStatus === "Accepted"){return(
            <LeadInfo key={lead._id} lead={lead}/>
        )}})}
        </ul>
      </div>
    )
  }

export default Accepted;