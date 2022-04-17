import NewsItem from './NewsItem';
import classes from './NewsList.module.css';

function NewsList(props) {
  return (
    <ul className={classes.list}>
      {props.news.map((newss) => (
        <NewsItem
          key={newss.id}
          id={newss.id}
          image={newss.image}
          title={newss.title}
          author={newss.author}
          date={newss.date}
        />
      ))}
    </ul>
  );
}

export default NewsList;
