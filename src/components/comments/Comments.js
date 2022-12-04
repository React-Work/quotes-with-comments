import { useState, useCallback } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

const Comments = () => {
  const { sendRequest, status, data: loadedComments, error } = useHttp(getAllComments, false);
  const params = useParams();
  const { quoteId } = params
  const [isAddingComment, setIsAddingComment] = useState(false);

  useEffect(()=>{
    sendRequest(quoteId);
  }, [sendRequest, quoteId])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  
  const commentAdditionHandler = useCallback(
    ()=> {
      setIsAddingComment(false);
      sendRequest(quoteId);
    },
    [sendRequest, setIsAddingComment, quoteId],
  );
   
  let comments;
  if (status === "pending") {
    comments = <div className='centered'> <LoadingSpinner /> </div>;
  } else if (error) {
    comments = <div className='centered focused'> <p>Error while fetching comments!</p> </div>;
  } else if (!Array.isArray(loadedComments) || loadedComments.length === 0) {
    comments = <p className='centered'>No Comments...</p> 
  } else {
    loadedComments.reverse();
    comments = <CommentsList comments= {loadedComments}/>;
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddComment={commentAdditionHandler} />}
      { comments }
    </section>
  );
};

export default Comments;
