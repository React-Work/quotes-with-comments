import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuote = ()=>{
    const { sendRequest, status } = useHttp(addQuote, false);
    const history = useHistory();
    const addQuoteHandler = (quoteData) => {
        sendRequest(quoteData);
    }

    useEffect(()=>{
        if (status === "completed") {
            history.replace("/quotes");
        }
    }, [status, history])

    return (
        <QuoteForm isLoading={status==="pending"} onAddQuote={addQuoteHandler}/>
    )
}

export default NewQuote;