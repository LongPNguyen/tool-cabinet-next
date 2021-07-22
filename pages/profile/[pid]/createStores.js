import StoreForm from "../../../components/Forms/storeForm";
import Link from "next/dist/client/link";
import { useSession } from "next-auth/client"
import { useEffect } from "react";


const Store = ({pid, user, tool, store}) => {
    const[session, loading] = useSession()
    useEffect(() => {
        typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
    }, [])

    const storeForm = {
        owner: session?.id,
        name: "",
        image: "",
        email: "",
        phone: "",
        address: "",
        description: "",
        website: ""
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 col-sm-12">
                    <StoreForm storeForm={storeForm} pid={pid} user={user} store={store}/>
                </div>
                <div className="col-lg-7 col-md-12">
                    <h1 align="center">Stores</h1>
                    <div className="row">
                            {store?.map(store=>(
                            <div key={store._id} className="col-12">
                                <div className="card" style={{padding:"0", margin:".5em"}}>
                                    <div className="row">
                                    <div className="col-12">
                                    <img src={store.image} style={{height:"100%", width:'100%'}} className="card-img-top img-fluid" alt="..."/>
                                    </div>
                                    <div className="col-12">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12">
                                            <p>Name: <br/>{store.name}</p>
                                            <p>Description: <br/>{store.description}</p>
                                            <p>Website: <br/>{store.website}</p>
                                            </div>
                                            <div className="col-12">
                                            <p>Address: <br/>{store.address}</p>
                                            <p>Phone: <br/>{store.phone}</p>
                                            <p>Contact Email: <br/>{store.email}</p>
                                            </div>
                                        </div>
                                        <Link href="/profile/[pid]/editStores/[id]" as={`/profile/${pid}/editStores/${store._id}`} >
                                            <a>Edit</a>
                                        </Link>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
  }
  
export default Store