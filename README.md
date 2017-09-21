# transistor

## Install
```console
$ npm install flying-transistor
```
## What's transistor?
Transistor helps you scaffold redux boilerplate, prescribing simple convention to help you stay productive.

## Usage
```console
$ transistor [operation] [thing] [resource] [options]
```

## Examples
- Generate a blueprint for a resource
```console
$ transistor g blueprint BlogPost

installing blueprint
  create constants/blog-post.js
  create actions/blog-post.js
  create reducers/blog-post.js

```
- Destroy a blueprint for a resource
```console
$ transistor d blueprint BlogPost

uninstalling blueprint
  remove constants/blog-post.js
  remove actions/blog-post.js
  remove reducers/blog-post.js

```
- Similarly generate/destroy actions/constants/reducers individually
```console
$ transistor [g/d] [constants/actions/reducer] BlogPost
```

If your redux app is not at the root directory of your project:

- Point to your redux app using the path option
```console
$ transistor [operation] [thing] [resource] --path ./path/to/redux/app
```
- Create a `.transistor` file inside your root directory (recommended) and set `PATH=./path/to/redux/app`

## What generated templates look like
```console
$ transistor g blueprint BlogPost

installing blueprint
  create constants/blog-post.js
  create actions/blog-post.js
  create reducers/blog-post.js

```
`constants/blog-post.js`
```javascript
export default {
  FETCH_BLOG_POST_REQUEST: 'FETCH_BLOG_POST_REQUEST',
  FETCH_BLOG_POST_SUCCESS: 'FETCH_BLOG_POST_SUCCESS',
  FETCH_BLOG_POST_FAILURE: 'FETCH_BLOG_POST_FAILURE',
  UPDATE_BLOG_POST: 'UPDATE_BLOG_POST',
  SAVE_BLOG_POST_REQUEST: 'SAVE_BLOG_POST_REQUEST',
  SAVE_BLOG_POST_SUCCESS: 'SAVE_BLOG_POST_SUCCESS',
  SAVE_BLOG_POST_FAILURE: 'SAVE_BLOG_POST_FAILURE'
};
```
`actions/blog-post.js`
```javascript
import constants from '../constants/blog-post';

export const fetchBlogPost = () => {};

export const updateBlogPost = () => {};

export const saveBlogPost = () => {};
```
`reducers/blog-post.js`
```javascript
import constants from '../constants/blog-post';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
  case constants.FETCH_BLOG_POST_REQUEST:
  case constants.FETCH_BLOG_POST_SUCCESS:
  case constants.FETCH_BLOG_POST_FAILURE:
  case constants.UPDATE_BLOG_POST:
  case constants.SAVE_BLOG_POST_REQUEST:
  case constants.SAVE_BLOG_POST_SUCCESS:
  case constants.SAVE_BLOG_POST_FAILURE:
    return state;
  default:
    return state;
  }
};
```
