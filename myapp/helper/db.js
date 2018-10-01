const moongose = require('mongoose')

module.exports = ()=>{
    moongose.connect('mongodb://AteselBoy:Malmert31@ds119663.mlab.com:19663/movies-directors')
    
    moongose.connection.on('open',()=>{
        console.log('MongoDB : connected')
    })

    moongose.connection.on('error',(err)=>{
        console.log('MongoDB : err',err)
    })
}