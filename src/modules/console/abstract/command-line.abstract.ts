import { CommandLineInterface } from '../interface/command-line.interface';
import { Command } from 'commander';
import { AppConsole } from '../console';
import inquirer from 'inquirer';

export abstract class AbstractCommandLine implements CommandLineInterface {
    public program: Command;
    public inquirer: typeof inquirer;

    constructor() {
        const appConsole = AppConsole.getInstance();
        this.program = appConsole.getProgram();
        this.inquirer = inquirer;
    }
}
