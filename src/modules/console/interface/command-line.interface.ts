import { Command } from 'commander';

export interface CommandLineInterface {
    program: Command;

    addCommand(command: Command): void;

    createCommand(): void;
}
