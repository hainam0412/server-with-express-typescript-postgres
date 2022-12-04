import fs from 'fs';
import path from 'path';

export class Logger {
    private logDir = path.resolve(__dirname, '../../log');

    getFile(name: string, ext = 'log') {
        return `${this.logDir}/${name}.${ext}`;
    }

    getCurrentTime() {
        const now = new Date();

        return now.toLocaleString();
    }

    public async write(file: string, message: string) {
        if (fs.existsSync(this.getFile(file))) {
            fs.appendFile(this.getFile(file), `\n - ${this.getCurrentTime()}: ${message}`, (error) => {
                if (error) {
                    console.error(error);
                }
            });
        }
    }

    clearAll() {}
}
