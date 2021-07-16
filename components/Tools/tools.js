import Link from "next/dist/client/link";
import styles from '../Styles/index.module.css'


export default function ToolsComp({tools}) {
  return (
    <>
    <Link href={`/tools/${tools._id}`} tool={tools}>
      <div className="col-xl-2 col-lg-2 col-6 d-flex align-items-center flex-column">
        <div className="card display" style={{width: '10rem', marginBottom:"1em"}}>
          <img src={tools.images} className="card-img-top img-fluid" style={{height:"10rem"}} alt="..."/>
          <div className="card-body">
            <p className="card-text"><strong>{tools.title}</strong></p>
            <p className="card-text">{tools.description}</p>
            <div className="row">
              <div className="col-6 d-flex align-items-center justify-content-start">
                <p className={styles.priceContainer} >${tools.pricePerHr}|Hr</p>
              </div>
              <div className="col-6 d-flex align-items-center justify-content-start">
                <p className={styles.priceContainer}>${tools.pricePerDay}|Day</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
    </>
  )
}
