# umapp

## [See the App!](https://umapp.netlify.app/)

![App Logo](/src/assets/images/umapp-logo.png)

## Description
🌟 On one hand, umapp is born to connect users with dogs and dog trainers. Sometimes it can be difficult to find a dog trainer in your city, and you don't know where to start.

🌟 On the other hand, umapp aims to solve and digitize the management of dog trainers with their clients, allowing for tracking that serves both parties.

#### [Client Repo here](https://github.com/lamardemuela/umapp-client)
#### [Server Repo here](https://github.com/lamardemuela/umapp-server)

## Technologies & Libraries used

**Frontend**
- HTML
- CSS
- Javascript
- React JS 
- React Router Dom
- React Context
- Axios
**Backend** 
- Javascript
. Node JS 
- Express JS 
- MongoDB
- Mongoose
- JWT auth. 

**Libraries**
- MUI: Material UI
- Cloudinary

## Backlog Functionalities

Functionalities I wish to add to this proyect later:
- Authentication and authorization process with Google (login and signup)
- Password recovery functionality with NodeMailer
- Most comprehensive autocomplete for municipalities and cities

# Client Structure

## User Stories

**NOTE -**  List here all the actions a user can do in the app. Example:

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **DogOwnerHome** - As a user, I want to search for and view a list of dog trainers by city so that I can find one near me
- **SessionList** - As a user, I want to see the sessions I have with a dog trainer. If my user role is dog trainer, I want to have full CRUD functionality for sessions.
- **About** - As a user, I want to see how this project started and who developed it so that I can understand its background.
- **My Profile** - If I am a user with the role of dog owner, I want to view and edit my profile information and have full CRUD functionality for my dogs. If I am a user with the role of dog trainer, I want to view and edit my profile information.

## Client Routes

Frontend routes:

## React Router Routes (React App)
| Path                      | Page            | Components        | Permissions              | Behavior                                                      |
| ------------------------- | ----------------| ----------------  | ------------------------ | ------------------------------------------------------------  |
| `/`                       | Home            | DogTrainerCard, DogOwnerHome, DogTrainerHome, HomePublic     | user role: "dogOwner", user role: "dogTrainer", public                   | Home page                                                     |
| `/signup`                 | Signup          |                   | public     | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | Login           |                   | public     | Login form, link to signup, navigate to homepage after login  |
| `/my-profile`                | Profile         | EditDogOwnerProfile, EditDogTrainerProfile       | logged users only `<OnlyPrivate>`  | Edit data. Users with role "dogOwner" only: CRUD Dog             |
| `/session-public`             |         |  | public  | Info about Sessions.                                    |
| `/session`             | SessionList        | DogOwnerSessionCard, DogTraierSessionCard | logged users only `<OnlyPrivate>`  | Sessions list. Users with role "dogTrainer" only: CRUD Session                                   |
| `/add-session`             | AddSession       |                   | logged users only `<OnlyPrivate>`- only users with role "dogTrainer"  | Add a Session                                   |
| `/session/:sessionId`       | EditSessionDetails   |           | logged users only `<OnlyPrivate>`- only users with role "dogTrainer"  | Edit data of a Session   
| `/about`       | About   |           | public  | Info about the Umapp Project                                  |
| `/add-dog`       | AddDog   |           | logged users only `<OnlyPrivate>`- only users with role "dogOwner"  | Add a document of Dog 
| `/dog/:dogId`       | EditDogDetails   |           | logged users only `<OnlyPrivate>`- only users with role "dogOwner"  | Edit and update info of Dog 

## Other Components

- Navbar
- Footer
- OnlyPrivate
- WhatsappButton
- RoleTabs
  
## Context

- auth.context
  
## Links

### Project

[Repository Link Client](https://github.com/lamardemuela/umapp-client)

[Repository Link Server](https://github.com/lamardemuela/umapp-server)

[Deploy Link](https://umapp.netlify.app/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1aRkcTZZbVtu6G3FkuwRlqRTQPNShvMVVzX8R-3zRIsw/edit?usp=sharing)
