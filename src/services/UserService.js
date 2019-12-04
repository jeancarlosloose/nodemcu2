const UserModel = require('../models/User');
const DeviceModel = require('../models/Device');
const Sample = require('../models/Sample');


async function oneSample(name){
    const sample = await Sample.findOne({
        deviceName : name
    }).sort('-createdAt').then(r =>{
        return r;
    })
    return sample
}

async function SampleUnNormal(name){
    const sample = await Sample.find({
        deviceName : name,
        status : "UnNormal"
    }).sort('-createdAt').limit(10).then(r =>{
        return r;
    })
    return sample
}


const loginPromise = (login, password)=>{
    return new Promise(
    (resolve,reject) =>{
        UserModel.findOne({
            login : login,
            password : password
        }).then(
            result =>{
                if(result === null){
                    resolve({
                        status : 404,
                        message : 'User not found!'
                    })
                }else{
                    const objReturn = {
                        id : result._id,
                        name : result.name,
                        devices : result.devices,
                    }
                    resolve(objReturn)
                }
            }
        ).catch(err =>{
            reject(err)
        })
    })
}



const addDevicePromisse =(userId,device) =>{
    return new Promise(
        (resolve,reject) =>{
            DeviceModel.findOne({name : device.name})
            .then(result =>{
                if(result === null){
                    reject(result)
                }
                else{
                    UserModel.findByIdAndUpdate(
                        {_id:userId},
                        {"$push":{"devices":device}}
                    ).then(
                        result =>{
                            resolve(result);
                        }
                    ).catch(err =>{
                        reject(err)
                    })
                }
            })
        }
    )
}


const removeDevicePromise = (id,deviceAlias) => {
    return new Promise((resolve,reject) => {
        UserModel.findOneAndUpdate({
            _id : id
        },{"$pull":{"devices" : {alias : deviceAlias}}}).then(
            r =>{
                resolve(r)
            }
        ).catch(
            err => reject(err)
        )
    })
}


const UserService  = {
    Rules : {
        Login : (body) => {
            let login = body.login;
            let password = body.password;
            return loginPromise(login,password)
        },
        
        createUser : (user) => {
            return new Promise((resolve,reject)=>{
                UserModel.create(user).then(r=>{
                    resolve(r)
                }).catch(err => reject(err))
            })
                    
        },

        addDevice : (body) => {
            let id = body.id;
            let name = body.deviceName;
            let alias = body.deviceAlias;
            let device ={
               alias,
               name
            } 
            return addDevicePromisse(id,device)
        },

        callInformationOfDevices: async (userId) => {
            return new Promise(async (resolve,reject)=>{
                await UserModel.findOne({_id : userId}).then(async user =>{
                    const samples = []
                    for (let element of user.devices) {
                        samples.push({
                            alias : element.alias,
                            device : await oneSample(element.name)
                        }
                        )
                    }
                    resolve(samples);
                }).catch(err=>{
                    reject(err)
                })
            })
        },


        removeDevice : async (id,alias)=>{
            return removeDevicePromise(id,alias);
        },


        getHistoryUnormal : async (id) =>{
            return new Promise( async (resolve, reject) =>{
                await UserModel.findOne({_id : id}).then(async user=>{
                    const samplesUnNormals = []
                    for (let element of user.devices) {
                        samplesUnNormals.push({
                            alias : element.alias,
                            device : await SampleUnNormal(element.name)
                            }
                        )
                    }
                    resolve(samplesUnNormals)
                }).catch(err=> reject(err))
            })
        }
            
            

        

        


    }        

} 

module.exports = UserService;