import { CommandLineInterface } from '../interface/command-line.interface';
import { Command } from 'commander';
import { AppConsole } from '../console';

export abstract class AbstractCommandLine implements CommandLineInterface {
    public program: Command;

    constructor() {
        const appConsole = AppConsole.getInstance();
        this.program = appConsole.getProgram();
    }
}
