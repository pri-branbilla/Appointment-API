# Appointment API

An API that manages the appointments sent by patients and the available dates sent by doctors / admin.

## First steps

This project has two files in /config that are required and you'll need to add if you want to test it locally.

### `sak.json`

This is your Service Account Key from Firebase.

Create a Firebase project to get one then add it to /config folder (remember to rename to sak.json).

To get this file, click [here](https://console.firebase.google.com/u/0/project/_/settings/serviceaccounts/adminsdk).

### `mongodb.json`

This project uses mongodb to database. Create your account in [MLab](https://mlab.com/) (It's free) and add the username and password of your DATABASE (not your account) to this file.

```
{
    "username": "xxxx",
    "password": "xxxx"
}
```

## NPM setup

First of all, run `npm install` to install the dependencies.

After that, just run `npm start` and start using the API!
