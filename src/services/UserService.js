const UserModel = require('../models/User');
const DeviceModel = require('../models/Device');


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



const addDevicePromisse = (userId,deviceName) =>{
    return new Promise(
        (resolve,reject) =>{
            DeviceModel.findOne({deviceName : deviceName})
            .then(result =>{
                if(result === null){
                    reject(result)
                }
                else{
                    UserModel.findByIdAndUpdate(
                        {_id:userId},
                        {"$push":{"devices":deviceName}}
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

const UserService  = {
    Rules : {
        Login : (body) => {
            let login = body.login;
            let password = body.password;
            return loginPromise(login,password)
        },
        
        createUser : (user) => {
            UserModel.create(user).then(
                result =>{
                    console.log(result)
                    return result
                }
            ).catch(
                err =>{
                    res.json(err)
                }
            )
        },

        addDevice : (body) => {
            let id = body.id;
            let deviceName = body.deviceName;
            return addDevicePromisse(id,deviceName)
        },



        


}        

} 
    


module.exports = UserService;



