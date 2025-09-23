const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

// إعداد الاتصال بقاعدة البيانات
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ae2zakmi@123', // حط كلمة السر لو عندك
    database: 'crops_db' // تأكد من الاسم
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// نقطة النهاية (API) لجلب البيانات
app.get('/api/crops', (req, res) => {
    const sql = "SELECT * FROM crops";
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send("Error retrieving data");
            return;
        }
        res.json(results);
    });
});

// خدمة ملفات الواجهة الأمامية (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});