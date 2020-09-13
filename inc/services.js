let conn = require('./db');

module.exports = {

     getServices(){

        return new Promise((resolve, reject) => {

            conn.query('SELECT * FROM tb_services ORDER BY title', (err, results) => {
      
                if (err) {
                    reject (err);
                }
          
                resolve(results)
                
            });
        });
    }
};