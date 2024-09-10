import React from "react";
import { Carousel } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();
  return (
    <div>
      <br />
      <div className="jumbotron text-center">
        <h1 className="display-4">{t("Welcome")}</h1>
        <p className="lead">Make Teaching Notes here</p>
        <a className="btn btn-primary btn-lg" href="/" role="button">
          Make Your Teaching Notes
        </a>
      </div>
      <br />
    </div>
  );
}

export default Home;
