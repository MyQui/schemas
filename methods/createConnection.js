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
    createconnection includes db parameter: false`)
}

module.exports = {
    createConnection
}