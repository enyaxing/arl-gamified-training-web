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

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## General Files

### `App.js`

Main page of the app. Contains the Homepage component and has a method to obtain student type from Firebase.

### `Homepage.jsx`

Full path: `/src/Homepage.jsx`  
Based on the current user type, this component displays the Instructor Home if instructor, Student Home if student, and Login page is none.

---

### Components

#### `Login.jsx`

Full path: `/src/components/Login.jsx`  
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

#### `classList.jsx`

#### `classRow.jsx`

#### `addStudentModal.jsx`

#### `Assignments.jsx`

#### `addAssignmentModal.jsx`

#### `upload.js`

#### `multipleStudentAddModal.jsx`

## Student Portal

### `studentHome.js`

### `about.js`

### `gonogo.js`

### `home.js`

### `profile.js`

### `question.js`

### `settings.js`

### `training.js`

---

### Student Portal Components

All under `/src/components`

#### `navbar.js`

#### `option.js`

#### `session.js`

#### `sessionSummary.js`

#### `statDetails.js`

#### `studentStats.js`

#### `summaryDetail.js`

## Data Visualization
