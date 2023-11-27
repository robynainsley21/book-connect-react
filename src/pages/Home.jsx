import { BOOKS_PER_PAGE, authors, genres, books } from "../data/data.jsx";
import { useState } from "react";
import ReactDOM from "react-dom";

// MUI COMPONENTS
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Preview = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#F4F1DE",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Text in a modal
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
              <button onClick={props.handleClose}>close</button>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

const HomePage = () => {
  books.map((book) => console.log(book));
  const [openBook, setOpenBook] = useState(false);

  const openPreview = () => {
    setOpenBook(true);
  };
  const closePreview = () => setOpenBook(false);

  const eachBook = books.map((book) => {
    const { id, author, title, image } = book;

    return (
      <button className="book-button" key={id} onClick={openPreview}>
        <div className="book-image">
          <img style={{ width: "5rem" }} src={image} alt="book-image" />
        </div>

        <div className="author-and-title">
          <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{title}</p>
          <p>{authors[author]}</p>
        </div>
      </button>
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
      {ReactDOM.createPortal(
        openBook && <Preview handleClose={closePreview} />,
        document.body
      )}
    </>
  );
};

export default HomePage;
