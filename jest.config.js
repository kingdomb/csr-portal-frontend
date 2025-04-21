// jest.config.js
export default {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/App.jsx',
    '!src/index.css',
    '!src/assets/**',
    '!src/pages/**',
    '!src/components/**',
    '!src/tests/**',
    '!**/node_modules/**',
  ],
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
};
