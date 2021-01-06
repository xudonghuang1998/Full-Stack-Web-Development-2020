const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (!blogs || blogs.length === 0)
        return null

    if (blogs.length === 1)
        return {
            title: blogs[0].title,
            author: blogs[0].author,
            likes: blogs[0].likes
        }

    const reducer = (sum, blog) => {
        if(blog.likes > sum.likes) {
            return {
                title: blog.title,
                author: blog.author,
                likes: blog.likes };
        }
        return sum
    }
    return blogs.length === 0 ? null : blogs.reduce(reducer, blogs[0]);
}

const mostBlogs = (blogs) => {
    const authors = blogs.map((blog) => blog.author)
    if (!authors || authors.length === 0) {
        return null
    }

    const reducer1 = (acc, curr) => {
        acc[curr] ? acc[curr]++ : (acc[curr] = 1)
        return acc
    }
    const countBlogsByAuthor = authors.reduce(reducer1, {})

    const reducer2 = (a, b) => (a[1] > b[1] ? a : b)
    const authorWithMostBlogsArray =  Object.entries(countBlogsByAuthor).reduce(reducer2, {})
    return {
        author: authorWithMostBlogsArray[0],
        blogs: authorWithMostBlogsArray[1],
    }
}

const mostLikes = (blogs) => {
    if (!blogs || blogs.length === 0)
        return null
    const reducer1 = (acc, curr) => {
        acc[curr.author] ? acc[curr.author]+=curr.likes : (acc[curr.author] = curr.likes)
        return acc
    }
    const amountOfLikesByAuthor = blogs.reduce(reducer1, {})

    const reducer2 = (a, b) => (a[1] > b[1] ? a : b)
    const authorWithMostLikesArray =  Object.entries(amountOfLikesByAuthor).reduce(reducer2, {})
    return {
        author: authorWithMostLikesArray[0],
        likes: authorWithMostLikesArray[1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}