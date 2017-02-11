# linkedin-element

linkedin-element takes an oauth access token and returns the linkedin user profile. 

It also can be used to share a comment in your linkedin profile with the share(comment) method.

Example:
```html

<cordova-oauth id="oauth" client_id = "your-client-id"
        client_secret = "your-client-secret"
        oauth_token_url = "https://www.linkedin.com/oauth/v2/accessToken"
        oauth_authorization_url = "https://www.linkedin.com/oauth/v2/authorization"
        access_token="{{access_token}}"
        scopes="r_emailaddress r_basicprofile w_share"></cordova-oauth>

<linkedin-element access_token="[[access_token]]" user_data="{{profile}}"></linkedin-element>

```
