const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0)

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((favorite, blog) => favorite = favorite.likes > blog.likes ? favorite : blog,0)

  return {
    'title': favorite.title,
    'author': favorite.author,
    'likes': favorite.likes
  }

}

  
module.exports = {
  dummy, totalLikes, favoriteBlog
}