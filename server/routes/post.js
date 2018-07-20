const postController=require('./../controllers/postController');

module.exports=(router)=>{
	router
		.route('/post/:id')
		.get(postController.getPost)

	router
		.route('/post')
		.post(postController.addPost)

	router
		.route('/posts/')
		.get(postController.getAllPost)	
}