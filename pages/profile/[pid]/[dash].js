import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/client";
import LayoutTemplate from "../../../components/Layout/layout";
import Sidebar from "../../../components/Sidebar/sidebar";
import Post from "./postPage";
import Pending from "./pending";
import Accepted from "./accepted";
import Declined from "./declined";
import Store from "./createStores";
import Link from "next/dist/client/link";
import SkeletonMain from "../../../components/Loading/mainDash";
import SidebarMobile from "../../../components/Sidebar/sidebarMobile";
import styles from "../../../components/Styles/index.module.css";

const MainDash = () => {
  const [session, loading] = useSession();
  const [tabs, setTabs] = useState();
  const router = useRouter();
  const { pid, dash } = router.query;
  const [lead, setLeads] = useState();
  const [user, setUser] = useState();
  const [tool, setTools] = useState();
  const [store, setStore] = useState();

  useEffect(() => {
    const getLeads = async () => {
      try {
        const res = await fetch("/api/leads/leadOwner", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setLeads(data?.data);
        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
          throw new Error(res.status);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLeads();

    const getUser = async () => {
      try {
        const res = await fetch("/api/users/getUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setUser(data?.data);
        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
          throw new Error(res.status);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();

    const getTool = async () => {
      try {
        const res = await fetch("/api/tools/getOwnerTools", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setTools(data?.data);
        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
          throw new Error(res.status);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTool();

    const getStore = async () => {
      try {
        const res = await fetch("/api/stores", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setStore(data?.data);
        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
          throw new Error(res.status);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStore();
  }, [session]);

  if (typeof window !== "undefined" && loading) {
    return null;
  }

  if (!session) {
    return (
      <div>
        <h1>You aren't signed in, please sign in first</h1>
        <button
          onClick={() => {
            signIn();
          }}
        >
          Sign In
        </button>
      </div>
    );
  }
  if (!user) {
    return <SkeletonMain />;
  }
  return (
    <LayoutTemplate>
      <div className="container-fluid">
        {!user?.business ? (
          <div style={{ paddingTop: "2em" }} align="center">
            <h2>
              Sorry but this page is only for verified businesses, if you would
              like register with us a business user
              <Link href="/signin/chooseAccount">
                <a href=""> Click Here!</a>
              </Link>
            </h2>
          </div>
        ) : (
          <div className="row flex-nowrap">
            <Sidebar pid={pid} />
            <div className="col py-3">
              <SidebarMobile />
              {dash === "post" ? (
                <Post pid={pid} user={user} tool={tool} session={session} />
              ) : dash === "pendingorders" ? (
                <Pending lead={lead} session={session} />
              ) : dash === "acceptedorders" ? (
                <Accepted lead={lead} session={session} />
              ) : dash === "declinedorders" ? (
                <Declined lead={lead} session={session} />
              ) : dash === "mystores" ? (
                <Store store={store} session={session} pid={pid}/>
              ) : (
                <div className="container my-5">
                  <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                    <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                      <h1 className="display-4 fw-bold lh-1">
                        Analytics coming soon!
                      </h1>
                      <p className="lead">
                        We do our best to provide you with the best experience
                        possible! With analytics on the way, getting the insight
                        you need to excel in your business will be easier than
                        ever!
                      </p>
                      <p>Have other features you'd like to added?</p>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                        <a
                          href="mailto:support.toolcabinet.co"
                          type="button"
                          className="btn btn-outline-secondary btn-lg px-4"
                        >
                          Contact Us!
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
                      <img
                        className="rounded-lg-3"
                        src="https://downloads-pagekit.storage.googleapis.com/pagekit/analytics/image.jpeg"
                        alt=""
                        width="720"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </LayoutTemplate>
  );
};
export default MainDash;
