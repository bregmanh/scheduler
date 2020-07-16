# Interview Scheduler
A modern client application using the React view library, [click here](https://silly-brown-56f820.netlify.app/) to view the project live (*note: do allow a few second for the server to warm up).

The Interview Scheduler allows students to book appointments with a mentor. Appointments can be made between noon and 5pm for each day of the week. Students can create appointments by specifying their name and choose from a list of interviewers. Students can also cancel and edit appointments.


## Tech Stack Used

- React
- Webpack, Babel
- Axios
- Storybook to build and test the components in isolation
- Testing with Jest for unit and integration testing, and Cypress for end-to-end testing

The project has been deployed, with Heroku (server), CircleCI (testing and building to production branch), and Netlify (hosting).

## Illustration

Below is an illustration of some of the main app functionalities. The full list of functionaities is provided in the next section.

![GIF illustration of the main functionalities](https://github.com/bregmanh/scheduler/blob/master/docs/overview.gif?raw=true)

## Functionalities

- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of - available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view - (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

Highlevel Overview:
- Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
- Data is persisted by the API server using a PostgreSQL database.
- The client application communicates with an API server over HTTP, using the JSON format.
- Jest integration tests and Cypress end-to-end tests are used through the development of the project.

## Setup

Install dependencies with `npm install`.

1. **Running Webpack Development Server**
```sh
npm start
```
2. **Running Jest Test Framework**
```sh
npm test
```
3. **Running Storybook Visual Testbed**
```sh
npm run storybook
```
