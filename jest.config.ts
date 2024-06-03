export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
              diagnostics: {
                ignoreCodes: [1343]
              },
              astTransformers: {
                before: [
                  {
                    path: 'ts-jest-mock-import-meta',
                    options: { 
                        metaObjectReplacement: { 
                            env: {
                                VITE_APP_API: 'http://localhost:5001'
                            }
                    } }
                  }
                ]
              }
            }
          ]
    },
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
      },
}