const db = require('../src/index')

db.createConnection({
    host: '127.0.0.1',
    port: 28,
    user: 'root',
    password: 'sa8327wr438ewrs7yusa'
})

db.connect()

db.createSchema('test', 'test', {
    name: 'String',
    surname: 'String'
})

db.prepare({ db: 'test', key: 'name', value: 'Pau' })
db.query('INSERT ON DATABASE test PARAMETERS (name, Pau) USING SCHEMA test')

let s = db.query('SELECT VALUE FROM DATABASE test WHERE KEY = name')
console.log(s)

let ss = db.query('SELECT VALUE FROM DATABASE test WHERE KEY = name, OPTIONS = encrypt: %true%')
console.log(ss)
