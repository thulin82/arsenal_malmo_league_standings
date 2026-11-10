import js from "@eslint/js";
import tsPlugin from "typescript-eslint";

export default [
  {
    ignores: ["node_modules/", "dist/", "tests/", "public/**/*.js", "public/**/*.js.map"],
  },
  js.configs.recommended,
  ...tsPlugin.configs.recommended,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsPlugin.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin.plugin,
    },
    rules: {
      indent: ["error", 4, { SwitchCase: 1 }],
      "linebreak-style": ["error", "unix"],
      "eol-last": "error",
      "no-trailing-spaces": "error",
      semi: ["error", "always"],
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "keyword-spacing": ["error", {}],
      "space-before-blocks": ["error", "always"],
      "comma-spacing": ["error", { after: true, before: false }],
      "key-spacing": ["error", { beforeColon: false, afterColon: true, mode: "minimum" }],
      "padded-blocks": ["error", "never"],
      "max-len": ["error", { code: 100 }],
      "comma-style": ["error", "last"],
    },
  },
  {
    files: ["tests/**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsPlugin.parser,
      globals: {
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin.plugin,
    },
    rules: {
      indent: ["error", 4, { SwitchCase: 1 }],
      "linebreak-style": ["error", "unix"],
      "eol-last": "error",
      "no-trailing-spaces": "error",
      semi: ["error", "always"],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["public/**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsPlugin.parser,
      globals: {
        document: "readonly",
        window: "readonly",
        fetch: "readonly",
        Chart: "readonly",
        console: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin.plugin,
    },
    rules: {
      indent: ["error", 4, { SwitchCase: 1 }],
      "linebreak-style": ["error", "unix"],
      "eol-last": "error",
      "no-trailing-spaces": "error",
      semi: ["error", "always"],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];
