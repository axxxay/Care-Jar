const express = require('express');
const {open} = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'Client.db');

let db = null;

const initializeDBAndServer = async () => {
    try {
        db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
        });
        app.listen(5000, () => {
        console.log('Server Running at http://localhost:5000/');
        });
    } catch (e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
}

initializeDBAndServer();

app.get('/categories/', async (request, response) => {
    const getCategoriesQuery = `SELECT * FROM categories;`;
    const categoriesArray = await db.all(getCategoriesQuery);
    response.send(categoriesArray);
    }
);

app.get('/doctors/:id', async (request, response) => {
    const {id} = request.params;
    console.log(id)
    const getDoctorQuery = `SELECT * FROM doctors WHERE doctor_type='${id}';`;
    const doctorArray = await db.all(getDoctorQuery);
    response.send(doctorArray);
    }
);