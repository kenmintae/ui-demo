import React from 'react';

import { Button } from 'z-frontend-elements';
import { Flex } from 'zbase';

import { Form } from '../Form';

const options = [
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'semimonthly', label: 'Semi-monthly' },
  { value: 'monthly', label: 'Monthly' },
];

export default () => (
  <Form
    initialValues={{ frequency: '' }}
    validationSchema={{
      frequency: Form.Yup.string().required('Please select a pay frequency.'),
    }}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        actions.setSubmitting(false);
        console.log(values);
      }, 1000);
    }}
  >
    {props => (
      <>
        <Form.RadioGroup name="frequency" label="Pay Frequency">
          {options.map(option => (
            <Form.Radio key={option.value} label={option.label} value={option.value} />
          ))}
        </Form.RadioGroup>
        <Flex justify="flex-end" mt={4}>
          <Button
            type="submit"
            mode="primary"
            inProgress={props.isSubmitting}
            // trigger validation immediately:
            autoFocus
            onFocus={() => props.submitForm()}
          >
            Continue
          </Button>
        </Flex>
      </>
    )}
  </Form>
);
