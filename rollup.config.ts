import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import { default as typescript } from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'

const plugins = [
  // Allow json resolution
  json(),
  // Compile TypeScript files
  typescript(),
  // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
  commonjs(),
  // Allow node_modules resolution, so you can use 'external' to control
  // which external modules to include in the bundle
  // https://github.com/rollup/rollup-plugin-node-resolve#usage
  resolve(),

  // Resolve source maps to the original source
  sourceMaps(),
];

export default [{
  input: `src/h5-kv-storage.ts`,
  output: [
    { file: `dist/h5-kv-storage.umd.js`, name: 'kvstorage', format: 'umd' , sourcemap: true},
    { file: `dist/h5-kv-storage.esm.js`, format: 'esm' , sourcemap: true},
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: plugins
}, {
  input: `src/h5-xdomain-storage.ts`,
  output: [
    { file: `dist/h5-xdomain-storage.umd.js`, name: 'xdstorage', format: 'umd' , sourcemap: true},
    { file: `dist/h5-xdomain-storage.esm.js`, format: 'esm' , sourcemap: true},
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: plugins
}]
