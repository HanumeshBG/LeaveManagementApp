//----------------------- Retive leave counts based on status----------------
exports.loadLeaveStatusCount = function (req, res) {
    var sqlquery = "SELECT COUNT(id) as count, status FROM leaves GROUP BY status";
    db.query(sqlquery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send({ result: result });
        }
    });
};