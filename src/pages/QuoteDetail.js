import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHook from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const QuoteDetail = ()=>{
    const params = useParams();
    const match = useRouteMatch();

    const {sendRequest, status, data: quote, error} = useHook(getSingleQuote, true);

    useEffect(()=>{
        sendRequest(params.quoteId);
    }, [sendRequest, params.quoteId]);

    if (status === "pending") {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        )
    }
    
    if (error) {
        return (
            <div className="centered focused">
                {error}
            </div>
        )
    }
    
    if (status === "completed" && !quote) {
        return (
            <div className="centered">
                <h2>No Quote Found!</h2>
            </div>
        )
    }

    return (
        <Fragment>
            <HighlightedQuote text={quote.text} author={quote.author}/>
            <Route path={match.path} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>View Comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    )
}

export default QuoteDetail;