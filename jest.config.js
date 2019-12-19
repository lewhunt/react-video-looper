module.exports = {
    verbose: true,
    transform: {
      '^.+\\.js$': '<rootDir>/jest.transform.js',
    },
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.jsx?$',
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
    setupFilesAfterEnv: ['./react-testing-library.setup.js'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
          '<rootDir>/__mocks__/fileMock.js',
        '\\.css$': 'identity-obj-proxy',
      },
  }