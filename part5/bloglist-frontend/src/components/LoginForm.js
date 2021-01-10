import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = ({ target }) => setUsername(target.value)
    const handlePasswordChange = ({ target }) => setPassword(target.value)

    const handleSubmit = (event) => {
        event.preventDefault()
        login({ username, password })

        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={ handleSubmit }>
                <div>
                    username
                    <input
                        id='username'
                        value={ username }
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        id='password'
                        type="password"
                        value={ password }
                        onChange={ handlePasswordChange }
                    />
                </div>
                <button
                    id='login-button'
                    type="submit"
                >login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
}

export default LoginForm