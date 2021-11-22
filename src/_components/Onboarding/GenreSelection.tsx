import React, { useState } from "react";
import { BsUpload } from "react-icons/bs";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Constants } from "../../_shared/constants";
import styleClasses from "../css/GenreSelection.module.css";
import { Link } from "react-router-dom";
import { FormFields } from "./Onboarding";
import { Field, Formik, FormikProps } from "formik";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { accountService } from "../../_services";

interface Props {
  onPreviousButtonClick: () => void;
  onFinishButtonClick: () => void;
  formik: FormikProps<FormFields>;
}

export default function GeneralUserInfo(props: Props) {
  let history = useHistory();
  const { onFinishButtonClick, onPreviousButtonClick, formik } = props;

  return (
    <Container fluid className={styleClasses.MainContainer}>
      <Row style={{ height: "100%" }}>
        <Col md={3} className={styleClasses.Sidebar}>
          <Row>
            <div>
              <div className={styleClasses.ImageUploadBox}>
                <img
                  src="https://images.generated.photos/vf4EbFkqsd1nRnawWSzEXfeX3lXYMSOuEm9QbyF-oKw/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTkxNjk5LmpwZw.jpg"
                  style={{ width: "100%", borderRadius: "50%" }}
                />
              </div>
              <div
                style={{
                  marginTop: "1.5em",
                  fontSize: "x-large",
                  color: "#56ccf2",
                }}
              >
                <span>{formik.values.fullName}</span>
              </div>
            </div>
            {formik.values.region && (
              <div style={{ marginTop: "4em" }}>
                <span>from {formik.values.region}</span>
              </div>
            )}
          </Row>
        </Col>

        <Col md={9} className={styleClasses.ContentContainer}>
          <Row className={styleClasses.TitleContainer}>
            <h1>Select the genres you like.</h1>
            <p>This will help us personalize the website to your preferences</p>
          </Row>

          <Row className={styleClasses.GenresContainer}>
            {Constants.genres.map((genre, index) => (
              <div
                className={clsx(
                  styleClasses.GenrePill,
                  formik.values.genres.includes(genre.value) &&
                    styleClasses.GenrePillSelected
                )}
                key={`genreOption#${index}`}
              >
                <label>
                  <Field
                    type="checkbox"
                    name="genres"
                    value={genre.value}
                    style={{ display: "none" }}
                  />
                  {genre.label}
                </label>
              </div>
            ))}
          </Row>

          <Row className={styleClasses.ButtonContainer}>
            <div className={styleClasses.SkipLinkContainer}>
              <Link to="#">
                <span style={{ display: "block" }}>Skip for now</span>
              </Link>
              <span style={{ color: "#828282" }}>
                (You can edit these later)
              </span>
            </div>
            <Button
              onClick={onPreviousButtonClick}
              className={styleClasses.PreviousButton}
            >
              Previous
            </Button>
            <Button
              onClick={onFinishButtonClick}
              className={styleClasses.FinishButton}
            >
              Finish
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
