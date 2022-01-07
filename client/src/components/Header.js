// import { useLocation } from 'react-router-dom'
import React from 'react';
import Button from './Button';

function Header({ title, onAdd }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color="green"
        text="Add"
        onClick={onAdd}
      />
    </header>
  );
}

Header.defaultProps = {
  title: 'Task Tracker',
};

// Header.propTypes = {
//   title: PropTypes.string.isRequired,
// };

export default Header;
