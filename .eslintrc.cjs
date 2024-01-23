require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    node: true,
    jest: true, // Add this line
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    // 'plugin:jest/recommended' // Uncomment this if you have installed eslint-plugin-jest
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    'jest'
  ],
}
