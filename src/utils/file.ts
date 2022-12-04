import fs from 'fs';
import path from 'path';

export class FileUtils {
    public *walkDirSync(dir: string, prefix: string, ext = 'js'): any {
        const files = fs.readdirSync(dir, { withFileTypes: true });
        for (const file of files) {
            if (file.isDirectory()) {
                yield* this.walkDirSync(path.join(dir, file.name), prefix, ext);
            } else if (file.name.includes(prefix) && file.name.endsWith(`.${ext}`)) {
                yield path.join(dir, file.name);
            }
        }
    }

    public async loadModules<T>(dir: string, prefix: string, ext = 'js'): Promise<T[]> {
        const modules: any[] = [];
        for (const filePath of this.walkDirSync(path.resolve(__dirname, `../${dir}`), prefix, ext)) {
            const fileData = await require(filePath);
            const context = this.getClassByPrefix(fileData, prefix);
            const module = context ? new context() : new (Object.values(fileData as any) as any)[0]();

            modules.push(module);
        }

        return modules;
    }

    public getClassByPrefix(fileData: Record<string, any>, prefix: string): any | null {
        const objectKey = Object.keys(fileData).find((key) => {
            return key.toLowerCase().includes(prefix);
        });

        return objectKey ? fileData[objectKey] : null;
    }
}
