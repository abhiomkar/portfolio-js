import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import cssnano from 'cssnano';
import url from 'postcss-url';
import babel from 'rollup-plugin-babel';

export default [{
  input: './src/portfolio.js',
  output: [{
    file: './dist/portfolio.js',
    format: 'cjs'
  },
  {
    file: './dist/portfolio.umd.js',
    format: 'umd',
    name: 'portfolio'
  },
  {
    file: './dist/portfolio.esm.js',
    format: 'es'
  }],
  plugins: [
    babel({
      exclude: ['node_modules/**,', '**/*.scss']
    }),
    resolve(),
    postcss({
      extract: true,
      plugins: [cssnano, url({url: 'inline'})]
    })
  ]
}];