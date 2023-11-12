import React from 'react';

function ErrorComponent(): JSX.Element {
  throw new Error('This is a sample error for testing purposes.');

  return <div />;
}

export default ErrorComponent;
