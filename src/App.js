import "./styles.css";
import Booklist from "./components/bookList";
import AddBook from "./components/addBook";
import { useState } from "react";

export default function App() {
  const [bookId, setBookId] = useState("");
  const getBookIdHandler = (id) => {
    console.log("The Id of the document to be edited:", id);
    setBookId(id);
  };

  return (
    <div className="App">
      <AddBook id={bookId} setBookId={setBookId} />

      <Booklist getBookId={getBookIdHandler} />
    </div>
  );
}
