# KinOcr

## Instructions

Your Kin recruiting contact should have sent you a set of instructions for this test.

## How to use this boilerplate

We are a Typescript-first shop and value your understanding of TS/JS over Angular. If you have never used Angular before, you can find the framework documentation here: https://angular.dev/overview.

All of our applications are using the modern versions of Angular, so feel free to use [standalone components](https://angular.dev/essentials/components) and the [new control flow syntax](https://blog.angular.io/meet-angulars-new-control-flow-a02c6eee7843) to make it feel more like React, Vue or Svelt if that's what you are used to.

Feel free to remove routing or upgrade any of the dependencies if you need to.

Please use the `./sample.csv` file as input into your application.

## Instructions

Coding Challenge (JS/UI)
Welcome!
We're thrilled that you're considering joining the Kin Insurance team! Before we proceed,
we have an exciting challenge for you.
The coding challenge below presents problem statements and requirements for a
specific business scenario. Your goal: to implement a solution for this scenario and
show off your coding chops.
While there are specific business rules in each system, we encourage you to make
your own product and design decisions. If you have any questions for our Design or
Product teams, please note them in your project readme.md file.
Challenge Rules
We have provided an Angular (our framework of choice) boilerplate for you to fork
(https://github.com/kin/js-challenge-boilerplate). Please refrain from using a different
javascript (e.g., React or Vue) or css framework (e.g., Material UI or Bootstrap); other
minor dependencies are fine. We are a Typescript-first shop and value your
understanding of TS/JS over using specific Angular patterns. Your submission should
showcase your capabilities. Be creative and play to your strengths.
We will be evaluating your solution based on the following criteria:
● Submission compiles/runs/works
● Satisfies requirements
● Has meaningful tests
● Includes appropriate docs and comments, especially around assumptions
● The code is clean and follows a pattern that fits well for the problem
The above is a summary of our grading rubric. You should have received the complete
rubric from Kin Recruiting; if you didn’t and would like to see it, please request it.
1
How to Submit
Invite @kinrobot, @tgrux, @gecugamo, @KevinGreene and @bdivkin to a private GitHub1
repo and set them as collaborators. Once your submission is complete, we will fork it. No
changes will be accepted after the fork, so save it for discussion if there’s a last-minute
change.
Please include instructions for installing, running, and testing your code in a README.md
file at the root of your project.
Additionally, per the instructions in the email, we ask you to submit a PDF that simply
lists the following:
● Your Name
● Your GitHub username
● A link to your private GitHub repository
We will review your submission and get back to you within 2 business days.
Please do not open your repo to the public or share your solution.
1 If all goes well, only kinrobot will accept the invitation, but we have redundancies in case our
automated solution fails.
2
The Challenge: Kinsurance OCR
Please complete the user stories based on the role you are interviewing for.
Role User Stories
Associate & Software Engineer Stories 1-2 (we will pair on 3)
Senior, Staff, Sr. Staff, or Principal Stories 1-3 (we will pair on 4)
If you have completed all your user stories and would like to continue, please focus on
submission quality rather than additional user stories so we can pair.
General Requirements
All UIs at Kin need to do the following:

- Be fully responsive
- Include accessibility
- Use our standard color palette
  (https://github.com/kin/js-challenge-boilerplate/blob/main/src/styles.scss)
  User Story 1
  Kin has just recently purchased a machine to assist in reading policy report
  documents. The machine scans the paper documents for policy numbers, and
  produces a csv file containing all the policy numbers.
  Your first task is to build a user interface that allows a person to upload the csv file
  from the ingenious machine into the browser, read each policy number into an
  array that is displayed in a table. The upload input should validate the file is a csv
  file type and it is no larger than 2 mb.
  3
  User Story 2
  Having done that, you quickly realize that the ingenious machine is not in fact
  infallible. Sometimes it goes wrong in its scanning. So the next step is to validate
  that the numbers are in fact valid policy numbers. A valid policy number has a valid
  checksum. This can be calculated as follows:
  policy number: 3 4 5 8 8 2 8 6 5
  position names: d9 d8 d7 d6 d5 d4 d3 d2 d1
  checksum calculation:
  (d1+(2*d2)+(3*d3)+...+(9\*d9)) mod 11 = 0
  Your second task is to write some code that calculates the checksum for a given
  number, and identifies if it is a valid policy number. Then update your array of
  policy numbers contain the policy number and valid status as an object as follows:
  [
  {policyNumber: 457508000, isValid: true }
  {policyNumber: 664371495, isValid: false }
  ]
  This new information should also be added to the table in the UI.
  4
  User Story 3
  Your boss is excited when they see your new application and ask you to send the
  processed policy numbers to our API.
  Your application should post the array of policy objects (from user story 2) to
  https://jsonplaceholder.typicode.com/posts (this is a mock API endpoint,
  documentation here); then, it should show the user a success or failure message,
  including the ID from the endpoint response.
  5
  User Story 4
  It turns out that often when a number is marked as not valid it is because the
  scanner has failed to read it correctly. Here is a list of numbers it could mistakenly
  mix up:
- 0 could be an 8 (or vice versa)
- 1 could be a 7 (or vice versa)
- 3 could be a 9 (or vice versa)
- 5 could be a 6 or 9 (or vice versa)
- 6 could be a 8 (or vice versa)
- 9 could be an 8 (or vice versa)
  Your last task is to check if an invalid policy number could be valid by swapping a
  number that could have been mixed up. If there is only one possible number with a
  valid checksum, then use that. If there are several options, the status should be
  AMB. If you still can't work out what it should be, the status should be reported as an
  error.
  Your new payload to the endpoint would be the following:
  [
  {policyNumber: 457508000, result: valid}
  {policyNumber: 000011111, result: error}
  {policyNumber: 664371485, result: corrected}
  {policyNumber: 457500000, result: AMB}
  ]
  Additionally show these new results in the frontend.
  Good Luck!
