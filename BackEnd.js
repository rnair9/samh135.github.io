const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Configure MySQL connection
const db = mysql.createConnection({
    host: 'your-mysql-host',
    user: 'your-username',
    password: 'your-password',
    database: 'your-database'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Serve static files (CSS, JavaScript, etc.)
app.use(express.static('public'));

// Use body-parser middleware for handling form data
app.use(bodyParser.urlencoded({ extended: false }));

// Define routes
app.get('/view-inventory', (req, res) => {
    // Retrieve inventory data from the database and render the view_inventory.html template
    db.query('SELECT * FROM products', (err, results) => {
        if (err) throw err;
        res.render('view_inventory.html', { products: results });
    });
});

// Add more routes for other functionalities (Place Orders, Update Stock, User Management)

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
