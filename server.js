var express = require('express');

var app = express();
 var bodyParser = require('body-parser');
 var path = require('path');
 var User = require('./model/model');
 var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('view engine','ejs');
//app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname));

//compileX
var compiler = require('compilex');
var option = {stats : true};
compiler.init(option);


app.get('/' , function (req , res ) {

    res.render('index',{
        
        title: 'Online Code Editor',
    });

});


app.post('/compilecode' ,async(req , res )=> {
    
	var code = req.body.code;	
	var input = req.body.input;
    var inputRadio = req.body.inputRadio;
    var lang = req.body.lang;

    var newUser = User({
        code :req.body.code,	
        input :req.body.input,
        inputRadio :req.body.inputRadio,
        lang :req.body.lang,
        
     });
    if((lang === "C") || (lang === "C++"))
    {        
        if(inputRadio === "true")
        {    
        	var envData = { OS : "windows" , cmd : "g++"};	   	
        	compiler.compileCPPWithInput(envData , code ,input , function (data) {
               
                  // save the user
            newUser.save(function(err) {
               if (err) throw err;
  
              console.log('User created!');
               });
                res.render("output",{
                    data:data.output,
                    err:data.error,
                })
        	
                
        		
        	});
	   }
	   else
	   {
	   	
	   	var envData = { OS : "windows" , cmd : "g++"};	   
        	compiler.compileCPP(envData , code , function (data) {
               
                
                 // save the user
           newUser.save(function(err) {
              if (err) throw err;
 
             console.log('User created!');
              });
                res.render("output",{
                    data:data.output,
                    err:data.error,
                })
        	
    
            });
	   }
    }
   
    if( lang === "Python")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "windows"};
            compiler.compilePythonWithInput(envData , code , input , function(data){
               
                
                 // save the user
           newUser.save(function(err) {
              if (err) throw err;
 
             console.log('User created!');
              });
                res.render("output",{
                    data:data.output,
                    err:data.error,
                })
            });            
        }
        else
        {
            var envData = { OS : "windows"};
            compiler.compilePython(envData , code , function(data){
               
               
                 // save the user
           newUser.save(function(err) {
              if (err) throw err;
 
             console.log('User created!');
              });
                res.render("output",{
                    data:data.output,
                    err:data.error,
                })
            });
        }
    }
   
   


});

app.get('/fullStat' , function(req , res ){
    compiler.fullStat(function(data){
        res.send(data);
    });
});
compiler.flush(function(){
    console.log('All temporary files flushed !'); 
    }); 

app.listen(3000);
