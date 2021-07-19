import { useRouter } from "next/router";
import { mutate } from "swr";

const LeadInfo = ({ lead }) => {
  const router = useRouter();
  const { pid, dash } = router.query

  const Accept = {
    id: lead._id,
    toolStatus: { toolStatus: "Accepted" },
  };

  const Decline = {
    id: lead._id,
    toolStatus: { toolStatus: "Declined" },
  };

  const Accepted = async (Accept) => {
    const { pid } = router.query;

    try {
      const res = await fetch(`/api/leads`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Accept),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/leads`, data, false); // Update the local data without a revalidation
      router.push(`/profile/${pid}/pendingorders`);
    } catch (error) {
      console.log(error);
    }
  };

  const Declined = async (Decline) => {
    const { pid } = router.query;

    try {
      const res = await fetch(`/api/leads`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Decline),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/leads`, data, false); // Update the local data without a revalidation
      router.push(`/profile/${pid}/pendingorders`);
    } catch (error) {
      console.log(error);
    }
  };

  const onAccept = () => {
    Accepted(Accept);
  };
  const onDecline = () => {
    Declined(Decline);
  };
  return (
      <li key={lead._id} className="list-group-item">
        <div className="row">
          <div className="col-lg-2 col-12">
            <img
              className="img-thumbnail"
              style={{ height: "100px", width: "100px" }}
              src={lead.toolImage}
            />
            <p>{lead.toolTitle}</p>
          </div>
          <div className="col-lg-6 col-12">
            <div className="row">
              <div className="col">
                <p>
                  <strong>Name:</strong> <br />
                  {lead.name}
                </p>
                <p>
                  <strong>Email:</strong> <br />
                  {lead.email}
                </p>
                <p>
                  <strong>Phone:</strong> <br />
                  {lead.phone}
                </p>
              </div>
              <div className="col-lg-7 col-12">
                <p>
                  <strong>Dates:</strong> <br />
                  {lead.dates[0]} - {lead.dates[1]}
                </p>
                <p>
                  <strong>Message:</strong> <br />
                  {lead.message}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-12">
            <p style={{ color: "orange" }}>{lead.toolStatus}</p>
          </div>
          <div className="col-lg-2 col-12">
            <div className="row">
            {
             dash === "pendingorders" ?
             <>
              <button
                className="btn-sm btn-success col-5 m-1"
                onClick={onAccept}
              >
                Accept
              </button>
              <button
                className="btn-sm btn-danger col-5 m-1"
                onClick={onDecline}
              >
                Decline
              </button>
            </>
             :

             dash === "acceptedorders" ?
             <>
              <button
                className="btn-sm btn-danger"
                onClick={onDecline}
              >
                Send to Declined
              </button>
             </>
             :

             dash === "declinedorders" ?
             <>
              <button
                className="btn-sm btn-success"
                onClick={onAccept}
              >
                Send to Accepted
              </button>
              </>
             :

             ""
            }
            </div>
          </div>
        </div>
      </li>
  );
};

export default LeadInfo;
