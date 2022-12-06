import { CommandLineInterface } from '../interface/command-line.interface';
import { Command } from 'commander';
import { Console } from '../console';

export abstract class AbstractCommandLine implements CommandLineInterface {
    public program: Command;

    constructor() {
        const console = Console.getInstance();
        this.program = console.getProgram();
    }
}
