import { useState } from "react";

const useSignUpForm = (initialValues, onSubmit, status) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: value.trim() === "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFields = Object.keys(errors).filter(
      (key) => userData[key].trim() === ""
    );

    setErrors((prevErrorState) => ({
      ...prevErrorState,
      ...emptyFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
    }));

    if (emptyFields.length > 0) {
      return;
    }
    if (!!status.message) {
      setShowAlert(true);
    }

    await onSubmit(values);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  return {
    userData: values,
    error: errors,
    showAlert,
    handleInput,
    handleSubmit,
    hideAlert,
  };
};

export default useSignUpForm;
