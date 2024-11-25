// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'

// export default tseslint.config(
//   { ignores: ['dist'] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
//       'no-console': 'off', // 禁止使用console
//       'no-unused-vars': 'off', // 禁止定义未使用的变量
//       'no-debugger': 'error', // 禁止使用debugger
//       'no-var': 'error', // 要求使用 let 或 const 而不是 var
//       '@typescript-eslint/no-namespace': 'off',
//       '@typescript-eslint/no-unused-vars': 'off'
//     }
//   }
// )
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react-refresh'],
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-console': 'off', // 禁止使用console
    'no-unused-vars': 'off', // 禁止定义未使用的变量
    'no-debugger': 'error', // 禁止使用debugger
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  }
}
