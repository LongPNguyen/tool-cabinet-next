import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/dist/client/link';

export default function SignUp() {  
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const [ session, loading ] = useSession()
  return (
    <>
        {/* <!-- Button trigger modal --> */}
        {!session && 
            <>
                <button type="button" className="btn btn-primary" onClick={() => signIn()}>Sign Up</button>
        </>
        }
        {session &&
            <div>
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <img style={{width: '25px', height: '25px', marginRight:".5em", borderRadius:"50%"}} src={session.user.image}/>Hello, {session.user.name} <i className="fas fa-chevron-down"></i>
                    </button>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{marginRight:"5em"}}>
                        <li><Link href="/profile"><a className="dropdown-item">Profile</a></Link></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="/" onClick={() => signOut()}>Log out</a></li>
                    </ul>
                </div>
            </div>
        }
    </>
  )
}