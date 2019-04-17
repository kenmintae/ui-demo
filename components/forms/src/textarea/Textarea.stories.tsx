import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box, Flex } from 'zbase';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../.storybook/storyHelpers';
import Textarea from './Textarea';

storiesOf('forms|Textarea', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <Textarea />)
  .add('placeholder', () => <Textarea placeholder="Placeholder" />)
  .add('util props', () => <Textarea placeholder="Placeholder" my={50} />)
  .add('sizes', () => (
    <Flex wrap align="center">
      <Box w={1 / 3}>Large</Box>
      <Box w={2 / 3} mb={1}>
        <Textarea s="large" placeholder="Placeholder" />
      </Box>
      <Box w={1 / 3}>Medium</Box>
      <Box w={2 / 3} mb={1}>
        <Textarea s="medium" placeholder="Placeholder" />
      </Box>
      <Box w={1 / 3}>Small</Box>
      <Box w={2 / 3} mb={1}>
        <Textarea s="small" placeholder="Placeholder" />
      </Box>
    </Flex>
  ))
  .add('default value', () => <Textarea defaultValue="Default" />)
  .add('autogrow', () => (
    <Textarea autoGrow defaultValue="Keep typing past the visible rows (hit enter a couple of times)" />
  ))
  .add('rows', () => <Textarea defaultValue={`1\n2\n3\n4`} rows={4} />)
  .add('disabled', () => <Textarea defaultValue="Cannot be edited, focused or submitted" disabled />)
  .add('autofocus', () => <Textarea defaultValue="Cannot be edited, focused or submitted" autoFocus />)
  .add('readOnly', () => <Textarea defaultValue="Cannot be edited, but can be focused and submitted" readOnly />)
  .add('resize', () => <Textarea defaultValue="Cannot be resized by dragging corner" resize="none" />)
  .add('maxLength', () => <Textarea defaultValue="Max 12 chars" maxLength={12} />)
  .add('error', () => <Textarea defaultValue="Invalid input" hasError />)
  .add(
    'fires events',
    () => (
      <Textarea
        defaultValue="Try interacting"
        onFocus={action('textarea-onfocus')}
        onBlur={action('textarea-onblur')}
        onClick={action('textarea-onclick')}
        onKeyUp={action('textarea-onkeyup')}
        onChange={action('textarea-onchange')}
      />
    ),
    skipVisualTest,
  );
