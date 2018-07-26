const Post=require('./../models/Post');
const Tag=require('./../models/Tag');

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
		.populate('author').populate({path:'comments.author',select:'name'})
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
	},
	savePostAndTag:(req,res,next)=>{

		const request=req.body
		const tags=request.tags.map(function(item,index){
			return{title:item};
		});

		Tag.insertMany(tags,{ordered:false},function(err,savedtags){
			if(err){
				if(err.code=="11000"){
					Tag.find({"title":{"$in":request.tags}}).then(function(data){
						const post=new Post(request);
						post.tags=data.map(function(item,index){
							return item._id;
						})
						post.save((err,savedPost)=>{
							if(err)
								res.send(err);
							else
								res.send({post:savedPost,tags:data});
						});
					});
				}else{
					res.send(err);
				}

			}else{
				const post=new Post(request);
				post.tags=savedtags.map(function(item,index){
					return item._id;
				})
				post.save((err,savedPost)=>{
					if(err)
						res.send(err);
					else
						res.send({post:savedPost,tags:savedtags});
				});
			}

		})

	},
	savePostAndTagAsync:async(req,res,next)=>{
		const request=req.body;
		
		const post=new Post();
		const returnres=await post.savePostTags(request);
		res.send(returnres);
	}




}