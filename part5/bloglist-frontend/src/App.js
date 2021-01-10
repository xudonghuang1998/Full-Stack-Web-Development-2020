import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const blogFormRef = useRef()
    const [blogs, setBlogs] = useState([])
    const [ success, setSuccess ] = useState(null)
    const [ error, setError ] = useState(null)
    const [user, setUser] = useState(null)
    let errorState = false

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const Success = ({ message }) => {
        if (message === null) {
            return null
        }
        return (
            <div className="success">
                {message}
            </div>
        )
    }

    const Error = ({ message }) => {
        if (message === null) {
            return null
        }
        return (
            <div className="error">
                {message}
            </div>
        )
    }

    const addBlog = async (blogObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            const returnedBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(returnedBlog))
        } catch (exception) {
            errorState = true
            setError('title/url must not be empty!')
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
        if(errorState){
            errorState = false
            return null
        }
        setSuccess(
            `a new blog ${blogObject.title} by ${blogObject.url} added`
        )
        setTimeout(() => {
            setSuccess(null)
        }, 5000)
    }

    const handleLogin = async (loginInformation) => {
        try {
            const user = await loginService.login(loginInformation)
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
        } catch (exception) {
            setError('Wrong credentials')
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    const handleLike = async (blog) => {
        const id = blog.id
        const updatedBlog = {
            user: blog.user,
            likes: blog.likes+1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }
        await blogService.update(id, updatedBlog)
        blogService.getAll().then(blogs => setBlogs( blogs ))
    }

    const handleDelete = async (blog) => {
        if (window.confirm(`Remove blog You're NOT gonna need it! by ${user.username}`)) {
            const id = blog.id
            await blogService.del(id)
            blogService.getAll().then(blogs => setBlogs( blogs ))
        }
    }

    const blogsSortedByLikesDesc = [...blogs].sort((currBlog, nextBlog) => {
        return nextBlog.likes - currBlog.likes
    })

    if (user === null ) {
        return (
            <div>
                <h2>log in to application</h2>
                <Error message={error} />
                <Togglable buttonLabel='login'>
                    <LoginForm
                        login={handleLogin}
                    />
                </Togglable>
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Success message={success} />
            <Error message={error} />
            <div>
                <p>{user.username} logged-in</p>
                <button onClick={handleLogout}>logout</button>
                <Togglable buttonLabel='new blog' ref={blogFormRef}>
                    <BlogForm createBlog={addBlog} />
                </Togglable>
            </div>
            {blogsSortedByLikesDesc.map(blog =>
                <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
            )}
        </div>
    )
}

export default App