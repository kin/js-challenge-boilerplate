# KinOcr

## Instructions
- To run the app, use the "npm start" task.
- To run the unit-tests:
  - use the "npm run test" task to invoke a single test run and generate coverage
  - use the "npm run test:watch" task to invoke the test runner in watch mode

## Zach's Development Assumptions

- No CSS Framework

  In the instructions for this challenge it said not to use a "css framework (e.g., Material UI or Bootstrap)." Material UI is a component library for React, so I took that statement to mean that I should not use "Angular Material" too since that is component library. To meet this requirement, I pragmatically rolled my own UI components where I thought they might be needed. Moreover, the UI components I created are "down-and-dirty" and have just the necessary functionally to provide a bare-minimum UX that I could live with for this project. These components also used just the provided color palette variables for theming. Given the opportunity to use Angular Material I would have used the out-of-box extensiblity to re-theme the Angular Material components with the provided palettes, and likewise use the Angular Material mixins to theme other components in the app.

  <b>Note:</b> I used the [@angular/cdk](https://www.npmjs.com/package/@angular/cdk) package to help with some basic component tooling.

- State Management
  
  Nothing was really said about state mangagement in the instructions, but I bet you may be using [NGRX](https://ngrx.io/) and likewise may be looking for it in this app. I opted not to use it in here in the interest of time, and even though I feel like I know more about it than most folks and have used it down in the trenches on many projects, I'm not sure it is always the right tool for the job. For example, there is a lot of plumbing required to really get the benefits of using it (actions, reducers, selectors, effects, etc.). However, if needed, I can provide examples of the folder structure and artifacts I usually create to add NGRX to an app or feature module.

  
  As an alternative, I have included a state management mechanism that I have used over the years that is based on the [state pattern](https://refactoring.guru/design-patterns/state). You can find a brief explanation of my implementation of it [here](/src/app/file-upload/models/states/README.md) and it is streamline to work with Angular's signals and OnPush change detection.

- Unit Testing
  
  I swapped out Karma and Jasmine for [Jest](https://jestjs.io/). My main reasoning for this is that I've used Jest for years on almost every Angular project instead of the stuff out of the box because with karma/jasmine I have experienced builds in CICD pipelines that took much longer to complete compared to using Jest. Additionally, I like to use a Test-Driven Development workflow when I can, and after using Jest for a while I found I was able to do this easier and have more meaningful tests because Jest has support for TDD that karma/jasmine did not. For example, being able to mock up other ES modules before they even exist in the code is a nice feature. Lastly, the [Angular team is eliminating Karma/Jasmine in future releases in favor of more modern test frameworks](https://blog.angular.dev/moving-angular-cli-to-jest-and-web-test-runner-ef85ef69ceca).

  <b>Note:</b> I didn't shoot for a high level of code coverage, but I did provide tests for a variety of artifacts like Components, Directives, state functions, domain code, etc.

## Documentation
Links to other documention in this app:
- [File Upload Feature Module](src/app/file-upload/README.md)
- [Shared Module](src/app/shared/README.md)

## Nice to Haves

The following are nice to haves that I decided not to implement based on my own limited time:
- Micro-frontend Architecture
  - I wanted to show splitting the app into a shell and a feature micro-frontend for the file upload, and likewise show how mobile and desktop views could benefit from this architecture as well as the development and deployment workflow.
  - This is pretty trivial to do with Angular nowadays, but it required a different project structure, with two different deployable apps that come from 2 separate git repos (not a mono-repo). Plus to really show it off, you should have at least one separate NPM package that the micro-frontends could share. For example, a User Context Service or Caching Service could be added to a published NPM package and shared between the different micro-frontends so that they could use the same singleton services.

- Pager/Paging for the Policy Record lists and tables
  - I noticed that when the CSV file gets closer to the 2mb limit, that the UI becomes less responsive due to all the rows that were rendered.
  - To remedy this, I first added the [virtual scroll](https://material.angular.io/cdk/scrolling/overview#virtual-scrolling) from Angular's CDK library to test if it would make a difference. It made somewhat of a difference but <b>I decided to pull it out</b> because of the following trade-offs:
    - The directives haven't been updated to use the newer Angular "@for" control flow syntax yet.
    - Using the old template syntax is not as succinct as the control flow syntax; implementing things like the "last", "odd", "index" and adding the "trackBy" function for "ngFor" added a lot of noise in the code and html.
    - Once implemented, the UX was slightly affected because it made it difficult to detect, by glancing at the scroll bar, how many records were contained in the list.
  - <b>Really a better UX would be limit the number of items that are rendered in the lists through a mechanism like frontend paging, which would keep the page responsive. But since I'm not using UI tooling like Angular Material, and even though my first instinct was to "roll my own" since I've done it a bunch of times in the past, I decided not to do this here in the interest of time.</b>