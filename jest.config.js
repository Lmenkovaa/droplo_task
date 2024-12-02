   const nextJest = require('next/jest');

   const createJestConfig = nextJest({
     dir: './',
   });

   const customJestConfig = {
     testEnvironment: 'jest-environment-jsdom',
     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
     moduleNameMapper: {
       '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
       '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
     },
     transform: {
       '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
     },
     testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
   };

   module.exports = createJestConfig(customJestConfig);
   