const postController=require('./../controllers/PostController');

module.exports=(router)=>{
	router
		.route('/post/:id')
		.get(postController.getPost)

	router
		.route('/post')
		.post(postController.addPost)

	router
		.route('/posttag')
		.post(postController.savePostAndTagAsync)	

	router
		.route('/posts/')
		.get(postController.getAllPost)	
}