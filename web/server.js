const express = require('express')
const app = express()
const port = 3000
const session = require('express-session');
const cookieParser = require('cookie-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.set("views", "./views");
app.set("view engine", "ejs");

const path = require("path");
const dbPath = path.resolve(__dirname, "test.db");

const sqlite3 = require('sqlite3').verbose();
console.log(dbPath);

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message);
});

const createtablesql = `CREATE TABLE User ( userid INTEGER PRIMARY KEY, username varchar(500), name varchar(500), email varchar(500), password varchar(500), phonenumber varchar(500) )`;
db.run(createtablesql);

//db.close();
//

app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "secret",
}));

app.get('/dangki', (req, res) => {
    /* res.send('Hello World!') */
    res.render('dangki.ejs');
}); 

app.get('/giohang', (req, res) => {
    /* res.send('Hello World!') */
    return res.render('giohang.ejs');
}); 

const getUser = async(user) => {
    const select = `SELECT * from User WHERE username=?`;
    return new Promise((resolve, reject) => {
        db.all(select, [user.username], async (err, rows) => {
            if (err) {
                reject(err);
            } else {
                console.log("rows: ", rows);
                let result = {};
                for(let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    const c = await compare(user.password, row.password);
                    if(c) result = row;
                }
                resolve(result);
            }
        });
    });
}

app.get('/user', async (req, res) => {
    /* res.send('Hello World!') */
    if(req.session.authorized) {
        const user = await getUser(req.session.user);
        console.log(user);
        return res.render('userprofile.ejs', {user: user});
    } else {
        return res.redirect('/dangnhap');
    }
}); 

app.get('/dangnhap', (req, res) => {
    /* res.send('Hello World!') */
    if(req.session.authorized) {
        //return res.render('userprofile.ejs');
        return res.redirect('/user');
    }
    return res.render('dangnhap.ejs');
}); 


app.post('/dangki', async (req, res) => {
    console.log(req.body);
    const user = req.body;
    user.password = await hash(user.password);
    const userExist = await checkIfUsernameExist(user.username);
    if(userExist) {
        return res.json({
            error: "User already exist"
        }); 
    } else {
        // Save the info to the database 
        await addNewUser(user);
        return res.json({
            success: "User added successfully"
        });
    }
});

app.post('/dangxuat', (req, res) => {
    req.session.destroy();
    //res.redirect("/dangnhap");
});

const hash = async (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  };

app.post('/dangnhap', async (req, res) => {
    // TODO: check for user 
    console.log(req.body);
    const user = req.body;
    // const user = {
    //     username : "username",
    //     name : "name",
    //     email : "email",
    //     phonenumber : "phonenumber",
    // };

    //user.password = await hash(user.password);

    const userExist = await checkIfUserExist(user);
    console.log("user exist: ", userExist);
    // const userExist = true;
    if(userExist) {
        req.session.user = user;
        req.session.authorized = true;
        req.session.save();
        return res.json({
            success: "User Login successfully"
        });
    } else {
        return res.json({
            error: "User not exist"
        });
    }

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

// Compare a plaintext password with a hashed password
const compare = async (plaintextPassword, hashedPassword) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plaintextPassword, hashedPassword, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

const checkIfUserExist = async (user) => {
    //console.log("Check if user exist: ", user);
    const select = `SELECT * from User WHERE username=?`;
    return new Promise((resolve, reject) => {
        db.all(select, [user.username], async (err, rows) => {
            if (err) {
                reject(err);
            } else {
                console.log("rows: ", rows);
                let result = false;
                for(let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    const c = await compare(user.password, row.password);
                    if(c) result = true;
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