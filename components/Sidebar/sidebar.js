import Link from "next/dist/client/link"

export default function Sidebar({pid}) {
  return (
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <li>
                            <Link href="/profile/[pid]" as={`/profile/${pid}`} >
                                <a><i className="fs-4 bi-speedometer2"></i><span className="d-none d-sm-inline">Dashboard</span></a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile/[pid]/[dash]" as={`/profile/${pid}/orders`}><a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Orders</span></a></Link>
                        </li>
                        <li className="w-100">
                            <Link href="/profile/[pid]/[dash]" as={`/profile/${pid}/post`}><a className="nav-link px-0"><span className="d-none d-sm-inline">Post Inventory</span></a></Link>
                        </li>
                    </ul>
                </div>
            </div>
  )
}
