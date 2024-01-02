import HttpError from '@wasp/core/HttpError.js'

export const getPosts = async (args, context) => {
  return context.entities.Post.findMany({
    select: {
      id: true,
      title: true,
      author: {
        select: {
          username: true
        }
      }
    }
  });
}

export const getPost = async ({ id }, context) => {
  const postId = parseInt(id);
  if (isNaN(postId)) throw new HttpError(400, 'Invalid post ID');

  const post = await context.entities.Post.findUnique({
    where: { id: postId },
    include: {
      author: true,
      comments: {
        include: {
          author: true
        }
      }
    }
  });

  if (!post) throw new HttpError(404, 'Post with id ' + id + ' not found');

  return post;
}

export const getPostForEdit = async ({ postId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const post = await context.entities.Post.findUnique({
    where: { id: parseInt(postId) },
    include: { author: true }
  });

  if (!post) throw new HttpError(404, 'Post not found');
  if (post.authorId !== context.user.id) throw new HttpError(403, 'Not authorized to edit this post');

  return post;
}