import PostForm from "../../../components/Forms/postForm";
import Link from "next/dist/client/link";
import { useSession } from "next-auth/client"
import { useEffect } from "react";


const Post = ({pid, user, tool}) => {
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
    useEffect(() => {
        typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
    }, [])

    const postForm = {
        ownerId: user?._id,
        ownerName: pid,
        images: "",
        title: "",
        description: "",
        pricePerDay: 0,
        depositPrice: 0,
        damagePrice: 0,
        category: "",
        tags: [],
        rating: 0,
        outDate: "",
        returnDate: "",
        status: "in",
        featured: false 
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 col-sm-12">
                    <PostForm postForm={postForm} pid={pid} user={user}/>
                </div>
                <div className="col-lg-7 col-md-12">
                    <h1 align="center">Inventory</h1>
                    <div className="row">
                            {tool?.map(tool=>(
                            <div key={tool._id} className="col-12">
                                <div className="card" style={{padding:"0", margin:".5em"}}>
                                    <div className="row">
                                    <div className="col-4">
                                    <img src={tool.images} style={{height:"12vw", width:'12vw', objectFit:"cover"}} className="card-img-top img-fluid" alt="..."/>
                                    </div>
                                    <div className="col-8">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                            <p>Title: {tool.title}</p>
                                            <p>Description: {tool.description}</p>
                                            <p style={tool.status === "Pending" ? {color:"orange"} : tool.status === "in" || "Declined" ? {color:"green"} : tool.status === "out" || "Accepted"? {color:"red"} : ""}>Status: {tool.status}</p>
                                            </div>
                                            <div className="col">
                                            <p>Price/Day: ${tool.pricePerDay}</p>
                                            <p>Waiver: ${tool.damagePrice}</p>
                                            <p>Deposit: ${tool.depositPrice}</p>
                                            </div>
                                        </div>
                                        <Link href="/profile/[pid]/editTools/[id]" as={`/profile/${pid}/editTools/${tool._id}`} >
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
  
export default Post