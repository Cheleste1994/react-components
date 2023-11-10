module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '@/(.*)$': '<rootDir>/src/$1',
    '@/Assets/(.*)$': '<rootDir>/src/assets/$1',
    '@/Components/(.*)$': '<rootDir>/src/components/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
