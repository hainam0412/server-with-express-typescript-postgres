import fs from 'fs';
import path from 'path';

export class ModuleValidation {
    private coreModules = ['core', 'console', 'command'];
    private moduleDirPath = path.resolve(__dirname, '../../');

    public checkValidModule(moduleName: string) {
        return !this.coreModules.includes(moduleName) && !this.checkModuleExists(moduleName);
    }

    private checkModuleExists(moduleName: string) {
        const dirs = fs.readdirSync(this.moduleDirPath, { withFileTypes: true });
        let exists = false;
        for (const dir of dirs) {
            if (!dir.isDirectory()) {
                break;
            }

            if (dir.name === moduleName) {
                exists = true;
            }
        }

        return exists;
    }
}
