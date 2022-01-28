import QuoteForm from "../quotes/QuoteForm";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { addQuote } from "../../lib/api";
import { useEffect } from "react";

const NewQuotes = () => {
  const navigate = useNavigate();
  const {sendRequest, status} = useHttp(addQuote);
  useEffect(()=>
  {
      if(status === 'completed')
      {
        navigate('/quotes')
      }

  },[status, navigate])
  const addAddQuoteHandler = (quoteData) => {
      sendRequest(quoteData)
    console.log(quoteData);
    navigate("/quotes");
  };

  return <QuoteForm onAddQuote={addAddQuoteHandler} isLoading = {status === 'pending'} />;
};

export default NewQuotes;
