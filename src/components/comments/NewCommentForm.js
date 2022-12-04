import { useRef, useState, useEffect } from 'react';
import classes from './NewCommentForm.module.css';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, status } = useHttp(addComment, false);
  const [commentText, setCommentText] = useState();
  const { onAddComment } = props;

  const submitFormHandler = (event) => {
    event.preventDefault();
    sendRequest({
      commentData: commentTextRef.current.value,
      quoteId: props.quoteId
    })
    setCommentText("");
  };

  useEffect(() => {
    if (status==="completed") {
      onAddComment();
    }
  }, [status, onAddComment]);

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      { (status === "pending") && 
                <div className='centered'><LoadingSpinner /></div>
            } 
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef} value={commentText}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;