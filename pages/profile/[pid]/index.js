import { useSession, signIn, getSession } from "next-auth/client";
import MainDash from "./[dash]";
import dbConnect from "../../../util/mongodb";
import Users from "../../../models/User";
import Tools from "../../../models/Tool";
import Leads from "../../../models/Leads";

export default function Secret({ user, tool, lead }) {
  const [session, loading] = useSession();

  if (typeof window !== "undefined" && loading) {
    return null;
  }

  if (!session) {
    return (
      <div>
        <h1>You aren't signed in, please sign in first</h1>
        <button
          onClick={() => {
            signIn();
          }}
        >
          Sign In
        </button>
      </div>
    );
  }
  return (
    <>
      <MainDash lead={lead} user={user} tool={tool} />
    </>
  );
}

export async function getServerSideProps({ req }) {
  await dbConnect();
  const session = await getSession({ req });

  /* find all the data in our database */
  const user = await Users.findById(session?.id);
  if (user) {
    user._id = user?._id.toString();
  }
  // this allows the data to be read with the correct data type
  const parseUser = JSON.parse(JSON.stringify(user));

  const results = await Tools.find({ ownerId: session?.id });
  const tools = results.map((doc) => {
    const tool = doc;
    tool._id = tool._id.toString();
    return tool;
  });
  const parseTools = JSON.parse(JSON.stringify(tools));

  const leads = await Leads.find({ owner: session?.id });
  const lead = leads.map((doc) => {
    const leadx = doc;
    leadx._id = leadx._id.toString();
    return leadx;
  });

  const parseLeads = JSON.parse(JSON.stringify(lead));

  return { props: { user: parseUser, tool: parseTools, lead: parseLeads } };
}
