import { useRef ,useState} from 'react';

import Card from '../ui/Card';
import classes from './NewsForm.module.css';

function NewsForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const authorInputRef = useRef();
  const descriptionInputRef = useRef();
  const dateInputRef=useRef();

  const [formInputsValidity, setFormInputsValidity] = useState({
    title: true,
    image: true,
    author:true,
    description:true,
  });

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredSummary = authorInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredDate=new Date(dateInputRef.current.value);

    const enteredTitleValid = enteredTitle.trim() !== "";
    const enteredImageValid = enteredImage.trim() !== "";
    const enteredAuthorValid = enteredSummary.trim() !== "";
    const enteredDescriptionValid = enteredDescription.trim() !== "";

    setFormInputsValidity({
      title: enteredTitleValid,
      image: enteredImageValid,
      author: enteredAuthorValid,
      description: enteredDescriptionValid,      
    });
    const formIsValid = enteredDescriptionValid && enteredImageValid && enteredAuthorValid && enteredTitleValid;
    if (!formIsValid) {      
      return;
    }     

    const month = enteredDate.toLocaleString("en-US", { month: "long" });
    const day = enteredDate.toLocaleString("en-US", { day: "2-digit" });
    const year = enteredDate.getFullYear();
    const date = ` ${day} ${month} ${year}`;

    const newsData = {
      title: enteredTitle,
      image: enteredImage,
      author: enteredSummary,
      date: date,
      description: enteredDescription,
    };

    props.onAddNews(newsData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formInputsValidity.title ? "" : classes.invalid
          }`}
        >
          <label htmlFor="title">News Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div
          className={`${classes.control} ${
            formInputsValidity.image ? "" : classes.invalid
          }`}
        >
          <label htmlFor="image">News Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div
          className={`${classes.control} ${
            formInputsValidity.author ? "" : classes.invalid
          }`}
        >
          <label htmlFor="author">Author</label>
          <input type="text" required id="author" ref={authorInputRef} />
        </div>
        <div
          className={classes.control} 
        >
          <label>Date</label>
          <input type="date" id="date" required  ref={dateInputRef}/>
        </div>
        <div
          className={`${classes.control} ${
            formInputsValidity.description ? "" : classes.invalid
          }`}
        >
          <label htmlFor="detail">Detail</label>
          <textarea id="description" required rows="5" ref={descriptionInputRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add News</button>
        </div>
      </form>
    </Card>
  );
}

export default NewsForm;
