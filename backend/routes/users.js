//-------------------------Sign up call -----------------
var activeuserName;
exports.signup = function (req, res) {
    var message = '';
    if (req.method == 'POST') {
        var fname = req.body.firstName;
        var lname = req.body.lastName;
        var mobnum = req.body.mobNumber;
        var uname = req.body.userName;
        var psw = req.body.password;
        var gender = req.body.gender;
        console.log(gender);

        var sqlquery = "INSERT INTO users(first_name, last_name, mob_no, user_name, password,gender) VALUES ('" + fname + "','" + lname + "','" + mobnum + "','" + uname + "','" + psw + "','" + gender + "');";
        db.query(sqlquery, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                var selectQuery = "SELECT * from users where user_name='" + uname + "';";
                db.query(selectQuery, function (err, result1) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (result1.length > 0) {
                            req.session.userId = result1[0].id;
                            req.session.user = result1[0];
                            res.send({ status:"success", result: result1[0]});
                            var sqlquery1 = "INSERT INTO leavecounts(uid, sick, casual, personal, other,maternity,total) VALUES ('" + result1[0].id + "','" + 0 + "','" + 0 + "','" + 0 + "','" + 0 + "','" + 0 + "','" + 0 + "');";
                            db.query(sqlquery1, function (err, result2) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('Leavecount table upated sucessfully..');
                                    var sqlquery2 = "INSERT INTO leavestatuscount(id, appliedleavecount, approvedleavecount, rejectedleavecount) VALUES ('" + result1[0].id + "','" + 0 + "','" + 0 + "','" + 0 + "');";
                                    db.query(sqlquery2, function (err, result3) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log('Leavecount table upated sucessfully..');
                                            var sqlquery3 = "INSERT INTO profiledetails(id, mob_no, gender) VALUES ('" + result1[0].id + "','" + result1[0].mob_no + "','" + result1[0].gender + "');";
                                            db.query(sqlquery3, function(err, result4){
                                                if(err) {
                                                    console.log(err);
                                                } else {
                                                    console.log(" Profile Details updated sucessfully...");
                                                }
                                            })
                                        }
                                    });
                                }
                            });
                        } else {
                            message = "Wrong Credential";
                            res.send({ message: message });
                        }
                    }
                  
                });
         
            }
        });

    } else {
        res.send("signup");
    }
};

//----------------- Login call --------------------------
exports.login = function (req, res) {
    var message = "";
    if (req.method == "POST") {
        const {userName, password}= req.body
        //check for admin login
        if(userName.toLowerCase() == 'admin' && password.toLowerCase() == 'admin') {
            console.log('***Loggedin asAdmin***');
            req.session.userId = 'A1';
            req.session.user = userName;
            activeuserName = 'admin';
            res.send({ status:"success", result: "admin"});
        } else {

            var selectQuery = "SELECT id, first_name, last_name,user_name from users where user_name='" + userName + "' and password = '" + password + "';";
            db.query(selectQuery, function (err, result) {
                if (result.length > 0) {
                    req.session.userId = result[0].id;
                    req.session.user = result[0];
                    activeuserName = result[0].user_name;
                    res.send({ status:"success", result: result[0]});
                } else {
                    message = "Wrong Credential";
                    res.send({ status:"success", result: message});
                }
            });
         }
    } else {
        res.send("index");
    }
};

//------------------- Dashboard --------------------------
exports.dashboard = function (req, res) {
    var userId = req.session.userId;
    var user = req.session.user;
    var id = req.query.id;
        var sql = "SELECT * FROM users ;";
        db.query(sql, function (err, result) {
            console.log(result);
            console.log(err)
            res.send({ activeuserName: activeuserName, users: result });
        });
};

//----------------- Get Users List ----------------
exports.usersList = function (req, res) {
    var selectQuery = "SELECT * FROM users;";
    db.query(selectQuery, function (err, result) {
        res.send({ result: result });
        console.log(result);
    });
};