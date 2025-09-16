// eslint.config.mjs
import js from '@eslint/js';
import ts from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // Regras base de JS
  js.configs.recommended,

  // Regras base de TypeScript
  ...ts.configs.recommended,

  // Sua configuração customizada
  {
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // Regras gerais recomendadas
      'no-unused-vars': 'warn',
      'no-console': 'off',

      // Impede imports proibidos (exemplo: react-hook-form direto)
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/components/ui/form.tsx',
              from: 'react-hook-form',
              message:
                '⚠️ UseForm deve ser importado de "@/components/ui/form", não direto de react-hook-form',
            },
          ],
        },
      ],

      // 🔹 Prettier: ativa e mostra erros quando formatação não bate
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          trailingComma: 'all',
          printWidth: 80,
        },
      ],
    },
    settings: {
      // Ajuda o eslint-plugin-import a entender TypeScript
      'import/resolver': {
        typescript: {},
      },
    },
  },
];
