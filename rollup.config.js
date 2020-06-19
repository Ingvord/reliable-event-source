import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

export default [
    // browser-friendly UMD build
    {
        input: 'src/index.js',
        external: pkg.runtimeDependencies,
        output: {
            dir: 'dist',
            format: 'es',
            sourcemap: 'inline'
        },
        plugins: [
            resolve()
        ]
    },
    {
        input: 'test/run.js',
        output: {
            file: 'test/test.js',
            format: 'es',
            sourcemap: 'inline'
        },
        plugins: [
            resolve()
        ]
    }
];
