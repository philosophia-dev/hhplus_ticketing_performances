export interface Repository<T> {
  create(data: T, ...args: any[]): Promise<T>;
  findAll(filter?: Partial<T>, ...args: any[]): Promise<T[]>;
  findOne(filter: Partial<T>, ...args: any[]): Promise<T>;
  update(id: number, data: Partial<T>, ...args: any[]): Promise<T>;
  delete(id: number, ...args: any[]): Promise<void>;
}
