import React, { Component } from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form } from '../Form';
import FormSubmitter from '../FormSubmitter';

const options = [
  { value: 'beef', label: 'Beef' },
  { value: 'chicken', label: 'Chicken' },
  { value: 'tofu', label: 'Tofu' },
];

const moreOptions = [
  { value: 'fish', label: 'Fish' },
  { value: 'pork', label: 'Pork' },
  { value: 'seitan', label: 'Seitan' },
];

// NOTE: this one is deprecated in favour of Form.CheckboxGroup, which has better support for arrays
storiesOf('forms|Form.CheckboxGroupDeprecated', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultExample />)
  .add('with label', () => <LabelExample />)
  .add('with validation', () => <ValidationExample />);

class DefaultExample extends Component {
  render() {
    return (
      <Form
        onSubmit={() => {}}
        initialValues={{
          beef: false,
          chicken: false,
          tofu: false,
        }}
      >
        <Form.CheckboxGroupDeprecated>
          {options.map(option => (
            <Form.Checkbox key={option.value} name={option.value} label={option.label} />
          ))}
        </Form.CheckboxGroupDeprecated>
      </Form>
    );
  }
}

class LabelExample extends Component {
  render() {
    return (
      <Form
        onSubmit={() => {}}
        initialValues={{
          beef: false,
          chicken: true,
          tofu: true,
          fish: false,
          pork: true,
          seitan: false,
        }}
      >
        <Form.CheckboxGroupDeprecated label="Proteins">
          {options.map(option => (
            <Form.Checkbox key={option.value} name={option.value} label={option.label} />
          ))}
        </Form.CheckboxGroupDeprecated>
        <Form.CheckboxGroupDeprecated label="More Proteins" optional>
          {moreOptions.map(option => (
            <Form.Checkbox key={option.value} name={option.value} label={option.label} />
          ))}
        </Form.CheckboxGroupDeprecated>
      </Form>
    );
  }
}

class ValidationExample extends Component {
  render() {
    return (
      <Form
        onSubmit={() => {}}
        initialValues={{
          beef: false,
          chicken: false,
          tofu: false,
        }}
        validationSchema={{
          beef: Form.Yup.boolean(),
          chicken: Form.Yup.boolean(),
          tofu: Form.Yup.boolean().when(['beef', 'chicken'], {
            // NOTE: showing an error on the last option (tofu) for purely cosmetic reasons.
            // In most cases, you would say one of an array must be selected
            is: (beef: boolean, chicken: boolean) => !beef && !chicken,
            then: Form.Yup.boolean().oneOf([true], 'You must choose at least one protein.'),
          }),
        }}
      >
        {props => (
          <>
            <Form.CheckboxGroupDeprecated label="Proteins">
              {options.map(option => (
                <Form.Checkbox key={option.value} name={option.value} label={option.label} />
              ))}
            </Form.CheckboxGroupDeprecated>
            {/* submit on load for visual testing only */}
            <FormSubmitter submitForm={props.submitForm} />
          </>
        )}
      </Form>
    );
  }
}
