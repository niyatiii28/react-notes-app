import PropTypes from "prop-types";

const Header = ({ handleToggleDarkMode }) => {
  return (
    <div className="header">
      <div className="container">
        <h1>Notes</h1>
        <button
          className="save"
          onClick={() =>
            handleToggleDarkMode((previousDarkMode) => {
              localStorage.setItem("dark-mode", !previousDarkMode);
              return !previousDarkMode;
            })
          }
        >
          Toggle Mode
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {
  handleToggleDarkMode: PropTypes.func.isRequired,
};

export default Header;
