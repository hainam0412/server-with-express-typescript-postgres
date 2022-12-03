interface BaseRepositoryInterface<T> {
    findAll(): Promise<T[]>;
    delete(id: number): Promise<any>;
}
