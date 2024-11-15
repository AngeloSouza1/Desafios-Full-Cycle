/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // Utiliza o SWC para transformar arquivos TypeScript
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },

  // Define o ambiente de teste como Node
  testEnvironment: "node",

  // Configura extensões dos módulos usados
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Ignora transformações em arquivos do node_modules
  transformIgnorePatterns: ["/node_modules/"],

  // Limpa mocks automaticamente antes de cada teste
  clearMocks: true,

  // Define padrões para o Jest detectar arquivos de teste
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],

  // Usa o v8 como provedor de cobertura de código
  coverageProvider: "v8",

  // Configuração de aliases para resolver caminhos de módulo
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
  },

  // Inclui definições de tipo para Jest e Node.js
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
