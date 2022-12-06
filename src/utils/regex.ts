import { Pattern } from '@type/pattern.type';

export const RegexValidation = Object.freeze({
    validSlug(testString: string) {
        const reg = new RegExp(Pattern.slug);

        return reg.test(testString);
    },

    validEmail(text: string) {
        const reg = new RegExp(Pattern.email);

        return reg.test(text);
    },
});
