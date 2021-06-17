
// exports.getInfo = function () {
//     return new Promise(function (resolve, reject) {
//         let queryItem = "select * from Info";
//         let query = mysql.format(queryItem);
//         pool.query(query, function (err, rows, field) {
//             if (err) reject(err);
//             resolve(rows);
//         });
//     });
// };
// exports.addInfo = function (data) {
//     return new Promise(function (resolve, reject) {
//         let queryItem = "insert into Info value (?,?);";
//         let query = mysql.format(queryItem, [data.name, data.ID]);
//         pool.query(query, function (err, rows, field) {
//             if (err) {
//                 console.log(err);
//                 resolve(false);
//             };
//             resolve(true);
//         });
//     });
// };
// exports.deleteInfo = function (ID) {
//     return new Promise(function (resolve, reject) {
//         let queryItem = "delete from Info where ID = ?;";
//         let query = mysql.format(queryItem, [ID]);
//         pool.query(query, function (err, rows, field) {
//             if (err) {
//                 console.log(err);
//                 resolve(false);
//             };
//             resolve(true);
//         });
//     });
// };