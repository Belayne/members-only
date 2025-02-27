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

A user can signup with a username and password.
The username is saved in the database as is.
The password is hashed using bcrypt and then saved.
On successful authentication a user id is serialized and saved into a session which is stored in the database.
A cookie is also created with the session id and sent to the client by the session-middleware.
When an authenticated user visits a page the session id contained in the request cookie is used to search for the session in the database. If the session is valid the user data is deserialized using the function defined in `passport.deserialize()`.
The user data is then attached to the `request` object by passport.
## Database

**Schema**
![[Members only.png]]

