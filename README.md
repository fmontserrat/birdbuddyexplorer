# Bird Buddy Explorer

### Live at https://fmontserrat.github.io/birdbuddyexplorer

Unofficial webapp client for [Bird Buddy](https://mybirdbuddy.com/).

![Screenshot 2023-03-08 at 22 03 21](https://user-images.githubusercontent.com/936743/223857131-ece725ce-37dc-44e4-8542-22ad694732b5.png)

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

**NOTE: Due to CORS checks at the BirdBuddy GraphQL API side (that's a good thing), the app can only be used from the internet with disabled CORS extensions such as [this one](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)**

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

## Log In

Google and Facebook SSO authentication is not supported due to the security of those processes not allowing it (that is a good thing). Hacks and workarounds are possible but not planned or worth the effort and risk of being banned.

To log into the app use Bird Buddy login and password. 

If your account uses Google or Facebook SSO, you can create a new one from the Android or iOS app (log out, sign up and log back into your own account) and use those credentials for this app.

*NOTE: The app does not access your feeder, only community data for with login is still necessary. There is no need to invite your new account into your feeder.*

## Access without logging in

At the login page select a bird from the list below the login input You'll be able to see reports without API access. No pictures, icons, sounds or other bird data outside of reports will be visible.
