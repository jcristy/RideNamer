import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import versionInjector from 'rollup-plugin-version-injector';

export default {
  input: './src/registerPlugin.ts',
  output: {
    file: './dist/RideNamer.js',
    format: 'iife',
  },
  plugins: [
    typescript(),
    terser({
      format: {
        quote_style: 1,
        wrap_iife: true,
        preamble: '// Mod powered by https://github.com/wisnia74/openrct2-typescript-mod-template - MIT license',
      },
    }),
    versionInjector()
  ],
};
