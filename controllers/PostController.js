import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()
        res.json(posts)
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id
        const updatedPost = await PostModel.findOneAndUpdate(
            {
                _id: postId
            },
            {
                $inc: { viewsCount: 1 }
            },
            {
                new: true
            }
        )
        if (!updatedDoc) {
            return res.status(404).json({ message: 'Not found' })
        }
        res.json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error geting one'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id
        const deletedPost = await PostModel.findOneAndDelete({
            _id: postId
        })
        if (!deletedPost) {
            return res.status(404).json({ message: 'Not found' })
        }
        res.json({
            success: true
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error delete one'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        })

        const post = await doc.save()
        res.json(post)

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Post create error'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        const updatedPost = await PostModel.updateOne({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            tags: req.body.tags
        })
        if(!updatedPost) {
            return res.status(404).json({ message: 'Not found' })
        }
        res.json(updatedPost)
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Post update error'
        })
    }
}