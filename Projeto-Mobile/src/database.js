

// Inicializa o banco de dados
export async function initializeDatabase(database) {
  await database.execAsync(`  
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);
}

// Função para usar o banco de dados de usuários
export function useUserDatabase(database) { // Recebe o database como parâmetro
  async function create(data) {
    const statement = await database.prepareAsync(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
    );

    try {
      const result = await statement.executeAsync([data.username, data.email, data.password]);
      const insertedRowId = result.lastInsertRowId.toLocaleString();
      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function searchByUsername(username) {
    try {
      const query = "SELECT * FROM users WHERE username = ?";
      const response = await database.getFirstAsync(query, [username]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function update(data) {
    const statement = await database.prepareAsync(
      "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?"
    );

    try {
      await statement.executeAsync([data.username, data.email, data.password, data.id]);
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function remove(id) {
    try {
      await database.execAsync("DELETE FROM users WHERE id = ?", [id]);
    } catch (error) {
      throw error;
    }
  }

  async function show(id) {
    try {
      const query = "SELECT * FROM users WHERE id = ?";
      const response = await database.getFirstAsync(query, [id]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  return { create, searchByUsername, update, remove, show };
}
