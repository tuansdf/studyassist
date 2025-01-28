import { config as baseConfig } from "@repo/eslint-config/base";

/** @type {import("eslint").Linter.Config} */
export default {
  ...baseConfig,
  root: true,
  env: { browser: false, es2020: true, node: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
