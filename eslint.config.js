import js from '@eslint/js';
import globals from 'globals';

export default [
    {
        files: ['**/*.js'], //Indique les fichiers JavaScript à analyser.
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module', //Autorise import et export
            globals: {
                ...globals.node,
            },
        },
        rules: {
            ...js.configs.recommended.rules,
        }, // definit les regles de verification
    },
    {
        ignores: ['node_modules/**'], //Exclut node_modules de l'analyse.
    },
];
