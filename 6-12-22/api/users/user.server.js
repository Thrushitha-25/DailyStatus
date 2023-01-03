const pool=require("../../config/db");

module.exports = {
    create: (data, callBack) => {
      pool.query(
        `insert into Demo(firstname, lastname, email, gender, phonenumber, password) 
                  values(?,?,?,?,?,?)`,
        [
          data.firstname,
          data.lastname,
          data.email,
          data.gender,
          data.phonenumber,
          data.password
        ],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    },
    getUserByUserEmail: (email, callBack) => {
        pool.query(
          `select * from Demo where email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      getUserByUserId: (id, callBack) => {
        pool.query(
          `select id,firstname,lastname,email,gender,phonenumber from Demo where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      getUsers: callBack => {
        pool.query(
          `select id,firstname,lastname,email,gender,phonenumber from Demo`,
          [],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      deleteUser: (data, callBack) => {
        pool.query(
          `delete from Demo where id = ?`,
          [data.id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      }
    };