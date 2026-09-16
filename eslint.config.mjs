import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // This project sets `distDir: ".build"` in next.config.ts. Without this the
    // generated bundle gets linted, which buries real findings under tens of
    // thousands of warnings from compiled output.
    ".build/**",
  ]),
  {
    // Treat a leading underscore as "deliberately unused" — used for props that
    // exist to satisfy a component's contract but aren't read by that component.
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    // Standalone Node maintenance scripts, run directly with `node` rather than
    // bundled, so CommonJS require() is the correct module system here.
    files: ["scripts/**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);

export default eslintConfig;
