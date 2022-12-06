import { AbstractCommandLine } from '@module/console/abstract/command-line.abstract';
import inquirer, { QuestionCollection } from 'inquirer';
import { Role } from '@type/role.type';
import { RegexValidation } from '@utils/regex';
import { UserMapper } from '../mapper/user.mapper';

export class CreateUserCommand extends AbstractCommandLine {
    private userMapper: UserMapper;

    constructor() {
        super();
        this.userMapper = new UserMapper();

        this.program.command('user:create').action(async () => {
            const questions: QuestionCollection<any> = [
                {
                    type: 'input',
                    name: 'name',
                    message: 'Please enter user name',
                    validate(value: string) {
                        const pass = value.length < 128 && value.length > 0;
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
                        const pass = RegexValidation.validEmail(value) && value.length <= 128 && value.length > 0;
                        if (pass) {
                            return true;
                        }

                        return 'Wrong email format';
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
            try {
                await this.userMapper.create(answers);

                console.log(`Create user ${answers.email} successfully`);
            } catch (error) {
                console.error(error);
            }
        });
    }
}
