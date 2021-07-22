import PostForm from "../../../../components/Forms/storeForm";
import dbConnect from "../../../../util/mongodb";
import Stores from "../../../../models/Stores";
import LayoutTemplate from "../../../../components/Layout/layout";
import Sidebar from "../../../../components/Sidebar/sidebar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import SidebarMobile from "../../../../components/Sidebar/sidebarMobile";
import StoreForm from "../../../../components/Forms/storeForm";
import SkeletonMain from "../../../../components/Loading/mainDash";

const EditStore = ({ store }) => {
  const router = useRouter();
  const session = useSession();
  const { pid, id } = router.query;
  //   const [stores, setStore] = useState();

  //   useEffect(() => {
  //     const getStore = async () => {
  //       try {
  //         const res = await fetch(`/api/stores/[id]`, {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         });
  //         const data = await res.json();
  //         setStore(data?.data);
  //         // Throw error with status code in case Fetch API req failed
  //         if (!res.ok) {
  //           throw new Error(res.status);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     getStore();
  //   }, [session]);

  const storeForm = {
    owner: store?.owner,
    name: store?.name,
    image: store?.image,
    email: store?.email,
    phone: store?.phone,
    address: store?.address,
    description: store?.description,
    website: store?.website,
  };
  if (!store) {
    return <SkeletonMain />;
  }
  return (
    <LayoutTemplate>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Sidebar pid={pid} />
          <div className="col py-3">
            <SidebarMobile />
            <div className="container">
              <div className="row">
                <div className="col-md-5 col-sm-12">
                  <StoreForm
                    formId="edit-store-form"
                    storeForm={storeForm}
                    forNewStore={false}
                    pid={pid}
                    store={store}
                  />
                </div>
                <div className="col-lg-7 col-md-12">
                  <h1 align="center">{store?.name}</h1>
                  <div className="row">
                    <div className="col-12">
                      <div
                        className="card"
                        style={{ padding: "0", margin: ".5em" }}
                      >
                        <img
                          src={store?.image}
                          style={{
                            height: "auto",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          className="card-img-top img-fluid"
                          alt="..."
                        />
                        <div className="card-body">
                          <div className="row">
                            <div
                              className="col-6"
                              style={{ borderRight: "1px solid silver" }}
                            >
                              <p>
                                <strong>Name:</strong>
                                <br />
                                {store?.name}
                              </p>
                              <p>
                                <strong>Description:</strong>
                                <br />
                                {store?.description}
                              </p>
                              <p>
                                <strong>
                                  website: <br />
                                </strong>{" "}
                                {store.website}
                              </p>
                            </div>
                            <div className="col-6">
                              <p>
                                <strong>
                                  Address: <br />
                                </strong>{" "}
                                {store?.address}
                              </p>
                              <p>
                                <strong>Email:</strong>
                                <br />
                                {store?.email}
                              </p>
                              <p>
                                <strong>Phone:</strong>
                                <br />
                                {store?.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutTemplate>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const store = await Stores.findById(params.id).lean();
  store._id = store._id.toString();

  return { props: { store: store } };
}

export default EditStore;
