import { Table, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import BookDataservice from "../services/book.services";

function Booklist({ getBookId }) {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const data = await BookDataservice.getAllBooks();
    console.log(data.docs);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await BookDataservice.deleteBook(id);
    getBooks();
  };

  return (
    <div>
      <div>
        <br />
        <Button variant="danger" onClick={getBooks}>
          Refresh List
        </Button>
      </div>
      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.author}</td>
                <td>{doc.status}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={(e) => getBookId(doc.id)}
                  >
                    EDIT
                  </Button>
                  <Button
                    variant="danger"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Booklist;
