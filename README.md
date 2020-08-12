# ARL Gamified Training Web

## Table of Contents

1. [Overview](#overview)
2. [Available Scripts](#Available-Scripts)
3. [General files](#general-files)
4. [Instructor Portal](#instructor-portal)
5. [Student Portal](#student-portal)
6. [Data Visualization](#data-visualization)

## Overview

This project was created as the web counterpart to the mobile version of ARL Gamified Training. It consists of an instructor portal, student portal, and data visualization portion.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## General Files

### `App.js`

Main page of the app. Contains the Homepage component and has a method to obtain student type from Firebase.

### `Homepage.jsx`

Based on the current user type, this component displays the Instructor Home if instructor, Student Home if student, and Login page is none.

---

### Components

#### `Login.jsx`

This is the default landing page if no user is currently signed in. Here, the user can log in and the log in function goes through Firebase to authenticate the user and bring them to the correct portal.

#### `NavigationBar.js`

Navigation bar on the instructor side with sign out and path to data visualization page.

## Instructor Portal

### `instructorHome.js`

Portal that shows when an instructor logs in. There is a top navigation bar that has a tab ("Data") to enter the data visualization page along with a sign out button. On the home page, the instructor sees all of their classes in a table with options to view the student and assignment tracker for each individual class.

---

### Instructor Portal Components

All under `/src/components`

#### `studentTracker.jsx`

Displays all students in a certain class, along with their performance statistics. Includes option to remove a student or add a student.

#### `classList.jsx`

List of all classes maanged shown on the main instructor home.

#### `classRow.jsx`

One row in the class list.

#### `addStudentModal.jsx`

Modal that appears when an instructor chooses to add a student.

#### `multipleStudentAddModal.jsx`

Modal that appears when an instructor chooses to add multiple students at once through a csv file. In the home directory of this app, there is a testing.csv file to experiment with.

#### `Assignments.jsx`

Table showing all assignments created, with description, selected friendly vehicles, selected enemy vehicles, along with time and accuracy requirements.

#### `addAssignmentModal.jsx`

Modal that appears when an instructor wants to create a new assignment. This modal is four parts (divided into subsections) to account for the assignment creation process.

#### `upload.js`

Assists with csv file uploads.

## Student Portal

### `studentHome.js`

Main landing page for students upon login. Shows student name, email, navigation bar, and sign out button.

### `about.js`

About page for students.  This is rendered when the about tab is clicked.

### `gonogo.js`

Launches go/no-go for students.  This is rendered when the go/no-go tab is clicked.

### `training.js`

Launches two-choice training for students.  This is rendered when the training tab is clicked.

### `home.js`

Student home page.  This is part of the main landing page for students upon logging in.  Is also rendered when home tab is clicked.

### `profile.js`

Shows student information, performance statistics, past sessions, statistics, and achievements.  This is rendered when profile tab is clicked.

### `question.js`

Provides the questionairre for students to take and determine their preferred feedback type.  This is rendered when the questionnairre tab is clicked.

### `settings.js`

Student app setting page.  Allows the user to select the friendly and enemy vehciles for their next training practice session.  This is rendered when the settings tab is clicked.

---

### Student Portal Components

All under `/src/components`

#### `navbar.js`

Navigation bar on student side.  Includes the options, home, about, training, gonogo, profile, questionairre, and settings.

#### `option.js`

Creates the 5 radio button options for the questionairre.  Also includes labels for the first, third, and fifth radio buttons.

#### `session.js`

Obtains past sessions and details and displays. Used in the student profile page.  Individual sessions may be clicked to view more in depth summaries.

#### `sessionSummary.js`

Session summary page that displays all questions of the session. Shows whether a certain vehicle was identified correctly or incorrectly.

#### `statDetails.js`

Renders the list of statistic details in student profile.  This includes vehicle accuracy, vehicle average response time, tag accuracy, and tag average response time.

#### `studentStats.js`

Calculates all the statistic details that is rendered by `statDetails.js`.

#### `summaryDetail.js`

Shows summary details for each session summary.  This includes vehilce image, vehicle name, expected response, and received response.

## Data Visualization

#### `Data.js`

Displays data visualization depicting performance trends.
