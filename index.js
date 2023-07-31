const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.get('/login',(req, res)=>{
    res.send(`<!doctype html><html lang="en"><head><!-- Required meta tags --><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><!-- Bootstrap CSS --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"><title>Hello, world!</title></head><body><form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" class="m-5" action="/chats" method="POST">
            
            <input type="text" name="title" id="username" class="w-25 form-control">
            
            <button class="btn btn-primary mt-3">Submit</button>

        </form><!-- Optional JavaScript --><!-- jQuery first, then Popper.js, then Bootstrap JS --><script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script></body></html>`)
});
app.post('/chats',(req, res)=>{
    res.redirect('/');
});
app.get('/',(req, res)=>{
    fs.readFile('chats.txt',(err,data)=>{
        if(err){
            data = 'no chat exist';
            console.log(err);
        }
        res.send(`<!doctype html><html lang="en"><head><!-- Required meta tags --><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><!-- Bootstrap CSS --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"><title>Hello, world!</title></head><body>
                <h3>${data}</h3>
                <form onsubmit="document.getElementById('user').value=localStorage.getItem('username')" class="m-5" action="/" method="POST">
            
                    <input type="text" name="message" placeholder="type..." class="w-25 form-control">
                    
                    <input type="hidden" id="user" name="username" placeholder="type..." class="w-25 form-control">
                    
                    <button class="btn btn-primary mt-3">Send message</button>

                </form><!-- Optional JavaScript --><!-- jQuery first, then Popper.js, then Bootstrap JS --><script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script></body></html>`
        )
    })

});
app.post('/',(req, res)=>{
    console.log('getting data',req.body.message);
    fs.writeFile('chats.txt',` ${req.body.username} : ${req.body.message} `,{flag:'a'},(err)=>{
        err? console.log(err) : console.log('data saved');
    });
    res.redirect('/');
});



const port = process.env.PORT || 3000;
app.listen(port,'localhost',()=>{
    console.log('server working!');
});