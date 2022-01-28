import { useState, useEffect ,useCallback} from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from './CommentsList'

const Comments = () => {
  let comments;
  const [isAddingComment, setIsAddingComment] = useState(false);

  const { quoteId } = useParams();

  const { sendRequest, data: loadedComments, status } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId)
  },[sendRequest, quoteId]);

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if(status === 'completed' && (loadedComments && loadedComments.length>0))
  {
    comments = <CommentsList comments = {loadedComments}/>
  }

  if(status === 'completed' && (!loadedComments || loadedComments.length === 0))
  {
    comments = <p className="centered">No Comments Were Added Yet</p>

  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComments={addedCommentHandler}
        />
      )}
      <div>{comments}</div>
    </section>
  );
};

export default Comments;
