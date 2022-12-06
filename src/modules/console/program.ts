import { Command } from 'commander';

export class Program {
    private static instance: Program;
    private commands: Command[];

    private constructor() {
        this.commands = [];
    }

    public static getInstance(): Program {
        if (!Program.instance) {
            Program.instance = new Program();
        }

        return Program.instance;
    }

    public addCommand(command: Command) {
        this.commands.push(command);
    }

    public publishCommands() {
        this.commands.forEach((command) => {
            command.parse();
        });
    }

    public getAllCommands() {
        return this.commands;
    }
}
