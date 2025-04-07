import React from 'react'
import '/src/assets/login/css/login.css';

const Login = () => {
  return (
    <div className="form-bg">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4 col-md-offset-4">
                    <div className="form-container">
                    <div className="form-icon">
                        <i className="fa fa-user" />
                    </div>
                    <h3 className="title">Login</h3>
                    <form className="form-horizontal">
                        <div className="form-group">
                        <label>email</label>
                        <input
                            className="form-control"
                            type="email"
                            placeholder="email address"
                        />
                        </div>
                        <div className="form-group">
                        <label>password</label>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="password"
                        />
                        </div>
                        <button type="button" className="btn btn-default">
                        Login
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login

