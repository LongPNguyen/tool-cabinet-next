import { Skeleton } from "antd";

export default function SkeletonMain() {
  return (
    <div className="p-0 m-0">
      <Skeleton.Button active style={{ height: "10vh", width: "100vw" }} />
      <div className="row">
        <div className="col-6">
          <Skeleton.Button active style={{ height: "100vh", width: "20rem" }} />
        </div>
        <div className="col-6 d-flex justify-content-end py-5">
          <div className="row">
            <div className="col-12">
              <Skeleton.Button
                active
                style={{ width: "60vw", height: "40vh" }}
              />
            </div>
            <div className="col-12">
              <Skeleton
                active
                paragraph={{ rows: 4 }}
                style={{ width: "60vw", height: "20vh" }}
              />
            </div>
          </div>
        </div>
      </div>
      <Skeleton.Button active style={{ width: "100vw", height: "20vh" }} />
    </div>
  );
}
