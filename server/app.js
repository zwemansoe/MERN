const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');

const routes=require('./routes/')
const app=express();
const router=express.Router();
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

const url="mongodb://zweman:zwemansoe6@ds161411.mlab.com:61411/mernstack-db" || "mongodb://localhost:27017/mernstack"

try{
	mongoose.connect(url,{
		useNewUrlParser:true
	})
}catch(error){
	console.log(error);
}

let port=5000 || process.env.PORT

routes(router);
app.use(cors());
app.use(bodyParser.json())

app.use('/api',router);


app.set('port',(process.env.PORT||5000));
app.listen(app.get('port'),function(){
	console.log('Node app is running on port ',app.get('port'));
});