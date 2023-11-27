import { BOOKS_PER_PAGE, authors, genres, books } from "../data/data.jsx";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// MUI COMPONENTS
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Preview = (props) => {
  const { handleClose, chosenBook } = props;
  // console.log(chosenBook)
  return (
    <>
      {/* <Modal>
    <div className="preview-overlay" key={chosenBook.id}>
        <div>
          <p>{chosenBook.title}</p>
          <p>{chosenBook.popularity}</p>
        </div>
        <button onClick={handleClose}>Close</button>
      </div>
    </Modal> */}
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
        <button onClick={handleClose}>Close</button>
      </Modal>
    </>
  );
};

const HomePage = () => {
  // books.map((book) => console.log(book));
  const [selectedBook, setSelectedBook] = useState(null);
  const [openBook, setOpenBook] = useState(false);

  const closePreview = () => {
    setOpenBook(false);
    setSelectedBook(null);
  };

  const extractedBooks = books.slice(0, 20);
  const eachBook = extractedBooks.map((book, index) => {
    if (!book) return null;
    const { id, author, title, image } = book;

    const openPreview = () => {
      setSelectedBook(book);
      setOpenBook(true);
    };

    return (
      <>
        <button className="book-button" key={id} onClick={openPreview}>
          <div className="book-image">
            <img style={{ width: "5rem" }} src={image} alt="book-image" />
          </div>

          <div className="author-and-title">
            <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{title}</p>
            <p>{authors[author]}</p>
          </div>
        </button>

        {selectedBook && openBook && (
          <Preview handleClose={closePreview} chosenBook={book} />
        )}
      </>
    );
  });

  return (
    <>
      <div className="homePage">
        {eachBook ? (
          <div className="books-container">{eachBook}</div>
        ) : (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </div>
    </>
  );
};

export default HomePage;
