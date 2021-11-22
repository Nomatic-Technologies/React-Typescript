import clsx from "clsx";
import {
  Carousel,
  CarouselItem,
  Col,
  Container,
  Row,
  Button,
  FormGroup,
} from "react-bootstrap";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";
import { config } from "../_shared/constants";
import styleClasses from "./SignUp.module.css";
import bookfishLogo from "../assets/Logo.png";
import facebookLogo from "../assets/brand-logos/facebook-3.svg";
import googleLogo from "../assets/brand-logos/google-icon.svg";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from "formik";
import { accountService } from "../_services";
import React from "react";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  let location = useLocation();
  let history = useHistory();

  const [signingIn, setSigningIn] = React.useState<Boolean>(true);

  const initialValues: FormValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = () => {
    if (signingIn)
      return Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),
      });
    else
      return Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "Passwords must match"
        ),
      });
  };

  const onSubmit = (
    { email, password, confirmPassword }: FormValues,
    { setSubmitting, setStatus }: FormikHelpers<FormValues>
  ) => {
    setSubmitting(true);
    if (signingIn)
      accountService
        .signin(email, password)
        .then(() => {
          const { from } = location.state || { from: { pathname: "/" } };
          history.push(from);
        })
        .catch((error) => {
          setSubmitting(false);
          setStatus("Incorrect Email or Password");
          // alertService.error(error);
        });
    else
      accountService
        .register({ email, password, confirmPassword })
        .then(() => {
          const { from } = {
            from: { pathname: "/onboarding" },
          };
          history.push(from);
        })
        .catch((error) => {
          setSubmitting(false);
          setStatus(
            "User is already registered with this email. Try Signing In instead."
          );
          // alertService.error(error);
        });
  };

  const onFacebookLoginClick = () => {
    const facebookLoginUrl = config.apiUrl + "/auth/facebook";
    window.location.href = facebookLoginUrl;
  };

  const onGoogleLoginClick = () => {
    const googleLoginUrl = config.apiUrl + "/auth/google";
    window.location.href = googleLoginUrl;
  };

  return (
    <div
      className={styleClasses.MainContainer}
      style={{ backgroundColor: "#FFFECB", height: "100vh" }}
    >
      <Container className="col-md-10" style={{ backgroundColor: "white" }}>
        <Row>
          <Col
            md={3}
            className={clsx(
              styleClasses.FeatureCarousel,
              "d-none d-md-flex flex-column"
            )}
          >
            <div className={styleClasses.Logo}>
              <img src={bookfishLogo} alt="logo" width="100%" />
            </div>
            <Carousel
              interval={null}
              indicators
              controls={false}
              className={clsx(styleClasses.CarouselContainer, "flex-grow-1")}
            >
              <CarouselItem>
                <div>
                  <p style={{ color: "#56CCF2", marginTop: "4em" }}>Welcome!</p>
                  <p>
                    BookFish is a project to promote lending and borrowing of
                    books.
                  </p>
                  <p>
                    We also aim to form own community of active book readers
                    here at BookFish.com
                  </p>
                </div>
              </CarouselItem>
              <CarouselItem>Second Caption</CarouselItem>
              <CarouselItem>Third Caption</CarouselItem>
            </Carousel>
          </Col>

          <Col>
            <Row className={styleClasses.SignUpMessage}>
              <div>
                <h3>Sign In</h3>
                <span>to explore all that BookFish has to offer.</span>
              </div>
            </Row>
            <Container className={styleClasses.FormContainer}>
              <Row className="mx-5">
                <Col>
                  {/* Begin Form */}
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {({
                      errors,
                      touched,
                      isSubmitting,
                      status,
                      setStatus,
                      setFieldValue,
                      setFieldTouched,
                    }: FormikProps<FormValues>) => (
                      <>
                        {status && (
                          <div className="mb-lg-15 alert alert-danger">
                            <div className="alert-text font-weight-bold">
                              {status}
                            </div>
                          </div>
                        )}
                        <Form>
                          <Row className="my-3">
                            <FormGroup>
                              <Field
                                name="email"
                                type="email"
                                placeholder="Email"
                                className={clsx(
                                  styleClasses.TextInput,
                                  "form-control",
                                  touched.email && errors.email && "is-invalid"
                                )}
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="invalid-feedback"
                              />
                            </FormGroup>
                            <FormGroup>
                              <Field
                                name="password"
                                type="password"
                                placeholder="Password"
                                className={clsx(
                                  styleClasses.TextInput,
                                  "form-control mt-3",
                                  touched.password &&
                                    errors.password &&
                                    "is-invalid"
                                )}
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="invalid-feedback"
                              />
                            </FormGroup>
                            {signingIn ? null : (
                              <FormGroup>
                                <Field
                                  name="confirmPassword"
                                  type="password"
                                  placeholder="Corfirm Password"
                                  className={clsx(
                                    styleClasses.TextInput,
                                    "form-control mt-3",
                                    touched.password &&
                                      errors.password &&
                                      "is-invalid"
                                  )}
                                />
                                <ErrorMessage
                                  name="confirmPassword"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </FormGroup>
                            )}
                            {signingIn ? (
                              <Button
                                type="submit"
                                disabled={
                                  isSubmitting ||
                                  !!(errors.email && touched.email) ||
                                  !!(errors.password && touched.password)
                                }
                                className={styleClasses.SubmitButton}
                              >
                                Sign In
                              </Button>
                            ) : (
                              <Button
                                type="submit"
                                disabled={
                                  isSubmitting ||
                                  !!(errors.email && touched.email) ||
                                  !!(errors.password && touched.password) ||
                                  !!(
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                  )
                                }
                                className={styleClasses.SubmitButton}
                              >
                                Sign Up
                              </Button>
                            )}
                          </Row>
                        </Form>
                        <Row>
                          <div className={styleClasses.separator}>or</div>
                        </Row>
                        <Row>
                          <div
                            style={{
                              color: "#757575",
                              textAlign: "center",
                              padding: "20px",
                              fontSize: "18px",
                            }}
                          >
                            <span>Continue using</span>
                          </div>
                        </Row>
                        <Row style={{ margin: "10px" }}>
                          <div className={styleClasses.SocialBrandsContainer}>
                            <div onClick={onGoogleLoginClick}>
                              <img
                                src={googleLogo}
                                alt=""
                                className={styleClasses.SocialBrandLogo}
                              />
                            </div>
                            <div onClick={onFacebookLoginClick}>
                              <img
                                src={facebookLogo}
                                alt=""
                                className={styleClasses.SocialBrandLogo}
                              />
                            </div>
                          </div>
                        </Row>
                        <Row
                          className={clsx(styleClasses.SignInMessage, "mt-4")}
                        >
                          <p>
                            {signingIn ? "New" : "Old"} User? Click here to{" "}
                            {
                              <span
                                style={{
                                  cursor: "pointer",
                                  color: "blue",
                                  textDecoration: "underline",
                                }}
                                onClick={() => {
                                  setStatus("");
                                  setFieldValue("email", "");
                                  setFieldTouched("email", false);
                                  setFieldValue("password", "");
                                  setFieldTouched("password", false);
                                  setFieldValue("confirmPassword", "");
                                  setFieldTouched("confirmPassword", false);
                                  setSigningIn(!signingIn);
                                }}
                              >
                                {signingIn ? "sign up" : "sign in"}
                              </span>
                            }
                          </p>
                        </Row>
                      </>
                    )}
                  </Formik>
                  {/* End Form */}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
