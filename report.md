# Report

```
after running the server and visiting http://localhost:3000
```

## /
```
TEST 1
As a user I want to get a lamb recipe
User type 'lamb' on text box
User press search button
Expected output: user should be able to see a list of recipes that contain the word 'lamb', or some kind of text saying 'no recipes with lamb'
Output: user sees word 'recipe' with no list of recipes
```

```
TEST 2
Edge case: testing output with no input
User press search button
Expected output: window saying 'please fill in the text field'
Output: user sees word 'recipe'
```

## /recipeStore
```
TEST 1
As a user I can go back to search
User press 'back to search' button
Expected output: be redirected to homepage
Output: successfully redirected to homepage
```

```
TEST 2
As a user I can add a new recipe
User fill in 'recipe name' text box
User fill in 'cooking time' text box
User fill in 'ingredients' text box
User fill in 'method' text box
Expected output: on the bottom of the page see recipe recently added
Output: no changes on page. The response code is 200.
COMMENTS: There isn't post(/recipestore) on index.js.
```

```
TEST 3
Edge case: testing output with none or/and missing input
Output: window appear saying 'please fill in all fields'
```

## /contact
```
As a user I can see the contact info on the page
Expected output: appropriate info is given
Output: appropriate info is given
```

## /register
```
TEST 1
As a user I can register with my details
User fill in diegogarcia on username text box
User fill in diego on first name text box
User fill in garcia on last name text box
User fill in 123456 on password text box
User press 'register account' button
Expected output: registration process should be completed
Output: there is no change on the page. We got a POST 500 error.
```

```
TEST 2
Edge case: testing response with none or just one input
User press 'register account' button
Expected output: window saying 'please fill in all fields'
Output: window saying 'please fill in all fields'
```

## /login
```
TEST 1
As a registered user I want to login with my details
User type diegogarcia on username text box
User type first name diego on 'first name' text box
Expected output: complete successful login
Output: TypeError: Cannot read property '0' of undefined
COMMENTS see line 54 of 'api-actions.js'. There is no id collected, and there empty object.
```

```
TEST 2
Edge case: testing response with none or just one input
Expected output: window saying 'please fill in all fields'
Output: window saying 'please fill in all fields'
```
