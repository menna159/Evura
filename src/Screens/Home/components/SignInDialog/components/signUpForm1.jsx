import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

function SignUpForm1({ setContinueButt,register,handleSubmit ,errors,setIsCreating}) {
  
    const onCreateAccountStep1 = (data) => {
    setContinueButt(true);
  };
   const {t}=useTranslation();
  return (
    <form onSubmit={handleSubmit(onCreateAccountStep1)}>
          <h5>{t('Beauty Insider')}</h5>
          <p>{t('Join the Beauty Insider loyalty program. Earn points, get FREE standard shipping, redeem rewards, and more.')}</p>

          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}

          <button type="submit" className="btn btn-dark py-2 buttonrounded mb-3">
           {t('Continue')}
          </button>
          <hr />
          <p className="mb-3 fw-bold" style={{ fontSize: '0.9rem' }}>
            {t('Already have an account')}
          </p>
          <button
            type="button"
            className="btn btn-outline-secondary py-2 buttonrounded"
            onClick={() =>{ 
              
              setIsCreating(false)}}
          >
            {t('sign In')}
          </button>
        </form>
  )
}

export default SignUpForm1