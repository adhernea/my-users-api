import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    rules: {
      'semi': ['error', 'always'],
      '@typescript-eslint/no-explicit-any': 'off' // Para evitar avisos por req as any en Express
    }
  }
);