const UserService = require('../services/UserService');


const UserController =  {
    
    LOGIN(req,res){
        UserService.Rules.Login(req.body).then(
            result =>{
                if(result.status === 404){
                   return res.status(400).json(result);
                }else{
                   return res.status(200).json(result);
                }
            }
        ).catch(
            err =>{
                res.json(err)
            }
        )
    },

    async createUser(req, res){
        UserService.Rules.createUser(req.body).then( r =>
            res.status(200).json(r)
        ).catch(err => res.status(400).json(err))
    },

    async ADDDEVICE(req,res){
        UserService.Rules.addDevice(req.body).then(
            result =>{
                res.json(result);
            }
        ).catch(err =>{
            res.status(404).json(err)
        })
    },

    async myDevices(req, res){
       await UserService.Rules.callInformationOfDevices(req.params.id).then(response=>{
            res.status(200).json(response);
        }).catch(err=>{
            res.status(400).json(err);
        })
    },

    async REMOVEDEVICE(req,res){
        await UserService.Rules.removeDevice(req.params.id,req.body.deviceAlias).then(
            r => res.json(r)
        ).catch(
            err => res.status(404).json(err)
        )
    },

    async myDevicesHistory(req,res){
        await UserService.Rules.getHistoryUnormal(req.params.id).then(
            r=> res.json(r)
        ).catch(
            err => res.status(404).json(err)
        )
    }

}


module.exports = UserController;