import pluginEslint from '@rollup/plugin-eslint';
import pluginNodeResolve from '@rollup/plugin-node-resolve';
import pluginTypescript from '@rollup/plugin-typescript';
import pkg from './package.json' assert { type: 'json' };


const { name, author, version, license, module } = pkg;

const banner = `/**
 * @license
 * author: ${author}
 * ${name}.js v${version}
 * Released under the ${license} license.
 */`;

export default {
  input: 'src/index.ts',
  output: {
    file: module,
    format: 'es',
    compact: true,
    banner,
  },
  external: Object.keys(pkg.dependencies || {}),
  plugins: [
    pluginTypescript(),
    pluginNodeResolve({
      browser: false,
    }),
    pluginEslint(),
  ],
};
