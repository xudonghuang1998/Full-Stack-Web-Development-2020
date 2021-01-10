import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleBlogChange = (event) => {
        setNewBlog(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlog,
            author: newAuthor,
            url: newUrl
        })

        setNewBlog('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
        <div className="formDiv">
            <h2>Create a new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        id='title'
                        value={newBlog}
                        name="Title"
                        onChange={handleBlogChange}
                    />
                </div>
                <div>
                    author:
                    <input
                        id='author'
                        value={newAuthor}
                        name="Author"
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url:
                    <input
                        id='url'
                        value={newUrl}
                        name="Url"
                        onChange={handleUrlChange}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        id='create-button'
                    >create</button>
                </div>
            </form>
        </div>
    )
}
export default BlogForm