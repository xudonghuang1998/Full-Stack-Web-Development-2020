describe('Blog app', () => {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            username: 'test',
            password: 'admin'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log in to application')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()

            cy.get('#username').type('test')
            cy.get('#password').type('admin')
            cy.get('#login-button').click()
            cy.contains('test logged-in')
        })

        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('test')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('html').should('not.contain', 'test logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'test', password: 'admin' })
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('title for test')
            cy.get('#author').type('author for test')
            cy.get('#url').type('url for test')
            cy.get('#create-button').click()
            cy.contains('a new blog title for test by url for test added')
        })

        describe('add some blogs', function () {
            beforeEach(function () {
                cy.createBlog({title: 'first blog', author: 'first author', url: 'first url', likes: 10})
                cy.createBlog({title: 'second blog', author: 'second author', url: 'second url', likes: 15})
                cy.createBlog({title: 'third blog', author: 'third author', url: 'third url', likes: 30})
            })

            it('like the second blog', function () {
                cy.contains('second blog')
                    .contains('View')
                    .click()
                cy.contains('like').click()
                cy.contains('Likes').contains(16)
            })

            it('delete the third blog', function () {
                cy.contains('third blog')
                    .contains('View')
                    .click()
                cy.contains('delete').click()
                cy.get('html').should('not.contain', 'third blog')
            })
        })
    })

})
