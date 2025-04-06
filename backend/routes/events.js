const numberofleave = 1;
//----------------------- Retive leave counts based on status----------------
exports.loadLeaveStatusCount = function (req, res) {
    let sqlquery = "SELECT COUNT(id) as count, status FROM leaves GROUP BY status";
    db.query(sqlquery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send({ result: result });
        }
    });
};

//------------------- Apply Leave -------------
// exports.applyleave = function (req, res) {
//     let userId = req.session.userId;
//     let user = req.session.user;
//     let selectsql = "SELECT * FROM users;";
//     let sqlquery1 = "SELECT * FROM users WHERE id ='" + req.body.UID + "';";
    
//     cf.getUsers(sqlquery1, function (result) {
//         let selecetdUserDetails = result[0];     
//         if (req.method == "POST") {
//             let status = req.body.l_status;
//             let category = req.body.l_category;
//             let sdate = req.body.l_startdate;
//             let edate = req.body.l_enddate;
//             let name = selecetdUserDetails.first_name + " " + selecetdUserDetails.last_name;
//             let hreason = req.body.l_reason;
//             let desc = req.body.l_description;
//             let selUId = req.body.UID;
//             let fileName;
//             if(req.files == null) {
//                 fileName = req.files;
//                 console.log(fileName);
//             } else {
//                 files1 = req.files.uploadfiles;
//                 fileName = files1.name;
//                 console.log(files1.tempFilePath);
//                 files1.mv('public/images/uploadImages/'+fileName, function(err) {
//                     if (err) return res.status(500).send(err);
//                 })   
//             }
                    
//             let oneday = 24 * 60 * 60 * 1000;
//             let numDays = Math.round(Math.abs((new Date(sdate) - new Date(edate)) / oneday)) + 1;
//             let sqlquery = "INSERT INTO leaves(id, full_name, holiday_reason , status, category, start_date, end_date, description,number_days,files) VALUES('" + selUId + "','" + name + "', '" + hreason + "', '" + status + "', '" + category + "', '" + sdate + "', '" + edate + "', '" + desc + "', '" + numDays + "', '" + fileName + "'); ";

//             db.query(sqlquery, function (err, result) {
//                 if (err) {
//                         console.log(err);
//                 } else {
//                     message = "leave applied successfully"
//                     cf.updateLeavecountTable(category, numDays, selUId);
//                     cf.updateLeaveStatusCountTable(status,selUId, numberofleave);
//                     cf.getUsers(selectsql, function (result) {
//                         res.send({ status:"success", result: result[0]});
//                     });
//                 }
//             });           
//         }
//     });
// };

exports.applyleave = async function (req, res) {
    try {
        let userId = req.session.userId;
        let user = req.session.user;
        let selectsql = "SELECT * FROM users;";
        let sqlquery1 = "SELECT * FROM users WHERE id ='" + req.body.UID + "';";

        const result = await cf.getUsers(sqlquery1);
        let selecetdUserDetails = result;
        console.log("3 " + selecetdUserDetails);
        if (req.method == "POST") {
            let status = req.body.l_status;
            let category = req.body.l_category;
            let sdate = req.body.l_startdate;
            let edate = req.body.l_enddate;
            let name = selecetdUserDetails.first_name + " " + selecetdUserDetails.last_name;
            let hreason = req.body.l_reason;
            let desc = req.body.l_description;
            let selUId = req.body.UID;
            let fileName;

            if (req.files != null) {
                let files1 = req.files.uploadfiles;
                fileName = files1.name;
                console.log(files1.tempFilePath);

                // Save the file
                await new Promise((resolve, reject) => {
                    files1.mv('public/images/uploadImages/' + fileName, function (err) {
                        if (err) reject(err);
                        resolve();
                    });
                });
            }

            let oneday = 24 * 60 * 60 * 1000;
            let numDays = Math.round(Math.abs((new Date(sdate) - new Date(edate)) / oneday)) + 1;

            let sqlquery = "INSERT INTO leaves(id, full_name, holiday_reason , status, category, start_date, end_date, description,number_days,files) VALUES('" + selUId + "','" + name + "', '" + hreason + "', '" + status + "', '" + category + "', '" + sdate + "', '" + edate + "', '" + desc + "', '" + numDays + "', '" + fileName + "');";

            // Execute insert query
            await db.query(sqlquery);

            await cf.updateLeavecountTable(category, numDays, selUId);
            await cf.updateLeaveStatusCountTable(status, selUId, numDays);

            // Retrieve updated users list
            const updatedUsers = await cf.getUsers(selectsql);
            res.send({ status: "success", result: updatedUsers[0] });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing the leave application');
    }
};
