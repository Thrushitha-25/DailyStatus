const pool=require("../../config/database");

module.exports={
    create:(data,callBack)=>{
        pool.query(
            `Insert into registrations(firstName,lastName,email,gender,password,number)
                        values(?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.gender,
                data.password,
                data.number
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    getUserByUserId: (id, callBack) => {
        pool.query(
          `select id,firstName,lastName,gender,email,number from registrations where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
    },
    getUsers:callBack=>{
        pool.query(
            `select id,firstName,lastName,email,gender,number from registrations`,
            [],
            (error,results,fields)=>{
                if (error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },
    updateUser:(data,callBack)=>{
        pool.query(
            `update registrations set firstName=?,lastName=?,email=?,gender=?,password=?,number=? where id=?`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.gender,
                data.password,
                data.number,
                data.id
            ],
            (error,results,fields)=>{
                if(error){
                    callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },
    deleteUser:(data,callBack)=>{
        pool.query(
            `delete from registrations where id=?`,
            [data.id],
            (error,results,fields)=>{
                if (error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },
    getUserByUserEmail:(email,callBack)=>{
        pool.query(
            `select * from registrations where email=?`,
            [email],
            (error,results,fields)=>{
                if(error){
                    callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    }
};