const app = require('./app')

app.listen(80, (err) => {
if(err){
    console.log(err)
} else{
    console.log('listening on 80')
}
})