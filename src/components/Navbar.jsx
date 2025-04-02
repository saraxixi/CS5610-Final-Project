import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <header className='navbar'>
      <div className='navbar-container'>
        <nav className='navbar-menu'>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/studies">Studies</Link></li>
            <li><Link to="/history">History</Link></li>

            <li className="dropdown">
                <Link to="/mural">Mural</Link>
                <ul className='dropdown-menu'>
                  <li><Link to="/mural/animal">Animal</Link></li>
                  <li><Link to="/mural/dance">Dance</Link></li>
                  <li><Link to="/mural/architecture">Architecture</Link></li>
                  <li><Link to="/mural/flying">Flying</Link></li>
                </ul>
            </li>
            <li><Link to="/document">Document</Link></li>
            <li><Link to="/creation">Creation</Link></li>
          </ul>
        </nav>

        <div className='navbar-right'>
          <input type="text" placeholder='search' className='search-box'/>
          {localStorage.getItem("userId") ? (
            <>
            <span style={{ marginRight: '10px' }}>
              Welcome, {localStorage.getItem("userRole")}
              </span>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
                className="login-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className='login-btn'>Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;