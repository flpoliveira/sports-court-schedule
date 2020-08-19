### Web project to schedule a sports courts

As a college project, it was made using NodeJS, React and Postgresql.

--- 

This project should:

- [ ] Be online and available everywhere.
- [ ] Be responsive on computer, tablets and smartphones.
- [ ] Allow sports courts scheduling.
- [ ] Allow cancel this schedules.
- [ ] Keep scheduling history.
- [ ] Allow users login with CPF and IdUdesc's password.
- [ ] Notify by email about the schedules.
- [ ] Graphically arrange busy times.

In this project we have the users, admins and subadmins:

##### Admins

- [ ] Insert and remove a subadmin.
- [ ] Define a max number of days that have to precede a reservation.
- [ ] Insert and remove courts.
- [ ] Create a special event, in this time all the other reservations are disabled.
- [ ] Manage subadmins permissions.

##### Subadmins

- [ ] Insert a reserve in name of a user.
- [ ] Cancel reserve.
- [ ] Confirm if the user comes to his reservation.
- [ ] Request reports.


---

### Running project

Go to server and run:

* Create the database

```
npm run database
```
* Create the triggers

```
npm run triggers
```

* Run the backend server

```
npm run server
```
