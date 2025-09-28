import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./signIn.css";
import { useTranslation } from "react-i18next";
import SignInForm from "./components/signinForm";
import SignUpForm2 from "./components/signUpForm2";
import SignUpForm1 from "./components/signUpForm1";
import i18n from "../../../../i18n";

const SignInDialog = ({ visible, onClose, isCreating: initialIsCreating }) => {
  const [isCreating, setIsCreating] = useState(initialIsCreating);
  const [continueButt, setContinueButt] = useState(false);
  const { t } = useTranslation();

  // Initialize react-hook-form here
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
   useEffect(() => {
    setIsCreating(initialIsCreating);   
  }, [initialIsCreating]);
  // Reset when modal closes
  useEffect(() => {
    if (!visible) {
      reset();
      setContinueButt(false);
    }
  }, [initialIsCreating, visible, reset]);

  if (!visible) return null;

  return (
    <div className="signinDialog">
    <div className="row justify-content-center"> <h4 className="mb-3 text-center">{isCreating ? t("Create Account") : t("sign In")}</h4></div> 

      {!isCreating ? (
        <SignInForm
          onClose={onClose}
          setIsCreating={setIsCreating}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      ) : !continueButt ? (
        <SignUpForm1
          setIsCreating={setIsCreating} 
          setContinueButt={setContinueButt}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      ) : (
        <SignUpForm2
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onClose={onClose}
        />
      )}

      <button
       className={`btn-close position-absolute top-0 m-3 ${i18n.language === "en" ? "end-0" : "start-0"}`}
        onClick={onClose}
      ></button>
    </div>
  );
};

export default SignInDialog;
