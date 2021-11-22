import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import GeneralUserInfo from "./GeneralUserInfo";
import GenreSelection from "./GenreSelection";

export interface FormFields {
  username: string;
  profilePic: string;
  fullName: string;
  age: number | "";
  gender: "Male" | "Female" | "Transgender" | "Other" | "Prefer not to say";
  region: string;
  genres: string[];
}

const renderStepContent = (
  activeStep: number,
  formikProps: FormikProps<FormFields>,
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
) => {
  switch (activeStep) {
    case 0:
      return (
        <GeneralUserInfo
          formik={formikProps}
          onNextButtonClick={() => {
            setActiveStep((previousState) =>
              previousState < 1 ? previousState + 1 : previousState
            );
          }}
        />
      );
    case 1:
      return (
        <GenreSelection
          formik={formikProps}
          onPreviousButtonClick={() =>
            setActiveStep((previousState) =>
              previousState > 0 ? previousState - 1 : previousState
            )
          }
          onFinishButtonClick={() => {
            formikProps.submitForm()
          }}
        />
      );
    default:
      return null;
  }
};

const Onboarding = () => {
  const [activeStep, setActiveStep] = useState(0);

  const initialValues: FormFields = {
    age: "",
    fullName: "",
    gender: "Prefer not to say",
    genres: [],
    profilePic: "",
    region: "",
    username: "",
  };

  const validationSchema = [
    Yup.object().shape({
      username: Yup.string().required("Username is required"),
      profilePic: Yup.string(),
      fullName: Yup.string().required("Full Name is required"),
      age: Yup.number().required("Age is required"),
      gender: Yup.string(),
      region: Yup.string(),
    }),
    Yup.object().shape({
      genres: Yup.array(Yup.string()),
    }),
  ];

  const currentValidationSchema = validationSchema[activeStep];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={currentValidationSchema}
    >
      {(formikProps: FormikProps<FormFields>) => (
        <Form>{renderStepContent(activeStep, formikProps, setActiveStep)}</Form>
      )}
    </Formik>
  );
};

export default Onboarding;
