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
            user: 'YOUR_EMAIL',
            pass: 'YOUR_PASSWORD'
        }
    });
    
    const mailOptions ={
        from : 'YOUR_EMAIL',
        to: email, // RECEIVER EMAIL
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
