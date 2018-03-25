import url from 'postcss-url';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';

export default [
  {
    input: './src/portfolio.js',
    output: [
      {
        file: './dist/portfolio.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/portfolio.umd.js',
        format: 'umd',
        name: 'Portfolio',
        sourcemap: true,
      },
      {
        file: './dist/portfolio.es.js',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**,', '**/*.scss'],
      }),
      postcss({
        extract: './dist/portfolio.css',
        minimize: true,
        sourceMap: true,
        plugins: [url({url: 'inline'})],
      }),
    ],
  }
];
