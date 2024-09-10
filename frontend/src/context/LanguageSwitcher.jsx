import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export default LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const getLanguageName = (code) => {
    switch (code) {
      case "en":
        return "English";
      case "id":
        return "Indonesia";
      default:
        return code;
    }
  };

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="userDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <FontAwesomeIcon icon={faGlobe} style={{ marginRight: "8px" }} />
        <span>
          <strong>{getLanguageName(i18n.language)}</strong>
        </span>
      </a>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="userDropdown"
        style={{ marginLeft: "-1rem", maxWidth: "fit-content" }}
      >
        <li>
          <Link className="dropdown-item" onClick={() => changeLanguage("id")}>
            Indonesia
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" onClick={() => changeLanguage("en")}>
            English
          </Link>
        </li>
      </ul>
    </li>
  );
};
