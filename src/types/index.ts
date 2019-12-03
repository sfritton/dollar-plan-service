import pgPromise from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";

export type PostgresDB = pgPromise.IDatabase<{}, pg.IClient>;
