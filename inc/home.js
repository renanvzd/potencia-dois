var conn = require('./db');

module.exports = {

    //Class 182 - Trazer contagem banco dados
    dashboard(){

        return new Promise((resolve, reject) => {

            conn.query(`
            SELECT
                (SELECT COUNT(*) 
                    FROM 
                        tb_users) AS nrcontacts,
                
                (SELECT COUNT(*) 
                    FROM 
                        tb_contacts) AS nservice;
            `, (err, results) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });

        });
    },

    //Class 181 - Para simplificar no router getParams:
    getParams(req, params){             

        return Object.assign({}, {
        
            menus: req.menus,
            user: req.session.user
        
        }, params);

    },

    
};