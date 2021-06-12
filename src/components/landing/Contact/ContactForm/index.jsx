import React, { useContext } from 'react';
import { Formik, Form, FastField, ErrorMessage } from 'formik';
import Recaptcha from 'react-google-recaptcha';
import * as Yup from 'yup';
import { Button, Input } from 'components/common';
import {Error, Center, InputField, Details, ContactFormContainer, InputFieldCaptcha} from './styles';

import addToMailchimp from 'gatsby-plugin-mailchimp'
import { ThemeContext } from 'providers/ThemeProvider';

export default () => {
  const { theme } = useContext(ThemeContext);

  return (

  <Details  theme={theme}>

  <Formik
    initialValues={{
      name: '',
      email: '',
      message: '',
      recaptcha: '',
      success: false,
      error:false
    }}
    validationSchema={Yup.object().shape({
      email: Yup.string()
        .email('Invalid email')
        .required('Email field is required'),
      recaptcha: Yup.string().required('Robots are not welcome yet!'),
    })}
    onSubmit={async ({email }, { setSubmitting, setFieldValue }) => {
      console.log("test")
      const result = await addToMailchimp(email)
      console.log("res",result)
      setSubmitting(false);

      if(result.result!="error") {
        setFieldValue('success', true);
      } else {
        setFieldValue('error', true);
      }
    }}
  >
    {({ values, touched, errors, setFieldValue, isSubmitting }) => (
      <Form>
        <br />
        <h1>Subscribe to our mailing list for updates about our upcoming SHN token launch!</h1>
      <p>No spam. We promise!</p>
      <ContactFormContainer>
        <InputField>
          <Input
            id="email"
            aria-label="email"
            component="input"
            as={FastField}
            type="email"
            name="email"
            placeholder="Email*"
            error={touched.email && errors.email}
            theme={theme}
          />
          <ErrorMessage component={Error} name="email" />
        </InputField>
         <Center>
          <Button type="submit" disabled={isSubmitting}>
            SUBMIT
          </Button>
         </Center>
      </ContactFormContainer>
        {values.email &&  (
          <InputFieldCaptcha>
            <FastField
              component={Recaptcha}
              sitekey={process.env.GATSBY_PORTFOLIO_RECAPTCHA_KEY}
              name="recaptcha"
              onChange={value => setFieldValue('recaptcha', value)}
            />
            <ErrorMessage component={Error} name="recaptcha" />
          </InputFieldCaptcha>
        )}
        {values.success && (
          <InputField>
            <Center>
              <h4>You successfully subscribed to our mailing list, we will keep you posted! </h4>
            </Center>
          </InputField>
        )}
        {values.error && (
          <InputField>
            <Center>
              <h4>An error occurred while trying to subscribe to our mailing list. Please try again later!</h4>
            </Center>
          </InputField>
        )}

      </Form>
    )}
  </Formik>
  </Details>
)};
