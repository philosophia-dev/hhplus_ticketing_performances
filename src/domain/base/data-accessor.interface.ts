// export interface QueryRunner {
//   connect(option?: any): Promise<any>;
//   startTransaction(isolationLevel?: string): Promise<void>;
//   commitTransaction(): Promise<void>;
//   rollbackTransaction(): Promise<void>;
//   releaseQueryRunner(): Promise<void>;
// }
export type QueryRunner = any;
export type LockOption =
  | {
      mode: 'optimistic';
      version: number | Date;
    }
  | {
      mode:
        | 'pessimistic_read'
        | 'pessimistic_write'
        | 'dirty_read'
        | 'pessimistic_partial_write'
        | 'pessimistic_write_or_fail'
        | 'for_no_key_update'
        | 'for_key_share';
      tables?: string[];
      onLocked?: 'nowait' | 'skip_locked';
    };
export type FindSortOrder =
  | 'ASC'
  | 'DESC'
  | 'asc'
  | 'desc'
  | 1
  | -1
  | {
      direction?: 'asc' | 'desc' | 'ASC' | 'DESC';
      nulls?: 'first' | 'last' | 'FIRST' | 'LAST';
    };

export const TOKEN = 'DataAccessor';
export interface DataAccessor {
  connect(option?: any): Promise<QueryRunner>;
  startTransaction(
    queryRunner: QueryRunner,
    isolationLevel?: string,
  ): Promise<void>;
  commitTransaction(queryRunner: QueryRunner): Promise<void>;
  rollbackTransaction(queryRunner: QueryRunner): Promise<void>;
  releaseQueryRunner(queryRunner: QueryRunner): Promise<void>;
}
