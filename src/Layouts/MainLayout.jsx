const MainLayout = () => {
  return (

      <nav className="nav">
        <div className="nav-logo">
          <a className="logo" href="/">
            <i className="fa-solid fa-b fa-3x"></i>
          </a>
          <p className="logo-name">Book Connect</p>
        </div>
        <div>
        <div className="settings">
            <button className="settings-item"><i className="fa-solid fa-magnifying-glass fa-2x"></i></button>
            <button className="settings-item"><i className="fa-solid fa-user fa-2x"></i></button>
        </div>
        </div>

      </nav>
  );
};

export default MainLayout;
