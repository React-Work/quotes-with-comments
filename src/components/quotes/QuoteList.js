import { Fragment } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending= true) => {
  quotes.sort((quoteA, quoteB)=> {
    if (ascending) {
      return quoteA.author > quoteB.author ? 1 : -1;
    } 
    return quoteB.author > quoteA.author ? 1: -1;
  })
}


const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const isSortingAscending = (queryParams.get("sort") === "asc");
  
  sortQuotes(props.quotes, isSortingAscending);
  const changeSortingHandler = () =>{
    history.push({
      pathname: location.pathname,
      search: `sort=${isSortingAscending ? "desc" : "asc"}`
    });
  }
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>Sort {isSortingAscending ? "Decending" : "Ascending"}</button>
      </div>
      <ul className={classes.list}>
        {props.quotes.map((quote) => (
          <QuoteItem
            key={quote.id} 
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
