const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blogs should contain id property', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const newBlog = {
        title: 'blog_test',
        author: 'Test',
        url: 'www.test.com',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()

    const titles = blogsInDb.map(r => r.title)

    expect(blogsInDb).toHaveLength(initialBlogs.body.length+1)
    expect(titles).toContain(
        'blog_test'
    )
})

test('if like property is misssing from req, it will default to value 0', async () => {
    const newBlog = {
        title: 'blog_test',
        author: 'Test',
        url: 'www.test.com'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
})

test('if title/url property is misssing from req, fails with statuscode 404', async () => {
    const newBlog = {
        title: 'blog_test',
        author: 'Test',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('delete succeeds with status 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const ids = blogsAtEnd.map(r => r.id)
    expect(ids).not.toContain(blogToDelete.id)
})

afterAll(() => {
    mongoose.connection.close()
})

test('update succeeds if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: 10 })

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    expect(updatedBlog.likes).toBe(10)
})