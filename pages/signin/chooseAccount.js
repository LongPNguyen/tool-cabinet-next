import Layout from '../../components/Layout/layout'
import styles from '../../components/Styles/index.module.css'
import { signIn } from 'next-auth/client'

const ChooseAccount = () => {
    return (
        <div style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dG9vbHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)",
            backgroundSize: "cover",
            }}>
        <Layout>
            <div className="row justify-content-center align-content-center m-0">
            <div className="col-xl-5 p-5">
                <div className="h-100 p-5 text-white bg-dark rounded-3">
                <h2 className="text-white">Business Account</h2>
                <p>Own a rental store? Sign up for a Business Account and post your inventory today!</p>
                <hr/>
                <ul className={styles.checklist}>
                    <li> Manage your inventory Online</li>
                    <li> Manage leads from your user dashboard</li>
                    <li> And more!</li>
                </ul>
                <a href="mailto:info.toolcabinet@gmail.com" className="btn btn-outline-light" type="button">Contact Us</a>
                </div>
            </div>
            <div className="col-xl-5 p-5">
                <div className="h-100 p-5 bg-light border rounded-3">
                <h2>Individual Account</h2>
                <p>Need to keep track of your orders and quote status? Sign up for an Indivual Account today!</p>
                <hr/>
                <ul className={styles.checklist}>
                    <li> Manage your orders Online</li>
                    <li> Save your info for future orders</li>
                    <li> And more!</li>
                </ul>
                <button style={{color:"black", borderColor:"black"}} type="button" className="btn btn-outline-secondary" onClick={() => signIn()}>Sign Up</button>
                </div>
            </div>
            </div>
        </Layout>
        </div>
    )
  }
  
export default ChooseAccount