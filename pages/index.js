import { useEffect, useState } from "react";
import dbConnect from "../util/mongodb";
import LayoutTemplate from "../components/Layout/layout";
import ToolsComp from "../Components/Tools/tools";
import Tools from "../models/Tool";
import Link from "next/link";
import Router from "next/router";

export default function Home({ tools }) {
  const [schValue, setSchValue] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    Router.push(`/search/${schValue}`);
  };
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, []);
  return (
    <LayoutTemplate>
      <div className="container col-xl-12 px-4">
        <div className="row flex-lg-row-reverse align-items-center justify-content-center g-5">
          <div className="col-12 col-sm-8 col-lg-6">
            <img
              src="/images/toolcabinetlogo.jpg"
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">
              Find the tools you need for the job at hand
            </h1>
            <p className="lead">
              With Tool Cabinet finding a the right tool for the job is a walk
              in the park, rent from local tool suppliers and grow the
              community!
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <form className="d-flex" onSubmit={handleSubmit}>
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => {
                    setSchValue(e.target.value);
                  }}
                />
                <Link
                  href="/search/[result]"
                  as={`/search/${schValue}`}
                  style={{ color: "white" }}
                >
                  <a>
                    <span className="btn btn-outline-primary">Search</span>
                  </a>
                </Link>
              </form>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button
              type="button"
              className="btn btn-outline-primary btn-lg px-4 me-md-2"
            >
              <a href="#tools" style={{ color: "inherit" }}>
                <span>Discover </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </a>
            </button>
          </div>
          <div className="d-flex align-items-center flex-column" id="tools">
            <h1 style={{ margin: "1em", borderBottom: "1px solid red" }}>
              Tools
            </h1>
            <div className="container">
              <div className="row g-2">
                {tools.map((tool) => (
                  <ToolsComp key={tool._id} tools={tool} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutTemplate>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Tools.find({});
  const grabTools = result.map((doc) => {
    const tool = doc;
    tool._id = tool._id.toString();
    return tool;
  });

  const tools = JSON.parse(JSON.stringify(grabTools));

  return { props: { tools: tools } };
}
