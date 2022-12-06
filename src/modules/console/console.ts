import { Command } from 'commander';

export class Console {
    private static instance: Console;
    private program: Command;

    private constructor() {
        this.program = new Command();
    }

    public static getInstance(): Console {
        if (!Console.instance) {
            Console.instance = new Console();
        }

        return Console.instance;
    }

    public getProgram() {
        return this.program;
    }
}
