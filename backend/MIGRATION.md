# Authentication and ownership migration

New video documents require an `owner` user ID. Existing MongoDB videos without
an owner are intentionally excluded from account queries and cannot be claimed
by the first account (or any other account). They remain in the database for
manual review and an explicit, verified ownership migration if one is later
possible.

On startup, the backend replaces the old globally unique `videoId` index with a
unique `{ owner, videoId }` index. The index change does not update or delete
video documents. Back up the database before the first authenticated startup.

Goals and settings are now written to `backend/src/data/users/<user-id>-*.json`.
The pre-authentication `goals.json` and `settings.json` are left untouched and
are not read or assigned to an account. Review or archive them manually; do not
copy them into a user's file unless their rightful owner is independently
verified. Existing shared `videos.json` data is likewise not imported.

Set a unique `JWT_SECRET` of at least 32 characters and a duration such as
`7d` in the backend environment before starting the server. No secret belongs
in frontend or extension source.
