import { context } from "esbuild";
import { clean } from 'esbuild-plugin-clean';
import esbuildPluginTsc from 'esbuild-plugin-tsc';
import { resolve } from "path";


const buildPath = "./dist"
const isProduction = process.env.NODE_ENV === "production"

const createBuildSettings = (path) => ({
  entryPoints: [`./src/${path}/index.ts`],
  outdir: resolve(buildPath, path),
  bundle: true,
  platform: "node",
  target: "node16",
  minify: isProduction,
  sourcemap: false,
  plugins: [
    clean({
      patterns: ['./dist/*', './dist/assets/*.map.js'],
      cleanOnStartPatterns: ['./prepare'],
      cleanOnEndPatterns: ['./post'],
    }),
    esbuildPluginTsc({
      tsconfigPath: `./src/${path}/tsconfig.json`,
      force: true
    })
  ],
  logLevel: "info",
})


const buildResource = async () => {
  console.log("Building resource...")
  const serverCtx = await context(createBuildSettings("server"))
  const client = await context(createBuildSettings("client"))

  await client.watch();
  await serverCtx.watch();
}

buildResource().catch((error) => {
  console.error(error)
  process.exit(1)
})
