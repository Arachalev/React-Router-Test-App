import QuoteList from "../quotes/QuoteList";
import useHttp from "../../hooks/use-http";
import { getAllQuotes } from "../../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import NoQuotesFound from "../quotes/NoQuotesFound";

export const DUMMY_QUOTES = [
  {
    id: "q1",
    author: "Ubon",
    text: "learning react router",
  },
  {
    id: "q2",
    author: "Abasi",
    text: "becoming a pharmacist",
  },
  {
    id: "q3",
    author: "Nami",
    text: "an architect in the making",
  },
];

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focus">{error}</p>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }
  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
