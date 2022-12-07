import { AbstractCommandLine } from '@module/console/abstract/command-line.abstract';
import { QuestionCollection } from 'inquirer';
import { CreateModuleProcessor } from '../processor/create-module.processor';
import { ModuleValidation } from '../validation/module.validation';

export class CreateModuleCommand extends AbstractCommandLine {
    private moduleValidation: ModuleValidation;
    private createModuleProcessor: CreateModuleProcessor;

    constructor() {
        super();
        this.moduleValidation = new ModuleValidation();
        this.createModuleProcessor = new CreateModuleProcessor();

        this.program.command('module:create').action(async () => {
            const questions: QuestionCollection<any> = [
                {
                    type: 'input',
                    name: 'name',
                    message: 'Please enter module name',
                    validate: (value: string) => {
                        return this.moduleValidation.checkValidModule(value) || `Module ${value} already exists`;
                    },
                },
            ];

            const answers = await this.inquirer.prompt(questions);

            try {
                await this.createModuleProcessor.createModule(answers.name);
                console.log(`Create ${answers.name} module successfully. Please run 'npm run build' to compile your assets.`);
            } catch (error) {
                console.error(error);
            }
        });
    }
}
