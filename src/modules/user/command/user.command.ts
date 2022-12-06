import { AbstractCommandLine } from '../../console/abstract/command-line.abstract';
import inquirer, { QuestionCollection } from 'inquirer';
import { Role } from '../../../type/role.type';

export class UserCommand extends AbstractCommandLine {
    

    constructor() {
        super();

        this.addCommand(
            this.program.command('create-user').action(async () => {
                const questions: QuestionCollection<any> = [
                    {
                        type: 'input',
                        name: 'username',
                        message: 'Please enter user name',
                        validate(value: string) {
                            const pass = value.length < 128;
                            if (pass) {
                                return true;
                            }

                            return 'Username cannot longer than 128 characters';
                        },
                    },
                    {
                        type: 'input',
                        name: 'email',
                        message: 'Please enter email',
                        validate(value: string) {
                            const pass = value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/) && value.length <= 128;
                            if (pass) {
                                return true;
                            }

                            return value.length > 128 ? 'Email cannot longer than 128 characters' : 'Please enter a valid email';
                        },
                    },
                    {
                        type: 'input',
                        name: 'password',
                        message: 'Please enter password',
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Please choose user role',
                        choices: Object.values(Role),
                    },
                ];

                const answers = await inquirer.prompt(questions);
                console.log(JSON.stringify(answers, null, '  '));
            })
        );
    }
}
