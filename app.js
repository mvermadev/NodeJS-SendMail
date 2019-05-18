const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: false}))

app.post('/sendMail', (req, res)=>{

    const name = req.body.name;
    const email = req.body.email;
    const sub = req.body.sub;
    const msg = req.body.msg
    
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: 'manishverma001997@gmail.com',
            pass: 'm-o-n-u1997ge'
        }
    });
    
    const mailOptions ={
        from : 'manishverma001997@gmail.com',
        to: email,
        subject: sub,
        html: msg + '<br>' + name
    }
    
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
        }else{
            console.log('EMail is sended ');
            res.end();
        } 
    })
    res.redirect('/next.html')
    res.end();
})

app.get('/', (req, res)=>{
    console.log('responding to root route');
    res.send('Your NodeJS is Connnected');
})

app.listen(3333, ()=>{
    console.log('server is running on port 3333');
})