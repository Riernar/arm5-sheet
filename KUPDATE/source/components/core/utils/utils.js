const utils = (
    function () {
        const utils = {};

        /**
         * Convert a string to snake_case with only letters and numbers and underscore in it
         * @param {string} str - The string to convert to snake_case
         * @return A snake cased version of the input string.
         */
        const toSnakeCase = str => (
            // Add a break before capital letters meant for separation in camlCase and PascalCase
            str.replace(/(\p{Lowercase})(\p{Uppercase})/g, '$1_$2')
                // Remove any non-letter non-numeric character and place it by '_'
                .replace(/\W+/g, '_')
                // Replace multiple underscore by a single one
                .replace(/_+/g, '_')
                // and finally convert to lowercase
                .toLowerCase()
        );
        utils.toSnakeCase = toSnakeCase;

        /**
         * Convert a string to kebab-base
         * @param {string} str The string to convert to kebab-case
         * @return A kebab-case version of the string
         */
        const toKebabCase = str => toSnakeCase(str).replace(/_/g, '-');
        utils.toKebabCase = toKebabCase;

        return utils;
    }
)();

// This line makes the code work in both standard require() and the sheetworker environment
// We detect the sheetworker environment by the $20 variable, the Roll20 specific implem of jQuery
if (typeof $20 === 'undefined') {
    module.exports = utils;
}