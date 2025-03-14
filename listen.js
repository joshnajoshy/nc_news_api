const app = require('./app')

app.listen(10000, (err) => {
if(err){
    console.log(err)
} else{
    console.log('listening on 10000')
}
})