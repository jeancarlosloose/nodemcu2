const Sample = require('../models/Sample');

function verification(sample){
    if(sample.temperature >= 45 || sample.gas >= 1000){
        return "UnNormal"
    }
    else
        return "Normal"
}

function variousDevices(arrayNames){
    const vectorReturn = [];
    console.log(arrayNames)
    for(const element of arrayNames) {
        Sample.findOne({deviceName : element}).sort('-createdAt').then(
            result =>{
                return vectorReturn.push(result);
            }
        )
    }
    return vectorReturn;
}

const SampleController = {

    async getAll(req,res){
        let samples = await Sample.find().sort('-createdAt');
        return res.json(samples);
    },

    async getLast(req,res){
        let sample = await Sample.findOne().sort('-createdAt')
        return res.json(sample)
    },

    async getLasts(req,res){
        let result = variousDevices(req.body);
        return res.json(result);
    },


    async insertSample(req,res){
        const body = req.body;
        body.status = verification(body)
        if(body.status === 'UnNormal'){
            io.emit('unNormalNotify',body);
        }
        return res.json(await Sample.create(body))
    }

}

module.exports = SampleController;