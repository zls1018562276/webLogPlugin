
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import typescript from 'rollup-plugin-typescript2'

const isDev = process.env.NODE_ENV === 'development'

export default {
  input: 'src/main.ts',
  output: [
    {
      file: 'dist/index.js',
      name: 'webLog',
      format: 'umd'
    },
    {
      file: 'dist/index.cjs.js',
      name: 'webLog',
      format: 'cjs' // nodejs
    },
    {
      file: 'dist/index.min.js',
      name: 'webLog',
      format: 'iife', // script 引入
      plugins: [
        terser()
      ],
      sourcemap: false
    }
  ],
  module: {
    rules: [
      {
        test: '/\.ts$/',
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    typescript(),
    babel({
      exclude: "node_modules/**"
    }),
    resolve(),
    commonjs(),
    // 加载json文件
    json(),
    // 热更新
    isDev && livereload(),
    // 本地服务器
    isDev && serve({
      open: true, // 自动打开页面
      port: 3444, 
      openPage: '/index.html', // 打开的页面
      contentBase: ''
    })
  ]
};