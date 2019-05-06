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