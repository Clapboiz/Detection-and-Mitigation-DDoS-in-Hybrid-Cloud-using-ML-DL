// TODO: add jwt to this
const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

app.set("views", "./views");
app.set("view engine", "ejs");

const path = require("path");
const dbPath = path.resolve(__dirname, "test.db");

const jwtSecretKey = process.env.JWT_SECRET || 'secret'; // Use environment variable or a default secret key
const sqlite3 = require('sqlite3').verbose();
console.log(dbPath);

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

const createtablesql = `CREATE TABLE IF NOT EXISTS User ( userid INTEGER PRIMARY KEY, username varchar(500), name varchar(500), email varchar(500), password varchar(500), phonenumber varchar(500) )`;
db.run(createtablesql);

app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.get('/dangki', (req, res) => {
    res.render('dangki.ejs');
});

app.get('/giohang', (req, res) => {
    return res.render('giohang.ejs');
});

const getUser = async (user) => {
    const select = `SELECT * from User WHERE username=?`;
    return new Promise((resolve, reject) => {
        db.all(select, [user.username], async (err, rows) => {
            if (err) {
                reject(err);
            } else {
                console.log("rows: ", rows);
                let result = {};
                for (let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    const c = await compare(user.password, row.password);
                    if (c) result = row;
                }
                resolve(result);
            }
        });
    });
}

app.get('/user', async (req, res) => {
    const token = req.cookies.jwtToken;
    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecretKey);
            console.log("decoded: ", decoded)
            let user = await getUser(decoded.user);
            console.log("user: ", user);
            // let user; 
            if(decoded.user == "admin") {
                user = {
                    username: "admin", 
                    email: "HelloAdmin@gmail.com", 
                    phonenumber: 0978213009, 
                };
            }
            if(decoded.user == "user") {
                user = {
                    username: "user", 
                    email: "HelloUser@gmail.com", 
                    phonenumber: 09709987009, 
                };
            }
            return res.render('userprofile.ejs', { user: user });
        } catch (err) {
            // Handle token verification errors
            return res.status(401).json({ error: 'Invalid token' });
        }
    } else {
        // No token found in the cookie
        return res.status(401).json({ error: 'Unauthorized' });
    }
});

app.get('/dangnhap', (req, res) => {
    return res.render('dangnhap.ejs');
});

app.post('/dangki', async (req, res) => {
    console.log(req.body);
    const user = req.body;
    user.password = await hash(user.password);
    const userExist = await checkIfUsernameExist(user.username);
    if (userExist) {
        return res.json({
            error: "User already exist"
        });user
    } else {
        await addNewUser(user);

        const token = jwt.sign({ user: user.username }, jwtSecretKey);
        return res.json({
            success: "User added successfully",
            token: token
        });
    }
});

app.post('/dangxuat', (req, res) => {
    res.clearCookie('jwtToken'); // Clear the token cookie on logout
    return res.status(200).json({ success: 'User logged out successfully' });
});

const hash = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
};

app.post('/dangnhap', async (req, res) => {
    console.log(req.body);
    const user = req.body;
    const userExist = await checkIfUserExist(user);
    console.log('user exist: ', userExist, user);
    if (userExist) {
        const token = jwt.sign({ user: user.username }, jwtSecretKey);
        res.cookie('jwtToken', token, { httpOnly: true });
        return res.json({
            success: 'User login successfully',
            token: token,
        });
    } else {
        return res.status(401).json({
            error: 'Invalid credentials',
        });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

// Compare a plaintext password with a hashed password
const compare = async (plaintextPassword, hashedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plaintextPassword, hashedPassword, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const checkIfUserExist = async (user) => {
    const select = `SELECT * from User WHERE username=?`;
    return new Promise((resolve, reject) => {
        db.all(select, [user.username], async (err, rows) => {
            if (err) {
                reject(err);
            } else {
                console.log("rows: ", rows);
                let result = false;
                for (let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    const c = await compare(user.password, row.password);
                    if (c) result = true;
                }
                resolve(result);
            }
        });
    });
}

const checkIfUsernameExist = async (username) => {
    const select = `SELECT * from User WHERE username=?`;
    return new Promise((resolve, reject) => {
        console.log("username: " + username)
        db.all(select, [username], async (err, rows) => {
            if (err) {
                reject(err);
            } else {
                console.log("rows: ", rows);
                resolve(rows.length > 0);
            }
        });
    });
}

const addNewUser = async(user) => {
    // TODO: hash the password first 
    console.log("add new user: ", user);
    const insertusersql = `INSERT INTO User(username, name, email, password, phonenumber) VALUES (?, ?, ?, ?, ?)`;
    db.run(insertusersql, [user.username, user.name, user.email, user.password, user.phonenumber], (err) => {
        if(err) return console.error(err.message);
    });
}
