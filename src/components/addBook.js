import { ButtonGroup, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import BookDataservice from "../services/book.services";

function AddBook({ id, setBookId }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Available");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || author === "") {
      setMessage({ error: true, msg: "All fields are mandatory" });
      return;
    }
    const newBook = {
      title,
      author,
      status
    };
    console.log(newBook);
    try {
      if (id !== undefined && id !== "") {
        setBookId("");
        await BookDataservice.updateBook(id, newBook);
        setMessage({ error: false, msg: "Updated Successfully" });
      } else {
        await BookDataservice.addBooks(newBook);
        setMessage({ error: false, msg: "New Book Added Successfully" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setAuthor("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await BookDataservice.getBook(id);
      setTitle(docSnap.data().title);
      setAuthor(docSnap.data().author);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id is here", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);

  return (
    <div>
      {message?.msg && (
        <Alert
          varient={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => setMessage("")}
        >
          {message?.msg}
        </Alert>
      )}
      <input
        className="title"
        type="text"
        name="title"
        placeholder="  Book Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <br />
      <input
        className="author"
        type="text"
        name="author"
        placeholder="  Book Author"
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
      />
      <br />
      <br />
      <ButtonGroup aria-label="Basic example">
        <Button
          variant="success"
          onClick={(e) => {
            setStatus("Available");
          }}
        >
          Available
        </Button>
        <Button
          variant="danger"
          onClick={(e) => {
            setStatus("Not Available");
          }}
        >
          Not available
        </Button>
      </ButtonGroup>
      <br />
      <button onClick={handleSubmit}>Add / Update</button>
    </div>
  );
}

export default AddBook;
