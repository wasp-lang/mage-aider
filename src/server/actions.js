import HttpError from '@wasp/core/HttpError.js'

export const createPost = async ({ title, content }, context) => {
  if (!context.user) { throw new HttpError(401) }

  return await context.entities.Post.create({
    data: {
      title,
      content,
      author: { connect: { id: context.user.id } }
    }
  });
}

export const editPost = async ({ id, title, content }, context) => {
  if (!context.user) { throw new HttpError(401); }
  const post = await context.entities.Post.findUnique({ where: { id } });
  if (!post || post.authorId !== context.user.id) { throw new HttpError(403); }
  return context.entities.Post.update({
    where: { id },
    data: { title, content }
  });
}

export const createComment = async ({ postId, text }, context) => {
  if (!context.user) { throw new HttpError(401); }

  const newComment = await context.entities.Comment.create({
    data: {
      text: text,
      postId: postId,
      authorId: context.user.id
    }
  });

  return newComment;
}
