import sanitizeHtml from 'sanitize-html';

export class StringMapper {
    public slugMapperFromUrl(text: string, url: string) {
        return this.slugMapper(text.replace(url, ''));
    }

    public slugMapper(text: string) {
        return text.replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?_]/g, '');
    }

    public safeStringMapper(text: string) {
        return sanitizeHtml(this.cleanLineBreak(text));
    }

    public cleanLineBreak(text: string) {
        return text.replace(/(?:\r\n|\r|\n|\t)/g, '');
    }

    public toPascalCase(text: string) {
        return text
            .toLowerCase()
            .replace(new RegExp(/[-_]+/, 'g'), ' ')
            .replace(new RegExp(/[^\w\s]/, 'g'), '')
            .replace(new RegExp(/\s+(.)(\w*)/, 'g'), ($1, $2, $3) => `${$2.toUpperCase() + $3}`)
            .replace(new RegExp(/\w/), (s) => s.toUpperCase());
    }
}
