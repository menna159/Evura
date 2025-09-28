import React from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../../../redux/userRedux/userSlice';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function SignInForm({ onClose, setIsCreating, register, handleSubmit, errors }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSignIn = async (data) => {
    const result = await dispatch(loginUser({ email: data.email, password: data.password }));

    if (loginUser.fulfilled.match(result)) {
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
    <form onSubmit={handleSubmit(onSignIn)}>
      <p>{t("Sign in or create an account to enjoy FREE standard shipping on all orders")}</p>

      {/* Email field */}
      <input
        type="email"
        className="form-control mb-2"
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
            message: "Enter a valid email address"
          }
        })}
      />
      {errors.email && <p className="text-danger">{errors.email.message}</p>}

      {/* Password field */}
      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters"
          },
          maxLength: {
            value: 20,
            message: "Password must not exceed 20 characters"
          },
          validate: {
            hasUppercase: (value) =>
              /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
            hasLowercase: (value) =>
              /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
            hasNumber: (value) =>
              /\d/.test(value) || "Password must contain at least one number",
            hasSpecialChar: (value) =>
              /[@$!%*?&]/.test(value) || "Password must contain at least one special character (@$!%*?&)",
          }
        })}
      />
      {errors.password && <p className="text-danger">{errors.password.message}</p>}

      <p>{t('By clicking “Sign In”, you agree to the TERMS OF USE, and EVURA Privacy Policy')}</p>
      <button type="submit" className="btn btn-dark py-2 buttonrounded mb-3">{t("sign In")}</button>
      <hr />
      <p className="fw-bold">{t('New to EVURA?')}</p>
      <button
        type="button"
        className="btn btn-outline-dark py-2 buttonrounded"
        onClick={() => setIsCreating(true)}
      >
        {t('Create Account')}
      </button>
    </form>
  );
}

export default SignInForm;
