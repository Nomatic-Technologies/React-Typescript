import React, { useState } from "react";
import { BsUpload } from "react-icons/bs";
import styleClasses from "../css/GeneralUserInfo.module.css";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { FormFields } from "./Onboarding";
import { FormikProps, Field } from "formik";
import clsx from "clsx";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import { Point, Area } from "react-easy-crop/types";
import { IoCheckmarkSharp } from "react-icons/io5";
import getCroppedImg from "./CropImg";

interface Props {
  onNextButtonClick: () => void;
  formik: FormikProps<FormFields>;
}

export default function GeneralUserInfo(props: Props) {
  const [modalShow, setModalShow] = useState(true);
  const { onNextButtonClick, formik } = props;
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileImg = (event: any) => {
    const reader: any = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.addEventListener("load", () => {
      setSelectedImage(reader.result);
    });
  };

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage: any = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        rotation
      );
      console.log("done", { croppedImage });
      setCroppedImage(croppedImage);
      setModalShow(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container fluid className={styleClasses.MainContainer}>
      <Row style={{ height: "100%" }}>
        <Col md={3} className={styleClasses.Sidebar}>
          <Row style={{ padding: "0 3em" }}>
            <Form.Group>
              <Form.Label style={{ marginBottom: "2em" }}>
                Choose a username for your profile
              </Form.Label>
              <Form.Control
                {...formik.getFieldProps("username")}
                className={clsx(styleClasses.UsernameInput, "shadow-none")}
                type="text"
                name="username"
                isInvalid={formik.touched.username && !!formik.errors.username}
                autoFocus
              />
              {formik.touched.username && formik.errors.username && (
                <div
                  className="invalid-feedback"
                  style={{ textAlign: "center" }}
                >
                  {formik.errors.username}
                </div>
              )}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label style={{ marginBottom: "2em" }}>
                Upload a profile picture
              </Form.Label>
              <Form.Control
                {...formik.getFieldProps("profilePic")}
                type="file"
                accept="image/*"
                id="fileupd"
                name="profilePic"
                style={{ display: "none" }}
                onChange={handleFileImg}
              />
              <Form.Label
                className={styleClasses.ImageUploadBox}
                htmlFor="fileupd"
              >
                {!croppedImage ? (
                  <BsUpload size={30} />
                ) : (
                  <img
                    src={croppedImage}
                    style={{ width: "100%", borderRadius: "50%" }}
                  />
                )}
              </Form.Label>

              {selectedImage && (
                <Modal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Body>
                    <div className={styleClasses.Container}>
                      <div className={styleClasses.Cropcontainer}>
                        <Cropper
                          image={selectedImage}
                          crop={crop}
                          zoom={zoom}
                          rotation={rotation}
                          aspect={1}
                          cropShape="round"
                          showGrid={false}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                          onRotationChange={setRotation}
                        />
                      </div>
                      <div
                        className={styleClasses.Controls}
                        style={{ marginTop: "1%" }}
                      >
                        <span className={styleClasses.Zoomtxt}>Zoom</span>
                        <Slider
                          value={zoom}
                          min={1}
                          max={3}
                          step={0.1}
                          aria-labelledby="Zoom"
                          onChange={(e, zoom) => setZoom(Number(zoom))}
                        />
                      </div>
                      <div className={styleClasses.Controls}>
                        <span className={styleClasses.Zoomtxt}>Rotate</span>
                        <Slider
                          value={rotation}
                          min={0}
                          max={360}
                          step={1}
                          aria-labelledby="Rotation"
                          onChange={(e, rotation) =>
                            setRotation(Number(rotation))
                          }
                        />
                      </div>
                      <button
                        type="button"
                        className={styleClasses.Buttons}
                        onClick={showCroppedImage}
                      >
                        <span className={styleClasses.Textbtn}>Save</span>
                        <IoCheckmarkSharp className={styleClasses.Ticksign} />
                      </button>
                    </div>
                  </Modal.Body>
                </Modal>
              )}
            </Form.Group>
          </Row>
        </Col>

        <Col md={9} className={styleClasses.ContentContainer}>
          <Row className={styleClasses.MessageContainer}>
            Just a few more steps...
          </Row>

          <Row className={styleClasses.FormContainer}>
            <Row style={{ justifyContent: "center" }}>
              <Col md={3} className="me-md-5">
                <Form.Control
                  {...formik.getFieldProps("fullName")}
                  className={styleClasses.InputField}
                  type="text"
                  placeholder="Full Name"
                  isInvalid={
                    formik.touched.fullName && !!formik.errors.fullName
                  }
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <div
                    className="invalid-feedback"
                    style={{ textAlign: "center" }}
                  >
                    {formik.errors.fullName}
                  </div>
                )}
              </Col>
              <Col md={3} className="ms-md-5">
                <Form.Control
                  {...formik.getFieldProps("age")}
                  className={styleClasses.InputField}
                  type="text"
                  placeholder="Age"
                  isInvalid={formik.touched.age && !!formik.errors.age}
                />
                {formik.touched.age && formik.errors.age && (
                  <div
                    className="invalid-feedback"
                    style={{ textAlign: "center" }}
                  >
                    {formik.errors.age}
                  </div>
                )}
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <span style={{ position: "absolute", left: "20%", top: "25%" }}>
                  I am a
                </span>
                <div
                  className={styleClasses.GenderContainer}
                  style={{
                    display: "flex",
                  }}
                >
                  {[
                    "Male",
                    "Female",
                    "Transgender",
                    "Other",
                    "Prefer not to say",
                  ].map((gender, index) => (
                    <div
                      className={clsx(
                        formik.values.gender === gender
                          ? styleClasses.GenderLabelSelected
                          : styleClasses.GenderLabel,
                        styleClasses.GenderDiv
                      )}
                      key={`genderOption#${index}`}
                    >
                      <label>
                        <Field
                          type="radio"
                          name="gender"
                          value={gender}
                          style={{ display: "none" }}
                        />
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Col md={3}>
                <Form.Control
                  {...formik.getFieldProps("region")}
                  className={styleClasses.InputField}
                  type="text"
                  placeholder="Region"
                  isInvalid={formik.touched.region && !!formik.errors.region}
                />
              </Col>
            </Row>
          </Row>

          <Row className={styleClasses.ButtonContainer}>
            <Col xs={2}>
              <Button
                onClick={onNextButtonClick}
                className={styleClasses.NextButton}
                disabled={!formik.isValid}
              >
                Next
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
