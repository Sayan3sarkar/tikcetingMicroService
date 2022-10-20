import buildClient from "../api/build-client";
import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  axios.get("/api/users/currentUser").catch((err) => {
    console.log(err.message);
  });

  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async (context) => {
  console.log("LANDING PAGE!");
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentUser");

  return data;
};

export default LandingPage;
