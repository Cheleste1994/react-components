const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

// module.exports = {
//   testEnvironment: 'jsdom',
//   transform: {
//     '^.+\\.(ts|tsx)$': 'ts-jest',
//     '^.+\\.(js|jsx)$': 'babel-jest',
//   },
//   moduleNameMapper: {
//     '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.ts',
//     '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
//     '@/(.*)$': '<rootDir>/src/$1',
//     '@/Assets/(.*)$': '<rootDir>/src/assets/$1',
//     '@/Components/(.*)$': '<rootDir>/src/components/$1',
//   },
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
// };
