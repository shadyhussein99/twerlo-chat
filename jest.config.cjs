// export default {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
// //    "jest": {
// //   "setupFilesAfterEnv": ["@testing-library/jest-dom/extend-expect"]
// // },
//     moduleNameMapper: {
//         "^.+\\.svg$": "jest-svg-transformer",
//         "^.+\\.(css|less|scss)$": "identity-obj-proxy"
//       }
// };

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

};