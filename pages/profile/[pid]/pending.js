import { useRouter } from 'next/router'
import { mutate } from 'swr'
import LeadInfo from '../../../components/orders/leadInfo';

const Pending = ({lead}) => {
  const router = useRouter()
  const Accept = {
    id: lead._id,
    toolStatus: {toolStatus: "Accepted"}
  }

  const Decline = {
    id: lead._id,
    toolStatus: {toolStatus: "Declined"}
  }

  const Accepted = async (Accept) => {
    const { pid } = router.query

    try {
      const res = await fetch(`/api/leads`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Accept),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/leads`, data, false) // Update the local data without a revalidation
      router.push(`/profile/${pid}/pendingorders`)
    } catch (error) {
      console.log(error)
    }
  }

  const Declined = async (Decline) => {
    const { pid } = router.query

    try {
      const res = await fetch(`/api/leads`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Decline),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/leads`, data, false) // Update the local data without a revalidation
      router.push(`/profile/${pid}/pendingorders`)
    } catch (error) {
      console.log(error)
    }
  }

  const onAccept = () => {
    Accepted(Accept)
  }
  const onDecline = () => {
    Declined(Decline)
  }
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
          {lead.map(lead => {if(lead.toolStatus === "Pending"){return(
            <LeadInfo key={lead._id} lead={lead}/>
          )}})}
        </ul>
        
      </div>
    )
  }

export default Pending