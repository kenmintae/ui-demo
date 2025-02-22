import React, { Component } from 'react';
import _ from 'lodash';
import { getIn, Field, FieldProps } from 'formik';

import CircleButtonArray from '../../circle-button-array/CircleButtonArray';
import FormFieldWrapper, { getErrorId, FormFieldProps } from '../FormFieldWrapper';

type CircleButtonSelectProps = FormFieldProps & {
  /**
   * Should the field function as a checkbox group or a radio group
   *  */
  behavior: 'checkbox' | 'radio';
  /**
   * How many options are being used
   *  */
  numOptions: number;
  /**
   * Is the button disabled?
   *  */
  disabled?: boolean;
};

class FormCircleButtonSelect extends Component<CircleButtonSelectProps> {
  render() {
    const { name, label, containerProps, optional, numOptions, behavior, disabled } = this.props;
    return (
      <Field
        name={name}
        render={({ field, form }: FieldProps) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          let selectedValues: boolean[];

          if (behavior === 'radio') {
            selectedValues = _.range(numOptions).map(i => field.value === i);
          } else {
            selectedValues = field.value || _.range(numOptions).map(i => false);
          }

          const onButtonClick = (dayOfWeekValue: number) => {
            if (behavior === 'radio') {
              form.setFieldValue(name, dayOfWeekValue);
            } else {
              const newSelectedValues = [...selectedValues];
              newSelectedValues[dayOfWeekValue] = !newSelectedValues[dayOfWeekValue];
              form.setFieldValue(name, newSelectedValues);
            }
          };

          return (
            <FormFieldWrapper
              name={name}
              label={label}
              error={error}
              containerProps={containerProps}
              optional={optional}
            >
              <CircleButtonArray
                onButtonClick={onButtonClick}
                behavior={behavior}
                aria-label={typeof label === 'string' ? label : ' '}
                aria-describedby={error ? getErrorId(name) : null}
                selectedValues={selectedValues}
                mb={error ? 2 : 0}
                disabled={disabled}
              >
                {this.props.children}
              </CircleButtonArray>
            </FormFieldWrapper>
          );
        }}
      />
    );
  }
}

export default FormCircleButtonSelect;
