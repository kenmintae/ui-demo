import React from 'react';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import MaskedInput from './MaskedInput';
import { postalCodes } from '../formik/masked-input/masks';

describe('MaskedInput', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<MaskedInput mask={[]} />)).toHaveLength(1);
  });

  it('should support mask prop as array', () => {
    const wrapper = mountWithTheme(
      <MaskedInput
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        defaultValue="9093900003"
      />,
    );

    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('(909) 390-0003');
  });

  describe('should support mask prop as function', () => {
    function maskFunction(rawValue: string) {
      const getUsernameRegex = (username: string) => username.split('').map(() => /\w|[.+]/ as string | RegExp);
      if (rawValue.includes('@')) {
        return false;
      }

      return getUsernameRegex(rawValue).concat('@gmail.com'.split(''));
    }

    it('should apply the mask when a mask array is returned', () => {
      expect(
        (mountWithTheme(<MaskedInput mask={maskFunction} defaultValue="foobar" />).getDOMNode() as HTMLInputElement)
          .value,
      ).toBe('foobar@gmail.com');
    });

    it('should not apply the mask when false is returned', () => {
      expect(
        (mountWithTheme(<MaskedInput mask={maskFunction} defaultValue="foobar@" />).getDOMNode() as HTMLInputElement)
          .value,
      ).toBe('foobar@');
    });
  });

  describe('postal codes', () => {
    function setup(country: string, value: string) {
      return (mountWithTheme(
        <MaskedInput mask={(postalCodes as any)[country]} defaultValue={value} />,
      ).getDOMNode() as HTMLInputElement).value;
    }

    it('should support US zip 9', () => {
      expect(setup('US', '123456789')).toBe('12345-6789');
    });
    it('should support US zip 5', () => {
      expect(setup('US', '12345')).toBe('12345');
    });

    it('should support CA postal code', () => {
      expect(setup('CA', 'V5Y 1X4')).toBe('V5Y 1X4');
      expect(setup('CA', 'V5Y1X4')).toBe('V5Y 1X4');
    });

    it('should support UK postal code', () => {
      expect(setup('GB', 'L1 8JQ')).toBe('L1 8JQ');
      expect(setup('GB', 'B33 8TH')).toBe('B33 8TH');
      expect(setup('GB', 'SW1W 0NY')).toBe('SW1W 0NY');
      expect(setup('GB', 'SW1W0NY')).toBe('SW1W0NY');
    });

    it('should support IE postal code', () => {
      expect(setup('IE', 'A65B2CD')).toBe('A65 B2CD');
      expect(setup('IE', 'D01 F5P2')).toBe('D01 F5P2');
      expect(setup('IE', 'D6W XY00')).toBe('D6W XY00');
    });
  });
});
