import React from 'react';

import { Link } from 'z-frontend-elements';

const RouteNotFound = () => (
  <div>
    <div>Route does not exist</div>
    <Link to="/">Go back to dashboard</Link>
  </div>
);

export default RouteNotFound;
