import { UserRepository } from './user.repository';

export class UserMapper {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }
    public async findAll() {
        console.log(await this.userRepository.findAll());
    }
}
