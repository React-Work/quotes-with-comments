import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

// const DUMMY_QUOTES = [
//     { id: "q1", author: "Max", text: "Learning HTML5/CSS3" },
//     { id: "q2", author: "Param", text: "Learning React" },
//     { id: "q3", author: "Parminder", text: "Learning Node" },
//     { id: "q4", author: "Meenu", text: "Learning Python" },
// ] 

const AllQuotes = ()=>{
    const {sendRequest, status, data: loadedQuotes, error } = useHttp(getAllQuotes, true);

    useEffect(()=>{
        sendRequest();
    }, [sendRequest]);


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
                <p>{error}</p>
            </div>
        )
    }

    if (status === "completed" && (!Array.isArray(loadedQuotes) || loadedQuotes.length === 0)) {
        return (
            <div className="centered">
                <NoQuotesFound />
            </div>
        )
    }

    return (
        <QuoteList quotes={loadedQuotes} />
    )
}

export default AllQuotes;