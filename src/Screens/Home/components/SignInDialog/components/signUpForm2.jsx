import React from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../../../redux/userRedux/userSlice';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import i18n from '../../../../../i18n';

function SignUpForm2({ register, handleSubmit, errors, onClose }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSignUp = async (data) => {
    let result = await dispatch(
      registerUser({
        firstName: data['firstName'].toString(),
        lastName: data['lastName'].toString(),
        phoneNumber: data['phone'].toString(),
        email: data['email'].toString(),
        password: data['password'].toString(),
        dayOfBirth: 0,
        monthOfBirth: 0,
        postalCode: "",
      })
    );

    if (registerUser.fulfilled.match(result)) {
         const user = result.payload; 
         localStorage.setItem('authToken', user.token);
         localStorage.setItem('user', JSON.stringify(user));
   
         if (user?.userName === 'admin user') {
           navigate('/Dashboard');
           return;
         }
   
         toast.success('Logged in successfully');
         onClose?.();
       } else {
         toast.error(result.payload?.message || "Something went wrong");
       }
     
  };

  return (
    <form onSubmit={handleSubmit(onSignUp)}>
      <h5>{t('Beauty Insider')}</h5>
      <p>
        {t(
          'Join the Beauty Insider loyalty program. Earn points, get FREE standard shipping, redeem rewards, and more.'
        )}
      </p>

      {/* First + Last Name */}
      <div className="d-flex flex-row gap-2">
        <input
          type="text"
          className="form-control mb-2"
          placeholder={t("First Name")}
          {...register("firstName", {
            required: "First name is required",
            minLength: { value: 2, message: "At least 2 characters" },
            pattern: { value: /^[A-Za-zأ-ي]+$/, message: "Only letters allowed" },
          })}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder={t("Last Name")}
          {...register("lastName", {
            required: "Last name is required",
            minLength: { value: 2, message: "At least 2 characters" },
            pattern: { value: /^[A-Za-zأ-ي]+$/, message: "Only letters allowed" },
          })}
        />
      </div>
      {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
      {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}

      {/* Email */}
      <input
        type="email"
        className="form-control mb-2"
        placeholder="Email Address"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        })}
      />
      {errors.email && <p className="text-danger">{errors.email.message}</p>}

      {/* Password */}
      <input
        type="password"
        className="form-control mb-2"
        placeholder={t("Password (8–20 characters)")}
        {...register("password", {
          required: "Password is required",
          minLength: { value: 8, message: "Password must be at least 8 characters" },
          maxLength: { value: 20, message: "Password must not exceed 20 characters" },
          validate: {
            hasUppercase: (value) =>
              /[A-Z]/.test(value) || "Must contain at least one uppercase letter",
            hasLowercase: (value) =>
              /[a-z]/.test(value) || "Must contain at least one lowercase letter",
            hasNumber: (value) =>
              /\d/.test(value) || "Must contain at least one number",
            hasSpecialChar: (value) =>
              /[@$!%*?&]/.test(value) || "Must contain at least one special character (@$!%*?&)",
          },
        })}
      />
      {errors.password && <p className="text-danger">{errors.password.message}</p>}

      {/* Phone Number */}
      <input
        type="tel"
        className={`form-control mb-2 ${i18n.language === "ar" ? "text-end" : "text-start"}`}
        placeholder={t("Phone Number")}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        {...register("phone", {
          required: "Phone number is required",
          pattern: {
            value: /^[0-9]+$/,
            message: "Only numbers are allowed",
          },
          minLength: { value: 11, message: "Phone must be 11 digits" },
          maxLength: { value: 15, message: "Phone must not exceed 15 digits" },
        })}
      />
      {errors.phone && <p className="text-danger">{errors.phone.message}</p>}

      <button type="submit" className="btn btn-dark w-100 py-2 buttonrounded mb-3">
        {t("Join Now")}
      </button>
    </form>
  );
}

export default SignUpForm2;
