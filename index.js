/* const util=require('./jsUtilities/util');

let obj={
    name:'fs',
    type:'',
    fs:''
}
console.log(util.has_Keys(obj,'m')); */

const serviceController=require('./backend/services/init').serviceController;

let services= new serviceController();

services.connect(function(err){
    if(!err){
        services.getList((list)=>{
            console.log('List',list);
        });
    }
})
