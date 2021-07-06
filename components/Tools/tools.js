import Link from "next/dist/client/link";
import styles from '../Styles/index.module.css'


export default function Tools({tools}) {
  return (
    <>
    <Link href={`/tools/${tools._id}`} tool={tools}>
      <div className="col-xl-3 col-lg-4 col-sm-6 d-flex align-items-center flex-column">
        <div className="card display" style={{width: '18rem', marginBottom:"1em"}}>
          <img src={tools.selectedFile} className="card-img-top" style={{height:"18rem"}} alt="..."/>
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
              <div className="col-12 d-flex align-items-center justify-content-start">
                <p className={styles.priceContainer}>${tools.pricePerWk}|Wk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
    </>
  )
}
