export class EntityHelper {
    public updateValueIfChanged<T>(post: T, key: keyof T, value: any) {
        if (post[key] !== value) {
            post[key] = value as never;
        }
    }
}
