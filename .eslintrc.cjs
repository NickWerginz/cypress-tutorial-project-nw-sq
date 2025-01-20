module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    "cypress/globals": true, // Füge die Cypress-Umgebung hinzu
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:cypress/recommended', // Füge Cypress-spezifische Regeln hinzu
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'cypress'], // Füge Cypress-Plugin hinzu
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Hier kannst du zusätzliche Regeln für Cypress hinzufügen, wenn nötig
  },
};
