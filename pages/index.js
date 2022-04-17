import NewsList from "../components/news/NewsList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>News App</title>
        <meta
          name="description"
          content="This is the home page of the news app "
        ></meta>
      </Head>
      <NewsList news={props.news}></NewsList>
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Nokhalal:Nokhalal@cluster0.grwrf.mongodb.net/news?retryWrites=true&w=majority"
  );
  const db = client.db();
  const newsCollection = db.collection("news");
  const data = await newsCollection.find().toArray();
  data.reverse();
  client.close();
  return {
    props: {
      news: data.map((newss) => ({
        id: newss._id.toString(),
        title: newss.title,
        image: newss.image,
        author: newss.author,
        date: newss.date,
        description: newss.description,
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
