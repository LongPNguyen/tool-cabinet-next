import { useEffect, useState } from "react";

export default function UserOrders({ session }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/leads/leads", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setData(data.data);
        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
          throw new Error(res.status);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [session]);

  return (
    <div className="container overflow-auto p-0" style={{ height: "64.6vh" }}>
      {data?.length === 0 ? (
        <h5>You do not have any orders at this time.</h5>
      ) : (
        data?.map((data) => {
          return (
            <div className="col-12 mb-1">
              <div className="card" style={{ padding: "0", borderRadius: 0 }}>
                <div className="row">
                  <div className="col d-flex align-items-start">
                    <img
                      src={data?.toolImage}
                      style={{
                        objectFit: "cover",
                        borderRadius: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      className="img-fluid"
                      alt="..."
                    />
                  </div>
                  <div className="col-8 p-2" align="start">
                    <p>{data?.toolTitle}</p>
                    <p>
                      From: {data?.dates[0]} - {data?.dates[1]}
                    </p>
                    <p>
                      Status:{" "}
                      <span
                        style={
                          data?.toolStatus === "Pending"
                            ? { color: "orange" }
                            : data?.toolStatus === "Accepted"
                            ? { color: "green" }
                            : data?.toolStatus === "Declined"
                            ? { color: "red" }
                            : ""
                        }
                      >
                        {data?.toolStatus}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
