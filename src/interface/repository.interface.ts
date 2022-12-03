interface RepositoryInterface<T> {
    findAll(): Promise<T[]>;
    delete(id: number): Promise<any>;
}
