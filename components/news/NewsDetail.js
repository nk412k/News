import classes from './NewsDetail.module.css';
function NewsDetail(props){
    return(
        <section className={classes.section}>
            <img src={props.image} alt={props.title}></img>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <h4>By {props.author}</h4>
            <h5>on {props.date}</h5>
        </section>
    )
}
export default NewsDetail;