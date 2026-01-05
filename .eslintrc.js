module.exports = {
    root: true,
    env: {
        node: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier', // Make sure this is last to override other configs
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'no-magic-numbers': 'off', // Disable core rule
        '@typescript-eslint/no-magic-numbers': [
            'warn',
            {
                ignore: [-1, 0, 1],
                ignoreArrayIndexes: true,
                ignoreEnums: true,
                ignoreReadonlyClassProperties: true,
            },
        ],
        'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
    ignorePatterns: ['dist', 'node_modules', '*.js'],
};
