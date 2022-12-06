import { CommandLineInterface } from '../interface/command-line.interface';
import { Command } from 'commander';
import { Program } from '../program';

export abstract class AbstractCommandLine implements CommandLineInterface {
    public program: Command;
    public programInstance: Program;

    constructor() {
        this.program = new Command();
    }

    public addCommand(command: Command): void {
        const program = Program.getInstance();
        program.addCommand(command);
    }

    public createCommand() {}
}
