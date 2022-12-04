export class StringMapper {
    public slugMapper(text: string) {
        return text.replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?_]/g, '');
    }
}
