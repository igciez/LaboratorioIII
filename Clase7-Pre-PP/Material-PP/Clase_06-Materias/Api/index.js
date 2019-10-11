var express =require("express");
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors(corsOptions));

var notas =[{"id":1,"legajo":"676228523278851518","nombre":"Risa Iacovaccio","materia":"Laboratorio III","nota":2},
{"id":5,"legajo":"5602238433399315","nombre":"Kippie Perkins","materia":"Laboratorio III","nota":5},
{"id":23,"legajo":"201748770329317","nombre":"Karia Wayt","materia":"Laboratorio III","nota":6},
{"id":24,"legajo":"372301516201771","nombre":"Sarajane Exley","materia":"Laboratorio III","nota":5},
{"id":3,"legajo":"3589648352931546","nombre":"Derron Claw","materia":"Laboratorio III","nota":3},
{"id":6,"legajo":"6759856687894340","nombre":"Albert Hackin","materia":"Laboratorio III","nota":6},
{"id":2,"legajo":"3533657603707396","nombre":"Morry Rickertsen","materia":"Laboratorio III","nota":5},
{"id":9,"legajo":"3565023385507614","nombre":"Alexa Emblen","materia":"Laboratorio III","nota":9},
{"id":4,"legajo":"560223967265816268","nombre":"Christy Androlli","materia":"Laboratorio III","nota":4},
{"id":28,"legajo":"3561441949296348","nombre":"Meade Shadbolt","materia":"Laboratorio III","nota":4},
{"id":11,"legajo":"374283951953207","nombre":"Efrem Allred","materia":"Laboratorio III","nota":8},
{"id":13,"legajo":"374622434595293","nombre":"Zebulen Wrefford","materia":"Laboratorio III","nota":7},
{"id":19,"legajo":"490581855131123330","nombre":"Gabriello Skipsea","materia":"Laboratorio III","nota":8},
{"id":10,"legajo":"5602212111640936578","nombre":"Emelina Porcher","materia":"Laboratorio III","nota":10},
{"id":14,"legajo":"3579361280357022","nombre":"Quintin Elcum","materia":"Laboratorio III","nota":5},
{"id":25,"legajo":"4917104305124749","nombre":"Frasco Kadwallider","materia":"Laboratorio III","nota":4},
{"id":17,"legajo":"6374369749280826","nombre":"Cal Aberchirder","materia":"Laboratorio III","nota":3},
{"id":18,"legajo":"060480074642759144","nombre":"Rolando Denford","materia":"Laboratorio III","nota":4},
{"id":22,"legajo":"4405856493704280","nombre":"Susana Pigott","materia":"Laboratorio III","nota":7},
{"id":20,"legajo":"3580837325213079","nombre":"Melanie Bjorkan","materia":"Laboratorio III","nota":9},
{"id":7,"legajo":"3589398965743652","nombre":"Mason Siege","materia":"Laboratorio III","nota":7},
{"id":8,"legajo":"5602219195351165","nombre":"Zahara Aust","materia":"Laboratorio III","nota":8},
{"id":21,"legajo":"6397497002071898","nombre":"Madelaine FitzGibbon","materia":"Laboratorio III","nota":4},
{"id":26,"legajo":"3532736602402489","nombre":"Shandra Bortolomei","materia":"Laboratorio III","nota":2},
{"id":12,"legajo":"3530834995836678","nombre":"Deirdre Freckelton","materia":"Laboratorio III","nota":4},
{"id":27,"legajo":"3545112847496097","nombre":"Sherman Linning","materia":"Laboratorio III","nota":2},
{"id":29,"legajo":"3553624400390276","nombre":"Kali Pach","materia":"Laboratorio III","nota":8},
{"id":15,"legajo":"5472929074706761","nombre":"Bridget Bunston","materia":"Laboratorio III","nota":8},
{"id":16,"legajo":"3569566478911578","nombre":"Amos Genthner","materia":"Laboratorio III","nota":4},
{"id":30,"legajo":"3540161132933533","nombre":"Sheffy Golley","materia":"Laboratorio III","nota":10}];

app.get("/notas",function(req,res){
    
    res.send(notas);
});
app.post("/login",function(req,res){
    setTimeout(function(){
        console.log("Llego al servidor "+JSON.stringify(req.body));
        
       
        if(req.body.email!=undefined && req.body.password!=undefined){
            if(req.body.email==="usuario"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'User'}")
                res.send({'type': 'User'});    
            }else if(req.body.email==="admin"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'Admin'}")
                res.send({'type': 'Admin'});    
            }else{
                console.log("Sale del servidor "+"{'type': 'error'}")
                res.send({'type': 'error'});
            }
            return;
        }
        console.log("Sale del servidor "+"{'type': 'error'}")
        res.send({'type': 'error'});
    },2000);
    
});

app.post("/editarNota",function(req,res){
    setTimeout(function(){
        console.log("Llego al servidor "+JSON.stringify(req.body));
       
        if(req.body.id!=undefined && req.body.legajo!=undefined && req.body.nombre!=undefined && req.body.materia!=undefined && req.body.nota!=undefined){
           
			for(var i =0;i<notas.length;i++){
				if(notas[i].id == req.body.id){
					notas[i].nombre = req.body.nombre;
					notas[i].legajo =req.body.legajo;
					notas[i].materia = req.body.materia;
					notas[i].nota = req.body.nota;
					res.send({'type': 'ok'});
					console.log("Sale del servidor "+"{'type': 'error',{'type': 'ok'}")
					return;
					
				}
			}
                res.send({'type': 'error','message':'No exite la nota que se quiere modificar'});
				console.log("Sale del servidor "+"{'type': 'error','message':'No exite la nota que se quiere modificar'}")
            return;
        }else{
			console.log("Sale del servidor "+"{'type': 'error','message':'Faltan datoas'}")
			res.send({'type': 'error','message':'Faltan datoas'});	
		}
        
    },2000);
    
});

app.listen(3000,function(){
    console.log("Api en el puerto 3000");
});