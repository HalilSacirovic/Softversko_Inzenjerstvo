import { Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <Container>
        <div className="nav_container">
          <div className="logo">
            <h1>E-HUB</h1>
          </div>
          <div className="search_bar">
            <input placeholder="Search for product"></input>
          </div>
          <div className="icons">
            <ul>
              {/* <Link to={"/signup/" + user.id}>Login</Link */}
              <Link to={"/signup"}>Login</Link>
              <li
                onClick={() => {
                  navigate("/signup");
                }}
              >
                User
              </li>
              <li>Favorite</li>
              <li>Admin</li>
              <li>AddProduct</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
