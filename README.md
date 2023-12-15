# MyPrimeAngularClient (Angular application)

This apps works in combination with <a href="https://github.com/pwela/movie_api">movie_api</a>, a server-side app hosted on heroku. You can find all the details related to the api in my GitHub repository.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.8.

## live app URL

https://pwela.github.io/MyPrime_angular_client/

<div>
<img alt="App screenshoot" src="/assets/homepage.png"/>
</div>

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Dependencies

- "@angular/animations": "^16.2.0",
- "@angular/cdk": "^16.2.10",
- "@angular/common": "^16.2.0",
- "@angular/compiler": "^16.2.0",
- "@angular/core": "^16.2.0",
- "@angular/forms": "^16.2.0",
- "@angular/material": "^16.2.10",
- "@angular/platform-browser": "^16.2.0",
- "@angular/platform-browser-dynamic": "^16.2.0",
- "@angular/router": "^16.2.0",
- "rxjs": "~7.8.0",
- "tslib": "^2.3.0",
- "zone.js": "~0.13.0"

# Key features:

## Main view

- Returns ALL movies to the user (each movie item with an image, title, and description)
- Filtering the list of movies with a “search” feature
- Ability to select a movie for more details
- Ability to log out
- Ability to navigate to Profile view

## Single Movie view

- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

## Login view

- Allows users to log in with a username and password

## Signup view

- Allows new users to register (username, password, email, date of birth)

## Profile view

- Displays user registration details
- Allows users to update their info (username, password, email, date of birth)
- Displays favorite movies
- Allows users to remove a movie from their list of favorites
- Allows existing users to deregister

## Optional Views & Features:

### Genre view

- Returns data about a genre, with a name and description
- Displays example movies

### the movie rating

- Allow users to access different movie information, such as genre description and director bio, without leaving the view (e.g., tooltips)
- Display a list of related or similar movies
