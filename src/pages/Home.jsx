import { BOOKS_PER_PAGE, authors, genres, books } from "../data/data.jsx";

const HomePage = () => {
  books.map((book) => console.log(book));
  const eachBook = 
    books.map((book) => {
      const { id, author, title, image } = book;

      return (
        <button key={id}>
          <div>
            <div>
              <p>Author: {author}</p>
              <p>Title: {title}</p>
            </div>
            <div>
              <img src={image} alt="book-image" />
            </div>
          </div>
        </button>
      );
    });


  return (
    <div className="homePage">
      <p>this is the home page</p>
      <div>{eachBook}</div>
    </div>
  );
};

export default HomePage;
