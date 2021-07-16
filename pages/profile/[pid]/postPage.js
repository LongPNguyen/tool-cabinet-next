import React, { useState, useEffect} from "react"
import PostForm from "../../../components/Forms/postForm";
import EditPost from "./edit/[id]";
import Link from "next/dist/client/link";

const Post = ({pid, user, tool}) => {
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
                            {tool.map(tool=>(
                            <div key={tool._id} className="col-12">
                                <div className="card" style={{padding:"0", margin:".5em"}}>
                                    <div className="row">
                                    <div className="col-4">
                                    <img src={tool.images} style={{height:"12vw", width:'12vw', objectFit:"cover"}} className="card-img-top img-fluid" alt="..."/>
                                    </div>
                                    <div className="col-8">
                                    <div className="card-body">
                                        <p>{tool.title}</p>
                                        <Link href="/profile/[pid]/edit/[id]" as={`/profile/${pid}/edit/${tool._id}`} >
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