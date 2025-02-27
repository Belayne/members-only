# Members Only
A website where users can register and post their messages on the main page.
This is a project for The Odin Project curriculum.

Users are divided in 4 roles:

|             | Unregistered | Registered (Guest) | Member | Admin |
| ----------- | ------------ | ------------------ | ------ | ----- |
| Read        | ✓            | ✓                  | ✓      | ✓     |
| Write       |              | ✓                  | ✓      | ✓     |
| Author/Date |              |                    | ✓      | ✓     |
| Delete      |              |                    |        | ✓     |

## Technologies used

Database: PostgreSQL

Backend framework: Express + EJS for templating

Authentication: Passport.js with local strategy

CSS framework: Tailwind

## Database

**Schema**
![[Members%20only.png]]

