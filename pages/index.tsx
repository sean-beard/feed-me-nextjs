import { useContext } from "react";
import { PreLogin } from "components/PreLogin";
import type { NextPage } from "next";
import { AppContext } from "./_app";

const Home: NextPage = () => {
  const { user } = useContext(AppContext);

  return user ? <div>This is the main home page content</div> : <PreLogin />;
};

export default Home;
