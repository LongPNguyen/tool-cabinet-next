import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import UserOrders from "./orders";
import EditProfile from "../Modals/userAccEdit";


export default function Profile() {
  const [session] = useSession();
  const [user,setUser] = useState()
  useEffect(()=>{
    const getUser = async () => {
        try {
          const res = await fetch("/api/users/getUser", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          setUser(data.data);
          // Throw error with status code in case Fetch API req failed
          if (!res.ok) {
            throw new Error(res.status);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
  },[session])

  return (
    <div className="container p-3" align="center">
      <div className="row" align="center">
        <div className="col-sm-12 col-lg pb-5">
          <h4 align="start">Account</h4>
          <div className="card" align="start">
            <div align="center">
              <img
                src={user?.image || ""}
                style={{ borderRadius: "50%", height: "70%", width: "70%" }}
                className="card-img-top p-5"
                alt="..."
              />
            </div>
            <div className="card-body">
              <h6 className="card-title" align="center">
                <u>{user?.name}</u>
              </h6>
              <p>
                <u>Bio</u> {user?.bio}
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <p>
                  <u>Account Information</u>
                </p>
                <p>
                  Email: <br />
                  {user?.email}
                </p>
                <p>
                  Phone: <br />
                  {user?.phone}
                </p>
              </li>
            </ul>
            <div className="card-body">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
              >
                Edit Profile
              </button>
            <EditProfile/>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg">
          <h4 align="start">Orders</h4>
          <UserOrders session={session} />
        </div>
      </div>
    </div>
  );
}
