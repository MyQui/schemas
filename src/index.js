/**
 * This package is protected by the Apache 2.0 License.
 * Developed by MyQui Corporation with ❤
 */

const fs = require('fs')
const readline = require('readline')
const figlet = require('figlet')
const colors = require('colors')
const package = require('../package.json')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('WQISTR7SDUI')

function createConnection(options) {
    host = options.host
    port = options.port
    user = options.user
    pass = options.password


    fs.writeFileSync(`.quiconfig.yaml`, `# This is the configuration file for your MyQui Database. Do not change anything if you don't know what are you doing.
    connection info:
    host: ${host}
    port: ${port}
    username: ${user}
    password: ${pass}
    
    settings: 
    deprecate old URLs: false
    safe stringify: true
    block remote: false
    createconnection includes db parameter: false
    model deprecate: false
    safe model encryption: true`)
}

function connect(){
    if (!fs.existsSync('myqui')){
        fs.mkdirSync('myqui')
    }
}

function createSchema(schemaName, schema){
    p = schemaName
    schematic = schema
}

function prepare(options){
    db = options.db
    key = options.key
    value = options.value
    if(!fs.existsSync(`myqui/${db}.qui`)){
        fs.writeFileSync(`myqui/${db}.qui`, '{}')
    }
}

function query(string){
    if (string === `INSERT ON DATABASE ${db} PARAMETERS (${key}, ${value}) USING MODEL ${p}`){
        console.log('inserted')
        let fc = JSON.stringify(schematic)
        fs.writeFileSync(`myqui/${db}.qui`, fc)

        let col = fs.readFileSync(`myqui/${db}.qui`, 'utf-8')
        let fcol = JSON.parse(col)
    
        fcol[key] = value
        fs.writeFileSync(`myqui/${db}.qui`, JSON.stringify(fcol, null, 2))
    }

    
    if (string === `SELECT VALUE FROM DATABASE ${db} WHERE KEY = ${key}`) {
        let col = fs.readFileSync(`myqui/${db}.qui`, 'utf-8')
        let fcol = JSON.parse(col)
    
        return fcol[key]
    }

    if (string === `SELECT VALUE FROM DATABASE ${db} WHERE KEY = ${key}, OPTIONS = encrypt: %true%`){
        let col = fs.readFileSync(`myqui/${db}.qui`, 'utf-8')
        let fcol = JSON.parse(col)
    
        let par = fcol[key]
        const k = cryptr.encrypt(par)
        return k
    }

    if (string === `EVALUATE RESULT FROM DATABASE ${db} WHERE KEY = ${key}`) {
        let col = fs.readFileSync(`myqui/${db}.qui`, 'utf-8')

        let fcol = JSON.parse(col)
        let objf = fcol[key]
    
        if(objf){
            return true
        } else if (!objf){
            return false
        }
    }
}

module.exports = {
    createConnection,
    connect,
    createSchema,
    prepare,
    query
}
