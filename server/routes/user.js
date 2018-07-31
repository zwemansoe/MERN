var JwtAuthMiddleware=require("./../Middlewares/JwtAuthMiddleware");
const usercontroller=require('./../controllers/UserController');
module.exports=(router)=>{

	router
		.route('/user/:id')
		.get(usercontroller.getUser)

	router
		.route('/user',function(){console.log('ok')})
		.post(usercontroller.addUser)	

	router
		.route('/users/')
		.get(usercontroller.getAllUser)
	
}