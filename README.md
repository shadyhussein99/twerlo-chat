# twerlo-chat

Chat application

## Installation

To run the chrome extention locally, use the following commands

`git clone https://github.com/shadyhussein99/twerlo-chat`

Install the dependencies

`npm install`

Run the application

`npm run dev`

## Technical Information

- React (Vite) + typescript + tailwindcss + zustand (Global State Management) + react-hook-form (Form Handling) + Yup (Validation) + Jest & react-testing-library (Unit Testing).

- CI/CD: Added pipeline to ensure all unit tests pass when creating PR targeting "main" branch and prevent merge if any test fails with the ability to bypass.

- Lazy loading for App Routes with loading state as Suspense.

- Clean Architecture and code splitting, small files sizing ensuring single responsibility and following best practises to facilitate unit testing.
  
- Naming conventions for branch names and atomic commits.

## Business Features

- Chat app with contacts list to chat with.

- Initially scroll to latest message on selecting contact.

- Boradcast messages.

- Image upload.

## TODOs if I have more time

- Add more test coverage (just added few to display the setup and structure).
   
- Add pipeline to generate test coverage report with PRs.

- Handle rest of file types upload.

- Simulate real backend responses using `Promise.resolve`.

- Use tool to to manage complex styles and create reusable components in tailwind like "tailwind-variants" (for example).

- Add the feature of getting Notification when recieving a message when you are on different chat.

## Preview of the app

https://github.com/user-attachments/assets/ec6af67d-7ac4-4c39-8b44-00eb9f1e6dba

![chat-window](https://github.com/user-attachments/assets/447cc0bf-5845-4258-b0c0-9fab4ff47e12)

![contacts-list](https://github.com/user-attachments/assets/b6670c44-ffd0-420d-b2bf-24f334fff24f)

![login-page](https://github.com/user-attachments/assets/7e658e04-0672-4ec6-8c88-83e0433cb184)




