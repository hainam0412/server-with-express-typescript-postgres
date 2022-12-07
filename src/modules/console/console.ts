import { Command } from 'commander';

export class AppConsole {
    private static instance: AppConsole;
    private program: Command;

    private constructor() {
        this.program = new Command();
    }

    public static getInstance(): AppConsole {
        if (!AppConsole.instance) {
            AppConsole.instance = new AppConsole();
        }

        return AppConsole.instance;
    }

    public getProgram() {
        return this.program;
    }
}
