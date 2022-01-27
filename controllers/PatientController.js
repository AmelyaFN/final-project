// TODO 4: SETUP CONTROLLER

// membuat model Patient
const Patient = require("../models/Patient");

// buat class Patient  controller
class PatientController {
    async index(req, res) {
        // mendapatkan semua data
        const patients = await Patient.all();

        const data = {
            message: "Menampilkan data patients",
            data: patients,
        };

        res.status(200).json(data);
    }

    async store(req, res) {
        const { id, name, phone, address, status, in_date_at, out_date_at } = req.body;
        // melakukan tambah data
        Patient.create(id, name, phone, address, status, in_date_at, out_date_at);
        const patients = await Patient.all();

        const data = {
            message: `Menambahkan data patient ${name}`,
            data: patients,
        };
        res.json(data);
    }

    async update(req, res) {
        const { id } = req.params;

        // cari id patient yang ingin di update
        const patient = await Patient.find(id);

        if (patient) {
            // melakukan update data
            const patient = await Patient.update(id, req.body);
            const data = {
                message: 'Mengedit data patient',
                data: patient
            }
            res.status(200).json(data);
        }
        else {
            const data = {
                message: "patient not found"
            };
            res.status(404).json(data);
        }
    }

    async destroy(req, res) {
        const { id } = req.params;

        // cari id
        const patient = await Patient.find(id);

        //jika ada, hapus data
        if (patient) {
            // hapus data
            await Patient.delete(id);

            const data = {
                message: `Menghapus data patient`,
            };

            res.status(200).json(data);
            
        //jika tidak ada, kirim data tidak ada
        } else {
            const data = {
                message: `Data tidak ada`,
            };

            res.status(404).json(data);

        }


    }

    async show(req, res) {

        const { id } = req.params;

        //cari id
        const patient = await Patient.find(id);

        //jika ada, kirim datanya
        if (patient) {
            const data = {
                message: `Menampilkan data patients`,
                data: patient,
            };

            res.status(200).json(data);

        //jika tidak ada, kirim data tidak ada
        } else {
            const data = {
                message: `Data tidak ada`,
            };

            res.status(404).json(data);

        }
    }

    async search(req, res) {
        
        const { name } = req.params;

        //cari name
        const patients = await Patient.search(name);

        //kirim data patient
        const data = {
            message: "Menampilkan data patients",
            data: patients,
        };

        res.status(200).json(data);
    }

    async positive(req, res) {
             
        //cari patient berstatus positive
        const patient = await Patient.findByStatus("positive");

        //jika ada, kirim datanya
        if (patient) {
            const data = {
                message: `Menampilkan data patients positive`,
                data: patient,
            };
            res.status(200).json(data);

        //jika tidak ada, kirim data tidak ada
        } else {
            const data = {
                message: `Data tidak ada`,
            };
            res.status(404).json(data);
        }
    }

    async recovered(req, res) {
        
        //cari patient berstatus recovered
        const patient = await Patient.findByStatus("recovered");

        //jika ada, kirim datanya
        if (patient) {
            const data = {
                message: `Menampilkan data patients recovered`,
                data: patient,
            };
            res.status(200).json(data);

        //jika tidak ada, kirim data tidak ada
        } else {
            const data = {
                message: `Data tidak ada`,
            };
            res.status(404).json(data);
        }
    }

    async dead(req, res) {
        
        //cari patient berstatus dead
        const patient = await Patient.findByStatus("dead");

        //jika ada, kirim datanya
        if (patient) {
            const data = {
                message: `Menampilkan data patients dead`,
                data: patient,
            };
            res.status(200).json(data);

        //jika tidak ada, kirim data tidak ada
        } else {
            const data = {
                message: `Data tidak ada`,
            };
            res.status(404).json(data);
        }
    }

}

// buat object PatientController
const object = new PatientController();

// export object
module.exports = object;