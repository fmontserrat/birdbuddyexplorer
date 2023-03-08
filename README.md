# Bird Buddy Explorer

Unofficial webapp client for [Bird Buddy](https://mybirdbuddy.com/). 

The app leverages the GraphQL interface of Bird Buddy (requires an account) and the monthly reports published at [live.mybirdbuddy.com](https://live.mybirdbuddy.com).

Available features about birds:

- Search bird by species
- See the first 100 feed pictures
- See the badges and diets of birds
- Play the sounds of birds

Available insights about data:

- Map visualization of the anonymized records
- Monthly stats about anonymized records
- Monthly chart representation of anonymized records

## Open app from browser
The app is deployed at:
https://fmontserrat.github.io/birdbuddyexplorer

**NOTE: Due to CORS checks at the BirdBuddy GraphQL API side, the app can only be used from the internet with disabled CORS extensions such as [this one](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)**

**NOTE of the NOTE: Disabled CORS is dangerous. Do not use the extension on other sites**

## Set up a local version of the app in your computer

Clone the repository

### Install requirements if needed

- NodeJS https://nodejs.org/en/download/
- Git https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

Once NodeJS is installed

```handlebars
$ npm install --global yarn
```

### Download source code, build and start app

```
$ git clone git@github.com:fmontserrat/birdbuddyexplorer.git
$ cd birdbuddyexplorer
```

Install dependencies (one time)
```
yarn install
```

Start app
```
yarn start
```

Open your browser and copy this address:
http://localhost:3000/birdbuddyexplorer

At this point you are running the app on your computer :-)