import React from 'react';
import GoogleLogin from 'react-google-login';
import * as Constants from './constants';

const LoginPage = (props) => {
    return (
        <div className="text-center">
            <GoogleLogin
                clientId={Constants.GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={(resp) => {
                    const dataToPost = { token: resp.accessToken, email: resp.Tt.Du, name: resp.Tt.Bd, profilePicture: resp.Tt.SK };
                    fetch(Constants.SERVER_GOOGLE_OAUTH_URL, {
                        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                        method: 'POST',
                        body: JSON.stringify(dataToPost),
                    })
                        .then((resp) => {
                            return resp.json();
                        })
                        .then((data) => {
                            props.onLogin(data);

                            // Redirect to / - ideally, this component would recieve a url to redirect to after a successful login.
                            props.history.push('/');
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    console.log(resp);
                }}
                onFailure={(resp) => {
                    console.log(resp);
                }}
                cookiePolicy="single_host_origin"
            />
        </div>
    );
};

export default LoginPage;
