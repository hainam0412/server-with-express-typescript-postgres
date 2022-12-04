export class StringMapper {
    public slugMapperFromUrl(text: string, url: string) {
        return this.slugMapper(text.replace(url, ''));
    }

    public slugMapper(text: string) {
        return text.replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?_]/g, '');
    }
}
