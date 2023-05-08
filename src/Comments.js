import { useData } from './data';

const Comments = () => {
  const comments = useData();
  return(
    <>{comments && comments.map((comment, i) => (<p className="comment" key={i}>{comment}</p>))}</>
  );
};
export default Comments;
