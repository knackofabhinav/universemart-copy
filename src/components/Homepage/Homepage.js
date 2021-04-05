import { Link } from "react-router-dom";
import Banner from "../../assets/Banner/Banner.jpg";
import Banner2 from "../../assets/Banner/banner2.jpg";
import Banner3 from "../../assets/Banner/banner3.jpg";
import Banner4 from "../../assets/Banner/banner4.jpg";
import "./Homepage.css";
import { useTheme } from "../../contexts/theme-context";
export const Homepage = () => {
  const {
    theme: { dark, light },
    isDark,
  } = useTheme();
  return (
    <div class="homepage-container" style={isDark ? dark : light}>
      <Link to="/products">
        <img className="banner" src={Banner} alt="banner" />
      </Link>
      <div className="grid-2">
        <Link to="/products">
          <img className="banner-grid" src={Banner2} alt="banner" />
        </Link>
        <Link to="/products">
          <img className="banner-grid" src={Banner3} alt="banner" />
        </Link>
      </div>
      <Link to="/products">
        <img className="banner" src={Banner4} alt="banner" />
      </Link>
    </div>
  );
};
