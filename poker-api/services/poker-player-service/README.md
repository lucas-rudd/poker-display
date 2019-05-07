# poker-player-service

This is a service for basic CRUD operations to perform on poker-player data.

This service integrates with MongoDB to store the poker-player data.

# GET
Getting all poker-players is done by invoking the `/poker-players` path.

Query string parameters can be used to sort the data by particular elements.

For example, the following request would sort all players by winnings in descending order
`/poker-players?sortField=winnings&order=desc`

# PUT/POST/PATCH
Creating a new poker player, or updating an existing poker-player can be done by invoking the `/poker-player` path

When updating an existing poker-player, the `_id` of that poker-player must be passed in to the request body.

For example, say you have the following users in MongoDB

```
{
    _id: 6e48w53296dz4e2814bg0eb7,
    __v: 0,
    firstName: Joe,
    lastName: Shmo
}
```

```
{
    _id": 5cd0f54496dc5e9414bd0eb6,
    __v: 0,
    firstName: Gary,
    lastName: GreenWald
```

Sending the following request payload would update Gary's first name to Mary.
```
{
    _id": "5cd0f54496dc5e9414bd0eb6,
    firstName: Mary
```

Sending in the following payload would create a new user with the same first and last name as Gary, but a different `_id`
```
{
    firstName: Gary,
    lastName: GreenWald
}
```

And, sending in the following payload would create a new user with the same name as Joe, but with the _id provided

```
{
    _id: 5e42w0229cv54e2814baf0es1,
    __v: 0,
    firstName: Joe,
    lastName: Shmo
}
```

# DELETE
Deletion is done in the same way as PUT/POST/PATCH.

Simply provide the `_id` of the user you wish to delete in the payload sent to the service, and the user will be deleted.