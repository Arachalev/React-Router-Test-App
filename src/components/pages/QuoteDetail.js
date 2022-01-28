import { useParams, Outlet, Link, Routes, Route } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { DUMMY_QUOTES } from "./AllQuotes";
import HighlightedQuote from "../quotes/HighlightedQuote";
import useHttp from "../../hooks/use-http";
import { getSingleQuote } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const QuoteDetail = () => {
  let { quoteId } = useParams();

  // let quoteText, quoteAuthor;
  // quoteText = "No quotes found";
  // quoteAuthor = " ";
  // DUMMY_QUOTES.forEach((el) => {
  //   if (quoteId === el.id) {
  //     quoteText = el.text;
  //     quoteAuthor = el.author;
  //   }
    //  else {
    //   quoteText = "No quotes found";
    //   quoteAuthor = " ";
    // }
  // });

  // const quote = DUMMY_QUOTES.find((quote) => quote.id === quoteId);


  const {sendRequest, status, data:loadedQuote, error} =  useHttp(getSingleQuote, true)

  useEffect(()=>{
    sendRequest(quoteId)
  },[sendRequest, quoteId])

  if(status=== 'pending')
  {
    return <div className="centered"><LoadingSpinner/></div>
  }
  if(error)
  {
    return <p className="centered">{error}</p>
  }
  if(!loadedQuote.text)
  {
    return <p>No Quote Found</p>
  }

  return (
    <Fragment>
      {/* <HighlightedQuote text = {quote.text} author = {quote.author}/> */}
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Routes>
        <Route
          path={'/'}
          element={
            <div className="centered">
              <Link to={"comments"} className="btn--flat">
                Load Comments
              </Link>
            </div>
          }
        />
      </Routes>

      <Outlet />
    </Fragment>
  );
};

export default QuoteDetail;
