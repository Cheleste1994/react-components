import React from 'react';

function ErrorComponent() {
  throw new Error('This is a sample error for testing purposes.');

  return <div />;
}

export default ErrorComponent;
