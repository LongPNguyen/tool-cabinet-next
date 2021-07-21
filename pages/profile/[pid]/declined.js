import LeadInfo from "../../../components/orders/leadInfo";
import { useSession } from "next-auth/client"


const Declined = ({lead}) => {
    const[session, loading] = useSession()
    
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
      <div className="container">
        <h1>Declined Request</h1>
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
        {lead.map(lead => {if(lead.toolStatus === "Declined"){return(
            <LeadInfo key={lead._id} lead={lead}/>
        )}})}
        </ul>
      </div>
    )
  }

export default Declined;