import PostForm from "../../../../components/Forms/postForm";
import dbConnect from "../../../../util/mongodb";
import Tools from "../../../../models/Tool";
import LayoutTemplate from "../../../../components/Layout/layout";
import Sidebar from "../../../../components/Sidebar/sidebar";
import { useRouter } from "next/router";
import SidebarMobile from "../../../../components/Sidebar/sidebarMobile";

const EditPost = ({ tool }) => {
  const router = useRouter();
  const { pid, id } = router.query;

  const postForm = {
    ownerId: tool.ownerId,
    ownerName: tool.ownerName,
    images: tool.images,
    title: tool.title,
    description: tool.description,
    pricePerDay: tool.pricePerDay,
    depositPrice: tool.depositPrice,
    damagePrice: tool.damagePrice,
    category: tool.category,
    tags: tool.tags,
    rating: tool.rating,
    outDate: tool.outDate,
    returnDate: tool.returnDate,
    status: tool.status,
    featured: tool.featured,
  };

  return (
    <LayoutTemplate>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Sidebar pid={pid} />
          <div className="col py-3">
            <SidebarMobile/>
            <div className="container">
              <div className="row">
                <div className="col-md-5 col-sm-12">
                  <PostForm
                    formId="edit-tool-form"
                    postForm={postForm}
                    forNewTool={false}
                    pid={pid}
                  />
                </div>
                <div className="col-lg-7 col-md-12">
                  <h1 align="center">{tool.title}</h1>
                  <div className="row">
                    <div className="col-12">
                      <div
                        className="card"
                        style={{ padding: "0", margin: ".5em" }}
                      >
                        <img
                          src={tool.images}
                          style={{
                            height: "auto",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          className="card-img-top img-fluid"
                          alt="..."
                        />
                        <div className="card-body">
                          <div className="row">
                            <div
                              className="col-6"
                              style={{ borderRight: "1px solid silver" }}
                            >
                              <p>
                                <strong>Description:</strong>
                                <br />
                                {tool.description}
                              </p>
                              <p>
                                <strong>Category:</strong>
                                <br />
                                {tool.category}
                              </p>
                              <p>
                                <strong>Tags:</strong>
                                <br />
                                {tool.tags}
                              </p>
                            </div>
                            <div className="col-6">
                              <p>
                                <strong>Price/Day:</strong> ${tool.pricePerDay}
                              </p>
                              <p>
                                <strong>Deposit price:</strong> $
                                {tool.depositPrice}
                              </p>
                              <p>
                                <strong>Damage waiver amount:</strong> $
                                {tool.damagePrice}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutTemplate>
  );
};

export default EditPost;

export async function getServerSideProps({ params }) {
  await dbConnect();

  const tool = await Tools.findById(params.id).lean();
  tool._id = tool._id.toString();

  return { props: { tool: tool } };
}
