var conn = require('./db');

module.exports = {

    //Class 182 - Trazer contagem banco dados
    dashboard(){

        return new Promise((resolve, reject) => {

            conn.query(`
            SELECT
                (SELECT COUNT(*) 
                    FROM 
                        tb_contacts) AS nrcontacts,
                (SELECT COUNT(*) 
                    FROM 
                        tb_menus) AS nrmenus,
                (SELECT COUNT(*) 
                    FROM 
                        tb_reservations) AS nrreservations,
                (SELECT COUNT(*) 
                    FROM 
                        tb_users) AS nrusers;
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

    getMenus(req){

        let menus = [
            {
                text: "Tela Inicial",
                href: "/admin/",
                icon: "home",
                active: false
            },
            {
                text: "Menu",
                href: "/admin/menus",
                icon: "cutlery",
                active: false
            },
            {
                text: "Produtos",
                href: "/admin/produtos",
                icon: "cutlery",
                active: false
            },
            {
                text: "Serviços",
                href: "/admin/servicos",
                icon: "cutlery",
                active: false
            },
            {
                text: "Reservas",
                href: "/admin/reservations",
                icon: "calendar-check-o",
                active: false
            },
            {
                text: "Contatos",
                href: "/admin/contacts",
                icon: "comments",
                active: false
            },
            {
                text: "Usuários",
                href: "/admin/users",
                icon: "users",
                active: false
            },
            {
                text: "E-mails",
                href: "/admin/emails",
                icon: "envelope",
                active: false
            },
        ];

        //Aula 180 - Menu lateral com barra active:
        menus.map(menu => {         

            if (menu.href === `/admin${req.url}`) menu.active = true;

        });

        return menus;


    }
};