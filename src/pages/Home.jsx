import React from "react";
import { BOOKS_PER_PAGE, authors, genres, books } from "../data/data.jsx";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Navbar from "../components/navbar";

// MUI COMPONENTS
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const allGenres = genres;
const allAuthors = authors;

//shorten the length of the description text
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + "...";
  }
};

const Preview = (props) => {
  const { handleClose, chosenBook } = props;
  const { id, title, image, genres, author, description, pages, published } =
    chosenBook;

  //setting the maximum length for the description
  const maxDescriptionLength = 200;

  //controlling the description overlay
  const [openFullDescription, setOpenFullDescription] = useState(false);
  const handleOpenDescription = () => {
    setOpenFullDescription(true);
  };
  const handleCloseDescription = () => setOpenFullDescription(false);

  const FullDescription = (props) => {
    const { description, bookTitle, author } = props;
    return (
      <div className="full-description">
        <p>
          <React.Fragment>
            <Dialog
              open={openFullDescription}
              onClose={handleCloseDescription}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {bookTitle} by {allAuthors[author]}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <p>{description}</p>
                </DialogContentText>
              </DialogContent>
              <DialogActions
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  style={{ backgroundColor: "#81B29A", color: "inherit" }}
                  onClick={handleCloseDescription}
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </p>
      </div>
    );
  };

  return (
    <>
      <div
        key={id}
        className="preview-overlay"
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1rem",
          }}
        >
          <button className="styled-button" onClick={handleClose}>
            Close
          </button>
        </div>
        <Box style={{ overflow: "auto", maxHeight: "80vh" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <p style={{ textAlign: "center", width: '80%' }}>{title ? title : Title} </p>

            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "1rem",
              }}
            >
              <img style={{ width: "7rem" }} src={image} alt="preview-image" />
            </div>
            <p style={{ textAlign: "center" }}>
              {author ? allAuthors[author] : 'Author'}
            </p>
            <div className="preview-description">
              <Typography
                style={{ width: "80%" }}
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                <p>
                  <b>Description:</b>{" "}
                  {description
                    ? truncateText(description, maxDescriptionLength)
                    : "No description available"}{" "}
                  <button
                    className="styled-button"
                    onClick={handleOpenDescription}
                  >
                    Full description
                  </button>
                </p>
                <p style={{ marginTop: "1rem" }}>
                  <b>Genres:</b>{" "}
                  {genres
                    ? genres.map((genre) => {
                        return <span>{allGenres[genre]} </span>;
                      })
                    : None}
                </p>
                <p style={{ marginTop: "1rem" }}>
                  <b>Published:</b> {new Date(published).toLocaleDateString()}
                </p>
                <p style={{ marginTop: "1rem" }}>
                  <b>Pages:</b> {pages}
                </p>
              </Typography>
            </div>
          </Typography>
        </Box>
      </div>
      <FullDescription
        description={description}
        bookTitle={title}
        author={author}
      />
    </>
  );
};

const HomePage = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [openBook, setOpenBook] = useState(false);

  const practiceString = 'practice string'

  const closePreview = () => {
    setOpenBook(false);
    setSelectedBook(null);
  };

  const extractedBooks = books.slice(0, 20);
  const eachBook = extractedBooks.map((book) => {
    if (!book) return null;
    const { id, author, title, image } = book;

    const openPreview = () => {
      setSelectedBook(book);
      setOpenBook(true);
    };

    return (
      <div key={id}>
        <button className="book-button" onClick={openPreview}>
          <div className="book-image">
            <img style={{ width: "5rem" }} src={image} alt="book-image" />
          </div>

          <div className="author-and-title">
            <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{title}</p>
            <p>{authors[author]}</p>
          </div>
        </button>

        {selectedBook && openBook && selectedBook.id === book.id && (
          <Preview handleClose={closePreview} chosenBook={book} />
        )}
      </div>
    );
  });

  return (
    <>
    <Navbar 
      allBooks={books}  
      allAuthors={allAuthors}  
    />
      <div className="homePage">
        <h1 style={{textAlign: 'center', margin: '1rem'}}>All Books</h1>
        {eachBook ? (
          <div className="books-container" key={eachBook.id}>
            {eachBook}
          </div>
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
