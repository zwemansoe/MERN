const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');

const routes=require('./routes/')
const app=express();
const router=express.Router();
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

const url=process.env.MONGODB_URI || "mongodb://localhost:27017/mernstack"

try{
	mongoose.connect(url,{
		useNewUrlParser:true
	})
}catch(error){
	console.log(error);
}

let port=5000 || process.env.PORT

routes(router);

const corsOptions={
	origin:'http://localhost:3000',
	credentials:true
}
app.use(cors(corsOptions));
app.use(bodyParser.json())

app.use('/api',router);


app.set('port',(process.env.PORT||5000));
app.listen(app.get('port'),function(){
	console.log('Node app is running on port ',app.get('port'));
});