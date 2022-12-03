import fs from 'fs';
import path from 'path';

export class Logger {
    private logDir = path.resolve(__dirname, '../../log');

    getFile(name: string, ext = 'log') {
        return `${this.logDir}/${name}.${ext}`;
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString();
    }

    public async write(file: string, message: string) {
        fs.writeFileSync(this.getFile(file), `- ${this.getCurrentTime()}: ${message}`);
    }

    clearAll() {}
}
