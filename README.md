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
$ transistor g blueprint blog-post

installing blueprint
  create constants/blog-post.js
  create actions/blog-post.js
  create reducers/blog-post.js

```
- Destroy a blueprint for a resource
```console
$ transistor d blueprint blog-post

uninstalling blueprint
  remove constants/blog-post.js
  remove actions/blog-post.js
  remove reducers/blog-post.js

```
- Similarly generate/destroy actions/constants/reducers individually
```console
$ transistor [g/d] [constants/actions/reducer] blog-post
```

If your redux app is not at the root directory of your project:

- Point to your redux app using the path option
```console
$ transistor [operation] [thing] [resource] --path ./path/to/redux/app
```
- Point to your redux app by creating a `.transistor` file inside your root directory (recommended)
```
# .transistor
PATH=./path/to/redux/app
```
