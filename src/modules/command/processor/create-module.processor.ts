import { StringMapper } from '@module/core/mapper/string.mapper';
import fs from 'fs';
import path from 'path';

export class CreateModuleProcessor {
    private baseModuleFolders = ['controller', 'dto', 'interface', 'mapper', 'model', 'repository', 'type'];
    private moduleDirPath = path.resolve(__dirname, '../../../../src/modules');
    private stringMapper: StringMapper;

    constructor() {
        this.stringMapper = new StringMapper();
    }

    public async createModule(moduleName: string) {
        try {
            fs.mkdirSync(`${this.moduleDirPath}/${moduleName}`);
            for (const folder of this.baseModuleFolders) {
                const folderName = this.folderPath(moduleName, folder);
                fs.mkdirSync(folderName);
                fs.appendFileSync(`${folderName}/${moduleName}.${folder}.ts`, await this.getSkeletonTemplate(folder));
            }
        } catch (error) {
            throw error;
        }
    }

    private folderPath(moduleName: string, folderName: string) {
        return `${this.moduleDirPath}/${moduleName}/${folderName}`;
    }

    private async getSkeletonTemplate(folder: string) {
        const filePath = `${this.moduleDirPath}/command/skeleton/module/${folder}.txt`;
        const fileExists = fs.existsSync(filePath);
        let data = '';

        if (fileExists) {
            try {
                data = fs.readFileSync(filePath, {
                    encoding: 'utf8',
                });
                data.replace(/__module__/g, folder).replace(/__Module__/g, this.stringMapper.toPascalCase(folder));
            } catch (error) {
                throw error;
            }
        }

        return data;
    }
}
