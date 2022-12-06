import { AbstractCommandLine } from '../../console/abstract/command-line.abstract';

export class UserCommand extends AbstractCommandLine {
    constructor() {
        super();

        this.addCommand(
            this.program
                .command('create')
                .argument('<module>', 'string argument')
                .action((module) => {
                    console.log(module);
                })
        );
    }
}
