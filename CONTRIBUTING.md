# Contribution

Contribute to this project, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer


## Steps to contribute

* Comment on the issue you want to work on. Make sure it's not assigned to someone else.

* If you think an algorithm is missing, create an issue.

* I used winston to log the errors and information, If you want to `console.log` errors you can use `winston.log` or `winston.error` 

* I use `bcrypt` to encrypt passwords before saving to database and decrypting after fetching from database

* I use `Joi` package to validate input 

* I use `Config` package to configure environment variables and configuration 

### Making a PR

> - Make sure you have been assigned the issue to which you are making a PR.
> - If you make PR before being assigned, It will be labeled `invalid` and closed without merging.

* Fork the repo and clone it on your machine.
* Add a upstream link to main branch in your cloned repo
    ```
    git remote add upstream https://github.com/ahmeddrawy/my-udemy
    ```
* Keep your cloned repo upto date by pulling from upstream (this will also avoid any merge conflicts while committing new changes)
    ```
    git pull upstream master https://github.com/ahmeddrawy/my-udemy
    ```
* install npm dependencies 
    ```
    npm install 
    ````
* Create your feature branch
    ```
    git checkout -b <feature-name>
    ```
* Commit all the changes
    ```
    git commit -m "Meaningful commit message"
    ```
* Push the changes for review
    ```
    git push origin <branch-name>
    ```
* Create a PR from our repo on Github.

### Additional Notes

* Code should be properly commented to ensure it's readability.
* If you've added code that should be tested, add tests as comments. .
* Make sure your code properly formatted.
* Make sure to maintain a proper directory structure:
    ```
    <Language>/<Algorithms>/<Algorithm Paradigm>/<. . .>
    ```
    ```
    <Language>/<Data Structures>/<Data Structure name>/<. . .>
    ```
* Issue that pull request!


## Issue suggestions/Bug reporting

When you are creating an issue, make sure it's not already present. Furthermore, provide a proper description of the changes. If you are suggesting any code improvements, provide through details about the improvements.

**Great Issue suggestions** tend to have:

- A quick summary of the changes.
- In case of any bug provide steps to reproduce
  - Be specific!
  - Give sample code if you can. 
  - What you expected would happen
  - What actually happens
  - Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)


## References

This document was adapted from the open-source contribution guidelines for [Facebook's Draft](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md)
