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

# Routes

For all the following requests, we must use these headers:

```
{
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}
```

### Appointments:

`POST /appointments`

Create a new appointment.

Body:

```
{
    "name": "Potato",
    "phone": "(12) 12345-7890",
    "email": "test@test.com",
    "date": "2019-05-12T12:20:00",
}
```

`GET /appointments`

Get all the scheduled appointments. You must be authenticated and have a valid user id token.

Headers:

```
{
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'user_id_token': 'xxxxxxx',
}
```

### Dates:

`POST /dates`

Create a new available dates. You must be authenticated and have a valid user id token.

This is a route that creates one or more available dates.

Headers:

```
{
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'user_id_token': 'xxxxxxx',
}
```

Body:

```
{
    "startDate": "2018-01-01",
    "finalDate": "2018-01-15",
    "startHour": "10:00",
    "finishHour": "14:00",
    "daysStep": 7,
    "step": 20,
}
```

In this case, we are creating available in 01/01/2018, 08/01/2018 and 15/01/2018, since we defined 7 days for step. Also, each one of these days will have available times from 10h00 to 14h00.

`GET /dates`

Get all the available dates.

`PATCH /dates/update`

Update one available date to scheduled. It won't appear with GET request anymore.

Body:

```
{
    "date": "2018-12-12T23:23:00"
}
```
