const connectDB=require('../mongoUtilities/connectDB.js');
const collectionExistCheck=require('../mongoUtilities/collectionExistCheck.js');
const dbDetails=require('../mongoUtilities/dbDetails').get('pnr');
const http=require('http'),
https=require('https');
const fs=require('fs');
const mailer=require('./mailer.js').mailer;
const path=require('path');
const stringDecoder=require('string_decoder').stringDecoder;
const enc=new stringDecoder('utf8');

class serviceController{
    constructor(props){
        this.dbClient;        
    }
    connect(cb){
        connectDB(dbDetails,(resp)=>{
            if(!(resp.status)){
                this.errorLogs(resp);
                this.dbClient=null;
                cb(true);
                return;
            }
            else
                this.dbClient=resp.data;   
                cb(false);  
                return;           
        })
    }
    errorLogs(err){
        console.log('Err in Service Controller',err);
    }
    getList(cb){
        collectionExistCheck(this.dbClient.db(dbDetails.db_name),dbDetails.collection['pnrStatusTrigger'],false,(resp)=>{
            if(!(resp.status)){
                this.errorLogs(resp);
                cb([])
            }
            else{
                this.dbClient.db(dbDetails.db_name).collection(dbDetails.collection['pnrStatusTrigger']).find().toArray((err, result)=>{
                    if(err){
                        this.errorLogs(resp);
                        cb([]);
                    }
                    else{
                        cb(result);
                    }
                  });
            }
        })
    }
    insertNew(){
        let obj={
            pnrNo:4565685958,
            emailList:['allanmvalooran'],
            status:{}
        }
        this.dbClient.db(dbDetails.db_name).collection(dbDetails.collection['pnrStatusTrigger']).insertOne(obj,(err,result)=>{
            if(err)
                this.errorLogs(err)
                         
        })
    }
    initiate(){
        https.get('https://www.ndtv.com/indian-railway/pnr-status',(res)=>{
            var buffer='';
            res.on('data',(d)=>{
                buffer+=enc.write(d);
            });
            res.on('end',()=>{
                processXML(buffer,ind);
            })
        }).on('error',(e)=>{
            console.log(e);
        })

        })
    }
}
module.exports={serviceController};