import { Pattern } from '@type/pattern.type';

export const RegexValidation = Object.freeze({
    validSlug(testString: string) {
        const reg = new RegExp(Pattern.slug);

        return reg.test(testString);
    },

    validEmail(text: string) {
        return text.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/);
    },
});
