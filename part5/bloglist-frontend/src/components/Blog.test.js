import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

let blog

beforeEach(() => {
    blog = {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
})

test('renders content', () => {
    const component = render(
        <Blog blog={blog} />
    )
    const li = component.container.querySelector('li')
    console.log(prettyDOM(li))
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.likes)
    expect(component.container).not.toHaveTextContent(blog.url)
})

test('clicking the view button', () => {
    const component = render(
        <Blog blog={blog} />
    )
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)

    expect(component.container).toHaveTextContent(blog.likes)
    expect(component.container).toHaveTextContent(blog.url)
})

test('clicking the like button twice calls event handler twice', () => {
    const mockHandler = jest.fn()
    const component = render(
        <Blog blog={blog} handleLike={mockHandler} />
    )
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
})
