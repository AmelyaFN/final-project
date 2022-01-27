// TODO 5: SETUP MODEL

// import db
const db = require("../config/database");

// buat model Patient
class Patient {
    static all() {
        return new Promise((resolve, reject) => {
            // melakukan query ke db untuk ambil data
            const sql = "SELECT * FROM patients";
            db.query(sql, (err, results) => {
                resolve(results);
            });
        });
    }

    static create(id, name, phone, address, status, in_date_at, out_date_at) {
        return new Promise((resolve, reject) => {
            
            // melakukan query ke db untuk memasukan data
            const sql = `INSERT INTO patients (name, phone, address, status, in_date_at, out_date_at) VALUES ('${name}', '${phone}', '${address}', '${status}', '${in_date_at}', '${out_date_at}')`;

            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(results);
                    resolve(results);
                }
            });
        });

    }

    static async update(id, data) {
        await new Promise((resolve, reject) => {

            // melakukan query ke db untuk mengupdate data
            const sql = "UPDATE patients SET ? WHERE id = ?";
            db.query(sql, [data, id], (err, results) => {
                resolve(results);
            });
        });

        const patient = await this.find(id);
        return patient
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            
            // melakukan query ke db untuk  delete data
            const sql = "DELETE FROM patients WHERE id = ?";
            db.query(sql, id, (err, results) => {
                resolve(results);
            });
        });
    }

    static find(id) {
        // lakukan promise, select by id
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM patients WHERE id = ?";
            db.query(sql, id, (err, results) => {
                resolve(results[0]);
            });
        });
    }
    static search(name) {
        return new Promise((resolve, reject) => {
            //melakukan query ke db untuk cari data berdasarkan name
            const sql = "SELECT * FROM patients WHERE name like %?%";
            db.query(sql, (err, results) => {
                resolve(results);
            });
        });
        
    }
    static findByStatus(status) {
        return new Promise((resolve, reject) => {
            //melakukan query ke db untuk cari data berdasarkan status
            const sql = "SELECT * FROM patients WHERE status LIKE ?";
            db.query(sql, status, (err, results) => {
                resolve(results);
            });
        });
    }
}

// export model
module.exports = Patient;