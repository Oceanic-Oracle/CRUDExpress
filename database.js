import pg from 'pg';

const { Client } = pg;

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'Mail',
    password: '241265',
    port: 5432,
});

await client.connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log('Error connecting to the database', err);
    });

const methods = {
    getUsers: async () => {
        try {
            const result = await client.query('SELECT login FROM users');
            return JSON.stringify(result.rows);
        } catch (err) {
            return JSON.stringify(err);
        }
    },
    getUser: async (login) => {
        try {
            const result = await client.query('SELECT * FROM users WHERE login = $1', [login]);
            return JSON.stringify(result.rows);
        } catch(err) {
            return JSON.stringify(err);
        }
    },
    createUser: async (login, password) => {
        try {
            const result = await client.query('INSERT INTO users (login, password) VALUES ($1, $2)', [login, password]);
            if (result.rowCount > 0) {
                return JSON.stringify({ status: 'Success' });
            } else {
                return JSON.stringify({ status: 'Error', message: 'Failed to update password' });
            }
        } catch(err) {
            return JSON.stringify(err);
        }
    },
    updateUser: async (login, password) => {
        try {
            const result = await client.query('UPDATE users SET password = $1 WHERE login = $2', [password, login]);
            if (result.rowCount > 0) {
                return JSON.stringify({ status: 'Success' });
            } else {
                return JSON.stringify({ status: 'Error', message: 'Failed to update password' });
            }
        } catch(err) {
            return JSON.stringify(err);
        }
    },
    deleteUser: async (login) => {
        try {
            const result = await client.query('DELETE FROM users WHERE login = $1', [login]); 
            if (result.rowCount > 0) {
                return JSON.stringify({ status: 'Success' });
            } else {
                return JSON.stringify({ status: 'Error', message: 'Failed to update password' });
            }
        } catch(err) {
            return JSON.stringify(err);
        }
    },
}

export default methods;