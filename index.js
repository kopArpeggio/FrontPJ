const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
var jwt = require("jsonwebtoken");
const secret = "kop_ter_login_Project";
const multer = require("multer");
app.use(cors());

const upload = multer();
const mysql = require("mysql2");
const { JsonWebTokenError } = require("jsonwebtoken");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test_project",
  multipleStatements: true,
});
const connection2 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "projectdb",
  multipleStatements: true,
});
const connection3 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project",
  multipleStatements: true,
});

app.post("/Addstudent", jsonParser, function (req, res, next) {
  connection.execute(
    "INSERT INTO user_info (username, password, address, role) VALUES (?, ?, ?, ?)",
    [req.body.username, req.body.password, req.body.address, req.body.role],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok" });
    }
  );
});

app.post("/login", jsonParser, function (req, res, next) {
  connection.execute(
    "SELECT * FROM user_info WHERE username = ? AND password = ?",
    [req.body.username, req.body.password],
    function (err, student, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      if (student.length == 0) {
        connection3.execute(
          "SELECT * FROM teacher WHERE username = ? AND password = ?",
          [req.body.username, req.body.password],
          function (err, teacher, fields) {
            if (err) {
              res.json({ status: "error", message: err });
              return;
            }
            if (teacher.length == 0) {
              // res.json({ status: 'error', message: 'no user found' });
              connection3.execute(
                `SELECT * FROM user WHERE user_id = ? AND password = ?`,
                [req.body.username, req.body.password],
                function (err, user, fields) {
                  if (err) {
                    res.json({ status: "error", message: err });
                    return;
                  }
                  if (user.length == 0) {
                    res.json({ status: "error", message: "no user found" });
                  } else {
                    var test = { role: user[0].role_id };
                    var token = jwt.sign(
                      { username: user[0].user_id },
                      secret,
                      { expiresIn: "3h" }
                    );
                    res.json({ login: "pass", token, test });
                  }
                }
              );
            } else {
              var test = { role: teacher[0].role_id };
              var token = jwt.sign({ username: teacher[0].username }, secret, {
                expiresIn: "3h",
              });
              res.json({ login: "pass", token, test });
            }
          }
        );
      } else {
        var test = { role: student[0].role };
        var token = jwt.sign({ username: student[0].username }, secret, {
          expiresIn: "3h",
        });
        res.json({ login: "pass", token, test });
      }
    }
  );
});

app.post("/authen", jsonParser, function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, secret);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "img");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadfile = multer({ storage }).single("file");

app.post("/testupload", (req, res) => {
  uploadfile(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

app.listen("3001", () => {
  console.log("Server is runnng on port 3001");
});

app.get("/test", jsonParser, function (req, res, next) {
  connection.execute(
    "SELECT * FROM user_info",
    function (err, results, fields) {
      res.json(results);
    }
  );
});

app.get("/test2", jsonParser, function (req, res, next) {
  connection.execute(
    `SELECT user_info.username FROM user_info`,
    function (err, a) {
      if (err) {
        console.log(err);
      }

      connection.execute(
        `SELECT teacher.username FROM teacher`,
        function (err, results) {
          if (err) {
            console.log(err);
          }
          res.json({ results, a });
        }
      );
    }
  );
});

app.get("/test3/:username", function (req, res, next) {
  connection.execute(
    `SELECT * FROM user_info WHERE username = ? `,
    [req.params.username],
    function (err, results, fields) {
      res.json(results);
    }
  );
});
app.get("/userinfo/:user_id", function (req, res, next) {
  connection3.execute(
    `SELECT * FROM user WHERE user_id = ? `,
    [req.params.user_id],
    function (err, results, fields) {
      res.json(results);
    }
  );
});

app.delete("/delcompany/:id", function (req, res, next) {
  connection3.execute(
    `DELETE FROM address WHERE add_id = ? `,
    [req.params.id],
    function (err, results, fields) {
      res.json(results);
    }
  );
});

app.get("/testsingleuser", function (req, res, next) {
  connection2.execute(
    `SELECT * FROM user WHERE user_id = 'aditap'  `,
    function (err, results, fields) {
      res.json({ results });
    }
  );
});
app.get("/testrole/:username", jsonParser, function (req, res, next) {
  connection3.execute(
    `SELECT user.role_id,user.firstname,user.lastname,user.status_id
        FROM user
        WHERE user_id = ?  
        `,
    [req.params.username],
    function (err, results, fields) {
      //    res.json({results})
      if (results.length == 0) {
        connection3.execute(
          `SELECT * 
                    FROM teacher
                    WHERE username = ?
                    `,
          [req.params.username],
          function (err, results, fields) {
            res.json({ results });
          }
        );
      } else {
        res.json({ results });
      }
    }
  );
});

app.put("/profile", jsonParser, function (req, res, next) {
  connection2.execute(
    `UPDATE user
        SET tel = ?, height = ?, weight = ? , Email = ?, activitie = ?
        WHERE user_id = ?
        `,
    [
      req.body.phonenumber,
      req.body.height,
      req.body.weight,
      req.body.Email,
      req.body.activitie,
      req.body.username,
    ]
  );
});
app.put("/editcompany", jsonParser, function (req, res, next) {
  connection3.execute(
    `UPDATE company
        SET name_company = ?, username = ?, password = ?
        WHERE add_id = ?
        `,
    [req.body.company, req.body.username, req.body.password, req.body.add_id],
    function (err, results) {
      connection3.execute(
        `UPDATE address
                SET province = ? , amphoe = ? , district = ? , subadd = ?
                WHERE add_id = ?
                `,
        [
          req.body.province,
          req.body.amphoe,
          req.body.district,
          req.body.subadd,
          req.body.add_id,
        ],
        function (err, results2) {
          res.json({ results, results2 });
        }
      );
    }
  );
});

app.get("/getcompany", jsonParser, function (req, res, next) {
  connection3.execute(
    `SELECT address.province,address.amphoe, address.add_id, address.district , company.username, company.password , company.name_company, address.subadd, company.company_id
        FROM address
        INNER JOIN company ON address.add_id = company.add_id
        `,
    function (err, results, fields) {
      res.json(results);
    }
  );
});

app.post("/addressid", jsonParser, function (req, res, next) {
  connection3.execute(
    `INSERT INTO company (add_id) SELECT max(add_id) FROM address `,
    function (err, results) {
      res.json(results);
    }
  );
});

app.get("/allusers", jsonParser, function (req, res, next) {
  connection3.execute(`SELECT * FROM user`, function (err, results) {
    res.json(results);
  });
});

app.post("/insertaddress", jsonParser, function (req, res, next) {
  connection3.execute(
    "INSERT INTO address (address.province, address.amphoe, address.district, address.subadd) VALUES (?, ?, ?, ? )",
    [req.body.province, req.body.amphoe, req.body.distri, req.body.subadd],
    function (err, results, fields) {
      connection3.execute(
        "INSERT INTO company (company.name_company,company.add_id, company.role_id) VALUES (?, (SELECT max(add_id) FROM address), 3 )",
        [req.body.companyname],
        function (err, results2, fields) {
          res.json({ results2, results });
        }
      );
      // res.json({ status: 'ok' })
    }
  );
});
