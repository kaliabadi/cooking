# Test Cases

# **Register Page**

**\*Given*** I am a hungry user

**\*When*** I enter the following details on the register page:

Username: JBfood

First name: Joe

Last name: Bloggs

Password: hungry

**\*Then*** I am presented with a message confirming my registration

\---------

**\*Given*** I am a hungry user

**\*When*** I miss out details whilst trying to register

**\*Then*** I am shown an error message

\---------

**\*Given*** I am a hungry user

**\*When*** I type my password to register

**\*Then*** it does not appear on screen



# **Login Page**

**\*Given*** I am a registered user

**\*When*** I visit the login page and enter my username and password

**\*Then*** I receive a message confirming that I am logged in

----------

**\*Given*** I am a unregistered user

**\*When*** I try to log in

**\*Then*** I receive an error message

----------

**\*Given*** I am a hungry user

**\*When*** I miss out a field on the log in page

**\*Then*** I receive an error message



# **Contact Page**

**\*Given*** I am a hungry user

**\*When*** I visit the contact page

**\*Then*** I am presented with the following contact information:

contact Kouros Aliabadi at: [kaliabadi@qaworks.com![img](http://jira.ecs.digital/images/icons/mail_small.gif)](mailto:kaliabadi@qaworks.com)



# **Recipe Store**

**\*Given*** I am a hungry user with a recipe

**\*When*** I enter the following information on the recipe store page:

Recipe name: Chicken Pasta

Cooking Time: 7 minutes

Ingredients: Chicken, pasta, seasoning

Method: Cook pasta, cook chicken, mix together and add seasoning

**\*Then*** I will see the Chicken Pasta recipe in my recipe list

----------

**\*Give*** that I am a hungry user with a recipe

**\*When*** I miss out any of the fields on the recipe store page

**\*Then*** an error is shown on the page asking me to fill in the missing fields

# **Search Page (also homepage)**

**\*Given*** I am a hungry user with some chicken

**\*When*** I visit cookbook and search for recipes with chicken

**\*Then*** I am shown a list of chicken recipes

---------------

**\*Given*** I am a hungry user

**\*When*** I search for recipes

**\*Then*** I am shown a loading indicator

\------------

**\*Given*** I am a hungry user with no ingredients

**\*When*** I search without any ingredients

**Then** I am shown an error message

\-----------

**\*Given*** I am a hungry user

**\*When*** I search using punctuation, including spaces

**\*Then*** I am shown an error message
