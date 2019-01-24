function get(key){
    switch(key){
        case 'pnr':
            return{
                db_address:'ds161144.mlab.com',
                port_no:61144,
                db_name:'pnr',
                username:'dbUser',
                password:'dbUser123',
                collection:{
                    pnrStatusTrigger:'pnrStatusTrigger',
                }
            };
        default :
            return{
                db_address:'localhost',
                port_no:null,
                db_name:'',
                collection:{

                }
            }
        
    }
}
module.exports={get}