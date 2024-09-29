import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>وبلاگ ریداکسی من </h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/" className="button">
              خانه
            </Link>
            <Link to="/authors" className="button">
              نویسندگان
            </Link>
          </div>
        </div>
      </section>
    </nav>
  );
};
export default Navbar;
