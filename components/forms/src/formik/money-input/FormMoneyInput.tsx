import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';

import FormFieldWrapper, { getErrorId, getLabelId, FormFieldProps } from '../FormFieldWrapper';
import MoneyInput, { MoneyInputProps } from '../../money-input/MoneyInput';

type FormMoneyInputProps = MoneyInputProps & FormFieldProps;

class FormMoneyInput extends Component<FormMoneyInputProps> {
  render() {
    const { name, label, containerProps, optional, ...rest } = this.props;
    return (
      <Field
        name={name}
        render={({ field, form }: FieldProps) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          return (
            <FormFieldWrapper
              name={name}
              label={label}
              error={error}
              containerProps={containerProps}
              optional={optional}
            >
              <MoneyInput
                id={name}
                {...field}
                {...rest}
                hasError={Boolean(error)}
                aria-labelledby={getLabelId(name)}
                aria-describedby={error ? getErrorId(name) : null}
                mb={0}
              />
            </FormFieldWrapper>
          );
        }}
      />
    );
  }
}

export default FormMoneyInput;
