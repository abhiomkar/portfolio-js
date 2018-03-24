import cssnano from 'cssnano';
import url from 'postcss-url';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: './src/portfolio.js',
    output: [
      {
        file: './dist/portfolio.js',
        format: 'cjs',
      },
      {
        file: './dist/portfolio.umd.js',
        format: 'umd',
        name: 'Portfolio',
      },
      {
        file: './dist/portfolio.es.js',
        format: 'es',
      },
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**,', '**/*.scss'],
      }),
      resolve(),
      postcss({
        extract: true,
        plugins: [cssnano, url({url: 'inline'})],
      }),
    ],
  }
];
