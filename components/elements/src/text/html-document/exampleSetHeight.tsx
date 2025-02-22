import React from 'react';

import { Box } from 'zbase';

import HtmlDocumentViewer from './HtmlDocumentViewer';

export default () => (
  <Box w={200} border p={2}>
    <HtmlDocumentViewer
      documentHeight={400}
      html="<h1>header</h1><div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>"
    />
  </Box>
);
