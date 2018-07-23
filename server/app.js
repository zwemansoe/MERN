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

	})
}catch(error){
	console.log(error);
}

let port=5000 || process.env.PORT

routes(router);
app.use(cors());
app.use(bodyParser.json())

app.use('/api',router);

app.listen(port,()=>{
	console.log(`Server started at port:${port}`);
});