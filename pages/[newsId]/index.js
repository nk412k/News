import NewsDetail from "../../components/news/NewsDetail";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";

function NewsDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.news.title}</title>
        <meta
          name="description"
          content={props.news.description}
        ></meta>
      </Head>
      <NewsDetail
        title={props.news.title}
        author={props.news.author}
        date={props.news.date}
        image={props.news.image}
        description={props.news.description}
      ></NewsDetail>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Nokhalal:Nokhalal@cluster0.grwrf.mongodb.net/news?retryWrites=true&w=majority"
  );
  const db = client.db();
  const newsCollection = db.collection("news");
  const data = await newsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: 'blocking',
    paths: data.map((news) => ({ params: { newsId: news._id.toString() } })),
  };
}

export async function getStaticProps(context) {
  const newid = context.params.newsId;
  const client = await MongoClient.connect(
    "mongodb+srv://Nokhalal:Nokhalal@cluster0.grwrf.mongodb.net/news?retryWrites=true&w=majority"
  );
  const db = client.db();
  const newsCollection = db.collection("news");
  const data = await newsCollection.findOne({
    _id: ObjectId(newid),
  });
  client.close();
  return {
    props: {
      news: {
        title:data.title,
        author:data.author,
        date:data.date,
        description:data.description,
        image:data.image,
        id:data._id.toString(),
      },
    },
  };
}
export default NewsDetails;
