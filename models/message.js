let connection = require('../config/db')
let moment = require('../config/moment')


class Message{

    constructor (row) {
        this.id = row.id
        this.content = row.content
        this.created = row.created
    }

    get content (){
        return this._content
    }

    get created (){
        return moment(this._created)
    }

    get id (){
        return this._id
    }

    set id(value){
        this._id = value
    }

    set content(value){
        this._content = value
    }
    set created(value){
        this._created = value
    }

    static async create (message, callback){
        const request = 'INSERT INTO messages(content, created) VALUES($1, $2) RETURNING *'
        const values = [message, new Date()]
        // callback
        connection.query(request, values, (err, res) => {
          if (err) throw err
          callback(res)
        })
    }

    static async all (callback){        
        connection.query('SELECT * FROM messages', (err, res) => {
            if (err) throw err
            callback(res.rows.map((row)=> new Message(row)))
        })
    }
    
    static async get (id, callback){    
        const request = 'SELECT * FROM messages WHERE id = $1'
        const values = [id]    
        connection.query(request, values, (err, res) => {
            if (err) throw err
            callback(new Message(res.rows[0]))
        })
    }
}
module.exports = Message