import { useRouter } from 'next/router';
import Card from '../ui/Card';
import classes from './NewsItem.module.css';

function NewsItem(props) {
  const router = useRouter();
  const showDetailHandler=()=>{
    router.push('/'+props.id);
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <p>By {props.author}</p>
          <p>On {props.date}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default NewsItem;
