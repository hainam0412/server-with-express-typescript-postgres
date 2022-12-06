#!/usr/bin/env node

import { Command } from 'commander';
import { FileUtils } from '../../utils/file';
import { CommandLineInterface } from './interface/command-line.interface';
import { Program } from './program';

// const program = new Command();
// program
//     .version('0.0.1')
//     .description("An example CLI for ordering pizza's")
//     .option('-p, --peppers', 'Add peppers')
//     .option('-P, --pineapple', 'Add pineapple')
//     .option('-b, --bbq', 'Add bbq sauce')
//     .option('-c, --cheese <type>', 'Add the specified type of cheese [marble]')
//     .option('-C, --no-cheese', 'You do not want any cheese')
//     .parse(process.argv);

(async () => {
    const fileUtils = new FileUtils();
    await fileUtils.loadModules<CommandLineInterface>('modules', 'command');
    const program = Program.getInstance();
    program.publishCommands();
})();
