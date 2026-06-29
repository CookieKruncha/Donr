const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    // Create a new user with a hashed password
    static async create(userData) {
        const { sa_id, name, email, phone, password, dob, blood_type, sex, height } = userData;
        
        // Hash the password before saving to the database
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const query = `
            INSERT INTO users (sa_id, name, email, phone, password_hash, dob, blood_type, sex, height)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id, sa_id, name, email, blood_type;
        `;
        
        const values = [sa_id, name, email, phone, password_hash, dob, blood_type, sex, height];
        
        try {
            const { rows } = await db.query(query, values);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Find a user by their email address (used for logging in)
    static async findByEmail(email) {
        const query = `SELECT * FROM users WHERE email = $1;`;
        try {
            const { rows } = await db.query(query, [email]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;