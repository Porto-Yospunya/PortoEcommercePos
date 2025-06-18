export const queryBuilder = {
  selectAll: (table: string) => {
    const sql = `SELECT * FROM ${table}`;
    return { sql, value: [] };
  },
  selectWhere: (table: string, where: Record<string, unknown>) => {
    const keys = Object.keys(where);
    const conditions = keys.map((key) => `${key} = ?`).join(" AND ");
    const values = keys.map((key) => where[key]);

    const sql = `SELECT * FROM ${table} WHERE ${conditions}`;
    return { sql, values };
  },
  insert: (table: string, data: Record<string, unknown>) => {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => "?").join(", ");
    const values = keys.map((key) => data[key]);

    const sql = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders})`;
    return { sql, values };
  }
}