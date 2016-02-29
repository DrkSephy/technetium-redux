# technetium-redux

## Project Setup

This project is written using the [latest version of node.js](https://nodejs.org/en/download/), which supports ES6 natively. Installing node.js will also install the `npm` package manager. Once you have this, simply run the following command in the root directory of this project: 

```bash
npm install
```

This will install all of the dependencies listed within `package.json`. 

> Mac OS X users will need to run `sudo npm install`. 

`gulp` is used for building the project, which can be installed by doing:

```bash
npm install gulp
```

> Mac OS X users will need to run `sudo npm install gulp`.

Next, [download mongodb](https://www.mongodb.org/downloads#production).

Lastly, create a file `secrets.js` in the root directory which contains the following information:

```javascript
module.exports = {
  USERNAME: '', // Bitbucket Username
  PASSWORD: '', // Bitbucket Password
  database: 'localhost', // Setup MongoDB connection url
  consumerKey: '', // Bitbucket Consumer Key
  consumerSecret: '' // Bitbucket Consumer Secret
}
```

Obtaining a `consumer key` and `consumer secret` can be done by following the OAuth 2.0 steps [here](https://confluence.atlassian.com/bitbucket/oauth-on-bitbucket-cloud-238027431.html). 

> **NOTE**: `secrets.js` is a file which is ignored by gitignore, so this file will never be pushed into your repository unless done by force. 

## Running the project

Once all of these pre-requisites have been installed, open three different terminal tabs. In each tab, run the following commands:

```bash
gulp
```

This will build all the necessary files, and watch for any file changes.

```bash
npm run watch
```

This will run the development server, which will watch for any file changes and re-compile all source files. 

```bash
mongod
```

This will start a MongoDB instance, which our application will connect to. 

With this, the application can be used by navigating to `localhost:3000`. 



## Feature Roadmap

### Version Control Systems

- [ ] Works for .git repositories
- [ ] Works for .hg repositories

### Reports

- [X] Number of issues opened per contributor on a repository
- [X] Number of issues closed per contributor on a repository
- [X] Number of issues assigned per contributor on a repository
- [X] Number of issue comments per contributor on a repository
- [X] Number of pull requests per contributor on a repository
- [X] Number of lines of code per contributor on a repository
- [X] Number of commits per contributor on a repository

### Visualizations

- [X] Commit graphs over time
- [ ] Issues closed over time graphs (Possibly a bar graph)
- [ ] Percentage of work done by each contributor relative to total work
 
### Date Range Component 

- [ ] Ability to filter commits based on time (should also work for issues)
- [ ] Custom Date Picker

### Authentication

- [ ] Application needs OAuth 1.0/2.0 Auth in order to access private repositories

### Subscriptions

- [ ] User should be able to subscribe to a repository based on a URL

### Search

- [ ] Ability to search for a list of repositories by username
- [ ] Filter returned search results by time (3 months, 6 months, custom)

### Wiki Comments

- [ ] Tracking for Wiki Commits

### Report Generation

- [ ] Should export PDF (or other formats) of all data in [reports](https://github.com/DrkSephy/technetium-redux#reports) and [visualizations](https://github.com/DrkSephy/technetium-redux#visualizations)

### CSV Uploader

- [ ] User can upload a CSV, select keys and display a visualization