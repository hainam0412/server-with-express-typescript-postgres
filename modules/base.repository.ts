interface BaseRepositoryInterface<T> {
    findAll(t: T): Promise<T[]>;
    delete(t: T): Promise<any>;
}
