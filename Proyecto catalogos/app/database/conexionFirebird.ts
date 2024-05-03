import * as Firebird from 'node-firebird';

// Configuración de la conexión a Firebird
const options = {
  host: 'localhost',
  port: 3050,
  database: 'C:/BasesdeFirebird/CATALOGO.FDB',
  user: 'SYSDBA',
  password: 'UNAHhn-1234',
  wireEncryption: 'Enabled'
};

// Tipo para la conexión a Firebird
interface FirebirdConnection {
  query(sql: string, params: any[], callback: (err: Error | null, result: any) => void): void;
  detach(callback: (err: Error | null) => void): void;
}

// Función para ejecutar consultas en Firebird
export async function executeQuery<T>(query: string, params: any[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    Firebird.attach(options, async (err: Error | null, db: FirebirdConnection) => {
      if (err) {
        reject(err);
        return;
      }

      db.query(query, params, async (err: Error | null, result: any) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
        db.detach((err: Error | null) => {
          if (err) {
            console.error('Error al cerrar la conexión:', err.message);
          }
        });
      });
    });
  });
}
