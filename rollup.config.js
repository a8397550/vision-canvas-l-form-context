// rollup.config.js
const path = require('path');
// const writeCss = require('./config/writeCss');
// 解析 json import json from 'xxx.json'
import json from 'rollup-plugin-json';
// 有时候你会使用npm安装依赖 rollup 不知道如何打破常规去处理这些依赖（node_modules）我们需要添加一些配置。
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import less from 'rollup-plugin-less';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss'

import { uglify } from 'rollup-plugin-uglify';

const resolvePath = function(filePath) {
  return path.join(__dirname, '.', filePath)
}
console.log(resolvePath('src/index.tsx'))

const ENV = process.env.NODE_ENV;
const defaultBuild = {
  sourceMap: true,
  input: resolvePath('src/core/index.tsx'),
  output: {
    file: resolvePath('dist/index.bundle.js'),
    // input [a,b,...] 多文件时有问题 umd 格式有问题 [!] Error: UMD and IIFE output formats are not supported for code-splitting builds.
    // umd,amd,cjs,iife
    format: 'es',
    name: 'myLibrary',
    sourceMap: true,
  },
  plugins: [ // 在此处使用插件
    resolve({ browser: true, }),
    commonjs({
      include: [
        'node_modules/**',
        'src/**'
      ]
    }),
    json(),
    // less({
    //   insert: true, // 会生成可以插入到<head>里面的style
    //   // output: true // 会默认在当前目录导出rollup.build.css
    //   // output: resolvePath('dist/style.css'),
    //   //   output: writeCss
    // }),
    postcss({ extensions: ['.css', '.sss', '.pcss', '.less'], plugins: [] }),
    typescript(),
    // https://www.npmjs.com/package/@rollup/plugin-babel
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.tsx', '.ts']
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    ENV === 'production' && uglify()
  ],
  // 指出应将哪些模块视为外部模块, 外部的（externals），不会与你的库打包在一起
  external: ['react', 'vue', 'react-dom', 'antd']
}
export default [
  {
    ...defaultBuild,
    input: resolvePath('src/index.tsx'),
    output: {
      file: resolvePath('dist/index.bundle.js'),
      // input [a,b,...] 多文件时有问题 umd 格式有问题 [!] Error: UMD and IIFE output formats are not supported for code-splitting builds.
      // umd,amd,cjs,iife
      format: 'umd',
      name: "VisionCanvasLFormContext",
      sourceMap: false,
    },
  },
];