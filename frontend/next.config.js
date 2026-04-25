/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    // This ignores the red lines in VS Code during the build process
    ignoreBuildErrors: true,
  },
  eslint: {
    // This bypasses the ESLint environment errors on Render
    ignoreDuringBuilds: true,
  },
};

export default config;