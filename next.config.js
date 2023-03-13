/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Learn more here - https://nextjs.org/docs/advanced-features/compiler#module-transpilation
  // Required for UI css to be transpiled correctly 👇
  transpilePackages: ["jotai-devtools"],
};
