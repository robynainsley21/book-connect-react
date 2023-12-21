import React from "react";
import HomePage from "../pages/Home";
import { useState } from "react";
import { books, authors, genres } from "../data/data";
import ReactDOM from "react-dom";

//MUI components
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const allGenres = genres;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchedBooksLayout = (props) => {
  const {
    bookId,
    bookTitle,
    bookAuthor,
    bookImg,
    bookGenres,
    bookPages,
    bookDescription,
  } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const SearchedBookPreview = () => {
    const handleClose = () => {
      setOpen(false);
    };

    //setting the maximum length for the description
    const maxDescriptionLength = 200;

    //controlling the description overlay
    const [openFullDescription, setOpenFullDescription] = useState(false);
    const handleOpenDescription = () => {
      setOpenFullDescription(true);
    };
    const handleCloseDescription = () => setOpenFullDescription(false);

    //shorten the length of the description text
    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) {
        return text;
      } else {
        return text.slice(0, maxLength) + "...";
      }
    };

    const FullDescription = (props) => {
      const { description, bookTitle, author } = props;
      return (
        <div >
          <p>
            <React.Fragment>
              <Dialog
                open={openFullDescription}
                onClose={handleCloseDescription}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {bookTitle} by {authors[author]}
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
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {bookTitle} by {authors[bookAuthor]}
          </DialogTitle>

          <DialogContent>
            <img
              style={{ width: "5rem", height: "auto" }}
              src={bookImg}
              alt="book-image"
            />

            <p>
              <b>Description:</b>{" "}
              {bookDescription
                ? truncateText(bookDescription, maxDescriptionLength)
                : "No description available"}{" "}
              <button className="styled-button" onClick={handleOpenDescription}>
                Full description
              </button>
            </p>
            <p>
              <b>Genres:</b>{" "}
              {bookGenres
                ? bookGenres.map((genre) => {
                    return <span>{allGenres[genre]} </span>;
                  })
                : ""}{" "}
            </p>

            <p>
              <b>Pages: </b> {bookPages}
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>

      </React.Fragment>
      <FullDescription
          bookTitle={bookTitle}
          author={bookAuthor}
        />
      </>
    );
  };

  return (
    <>
      <button
        onClick={handleClickOpen}
        className="searched-book-button"
        key={bookId}
      >
        <div>
          <img
            className="book-image"
            style={{ width: "5rem" }}
            src={bookImg}
            alt="book-image"
          />
        </div>
        <div className="author-and-title">
          <p style={{ fontWeight: "bold" }}>{bookTitle}</p>
          <p>By {authors[bookAuthor]}</p>
        </div>
      </button>
      <SearchedBookPreview />
    </>
  );
};

const Navbar = (props) => {
  const { allBooks, allAuthors } = props;
  const [searchResults, setSearchResults] = useState([]);

  const bookSearched = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const results = allBooks.filter((book) => {
      const readableAuthorName = allAuthors[book.author]?.toLowerCase() || "";
      const title = book.title.toLowerCase();

      return (
        readableAuthorName.includes(searchTerm) || title.includes(searchTerm)
      );
    });

    setSearchResults(results);
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-logo">
          <a className="logo" href="/">
            <i className="fa-solid fa-b fa-3x"></i>
          </a>
          <p className="logo-name">Book Connect</p>
        </div>
        <div>
          <div className="settings">
            <Search>
              <SearchIconWrapper></SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={bookSearched}
              />
            </Search>
            <button className="settings-item">
              <i className="fa-solid fa-user fa-2x"></i>
            </button>
          </div>
        </div>
      </nav>

      {searchResults.length > 0 && (
        <div>
          <h1 style={{ textAlign: "center", padding: "1rem" }}>
            Searched Books
          </h1>
          <div className="search-container">
            {searchResults.map((book) => (
              <SearchedBooksLayout
                bookId={book.id}
                bookTitle={book.title}
                bookImg={book.image}
                bookAuthor={book.author}
                bookDescription={book.description}
                bookPages={book.pages}
                bookGenres={book.genres}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
