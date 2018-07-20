const Post=require('./../models/Post');

module.exports={

	addPost:(req,res,next)=>{
		console.log(req.body);
		const savePost=req.body;
		const post=new Post(savePost);

		if(!savePost._id){
			post.save((err,newPost)=>{
				if(err)
					res.send(err)
				else if(!newPost)
					res.send(400)
				else	
					res.send(newPost)
				next()
			});
		}else{
			Post.findById(req.body._id,function(err,post){
				if(err) return handleError(err);
				post.set(savePost)
				post.save((err,updatePost)=>{
					if(err)
						res.send(err)
					else if(!updatePost)
						res.send(400)
					else
						res.send(updatePost)
					next()
				});
			});

		}

	},

	getPost:(req,res,next)=>{
		const postid=req.params.id;
		Post.findById(postid)
		.populate('author')
		.exec((err,post)=>{
			if(err)
				res.send(err)
			else if(!post)
				res.send(404)
			else
				res.send(post)
			next()
		});
	},
	getAllPost:(req,res,next)=>{
		Post.find().populate('author').exec((err,posts)=>{
			if(err)
				res.send(err)
			else if(!posts)
				res.send(404)
			else
				res.send(posts)
			next()
		})
	}







}