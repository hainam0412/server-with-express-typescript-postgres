export class ArrayUtils {
    public async asyncFilter<T>(arr: T[], predicate: (i: T) => Promise<boolean>): Promise<T[]> {
        const results = await Promise.all(arr.map(predicate));

        return arr.filter((_v, index) => results[index]);
    }
}
