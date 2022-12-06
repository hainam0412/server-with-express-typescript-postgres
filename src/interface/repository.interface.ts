interface RepositoryInterface<T> {
    findAll(): Promise<T[]>;
    delete(id: number): Promise<any>;
    findById(id: number): Promise<T | null>;
}
