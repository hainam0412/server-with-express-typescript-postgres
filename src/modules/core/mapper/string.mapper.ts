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
        return text.replace(/(?:\r\n|\r|\n)/g, '');
    }
}
