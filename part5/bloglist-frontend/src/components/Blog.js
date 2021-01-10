import React, { useState }  from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [showDetails, setShowDetails] = useState(false)
    const toggleShowDetails = (event) => {
        setShowDetails((prevState) => !prevState)
    }

    if (!showDetails) {
        return (
            <div style={blogStyle}>
                <li className='blog'>
                    {blog.title} {blog.author}
                    <button
                        type="button"
                        onClick={toggleShowDetails}
                    >View
                    </button>
                </li>
            </div>
        )
    }

    return (
        <div style={blogStyle}>
            <p>Title: {blog.title}</p>
            <p>Url: {blog.url}</p>
            <div>
                Likes: {blog.likes}
                <button type="button" onClick={() => handleLike(blog)}>like</button>
            </div>
            <p>Author: {blog.author}</p>
            <button type="button" onClick={toggleShowDetails}>Hide</button>
            <button type="button" onClick={() => handleDelete(blog)}>delete</button>
        </div>
    )

}

export default Blog
