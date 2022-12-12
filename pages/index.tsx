import { useContext } from "react";
import { PreLogin } from "components/PreLogin";
import type { NextPage } from "next";
import { AppContext } from "./_app";
import { NewsFeed } from "components/NewsFeed";

const Home: NextPage = () => {
  const { user } = useContext(AppContext);

  return user ? <NewsFeed /> : <PreLogin />;
};

export default Home;
