import { useRouter } from "next/router";
import NewsForm from "../../components/news/NewsForm";
import Head from "next/head";
import { Fragment } from "react";

function AddNews(){
    const router=useRouter()
    const addnewsHandler=async(enteredData)=>{
        const response= await fetch('/api/add-news',{
            method:'POST',
            body:JSON.stringify(enteredData),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data=await response.json();
        console.log(data);
        router.push('/');
    }
    return <Fragment>
        <Head>
            <title>Add News</title>
            <meta name='description' content="This is the page to add news in the web-app "></meta>
        </Head>
        <NewsForm onAddNews={addnewsHandler}></NewsForm>
    </Fragment>
}
export default AddNews;