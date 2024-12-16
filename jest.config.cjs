module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^(.*)\\.js$': '$1',
  },
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};
