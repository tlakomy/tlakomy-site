---
slug: notes-from-graphql-query-language
date: 2020-10-31
title: "Notes from GraphQL Query Language course on egghead.io"
published: true
banner: './banner.png'
---

# Notes grom GraphQL Query Language by [Eve Porcello](https://twitter.com/eveporcello)

I've decided to revisit one of the best [egghead.io](https://egghead.io/s/km6vr) courses - [GraphQL Query Language](https://egghead.io/courses/graphql-query-language?af=6p5abz) by [Eve Porcello](https://twitter.com/eveporcello) and you can find my notes below:

- In a GraphQL query, the shape of the query matches the shape of the response:

Query:
```
query {
  totalPets
}
```

Response:
```
{
  "data": {
    "totalPets": 25
  }
}
```

- When querying for a list of objects the GraphQL query syntax stays the same:

```
query {
  # allPets is a list
  allPets {
    name
    weight
  }
  totalPets
}
```

- This is how you `#add a comment in a GraphQL query`
- GraphQL is a query language for your API, but it's also a type system for your API - that's why we can define our own types, e.g.:

```
enum PetCategory {
  CAT
  DOG
  RABBIT
  STINGRAY
}
```
- GraphQL allows us to send nested queries, and there's no limit how nested they can be (within reason, obviously)
- Some GraphQL queries can take arguments (for instance - to filter out returned items)
- It's not possible to query for two fields that are identical (e.g. `totalPets(status: CHECKEDOUT) totalPets(status: AVAILABLE)`) without an alias. To add an alias, use `:` before the queried field, for example: `alias: queriedField`
- Aliases can also be used in nested queries
- When using variables to filter a query result, they can either be hardcoded in a query:

`allPets(category:CAT status:CHECKEDOUT)`

or you can use query variables to achieve that, here's a complete example:

Query:
```
query ($category: PetCategory $status: PetStatus) {
  allPets(category:$category status:$status) {
    name
  }
}
```

Query variables:
```
{
  "category": "CAT",
  "status": "CHECKEDOUT"
}
```
- It's possible to pass in default values to a GraphQL query - `query ($category: PetCategory=DOG $status: PetStatus) {`
- It's possible to assign names to a GraphQL query (useful when there is more than one query in query document) - `query AllPets`
- There's no restriction reagarding query names but the convention is to NameThemLikeThis
- To change data in GraphQL, we use **mutations**
- In order to mark something as non-nullable in GraphQL, we use `!`
- Mutations can also return data, similar to queries. While we can hardcode the arguments to a mutation, it's better to use query variables for more flexibility

Example - query:
```
mutation ($input: CreateAccountInput!) {
  createAccount (input: $input) {
    name
    dateCreated
  }
}
```

Query variables:
```
{
  "input": {
    "name": "Tomasz",
    "username": "tlakomy",
    "password": "test"
  }
}
```
- GraphQL mutation can also be used to authenticate a user and get a JWT token
- Once we get a JWT token, we can add it to HTTP headers:
```
{
  "Authorization": "Bearer ${JWT_TOKEN}"
}
```
and use it to send queries only for authenticated users
- Once we're authorized, we can also send mutations only for authenticated users (e.g. buy an item)
- We can use GraphQL Fragments in order to reuse common fragments of queries/mutations (for instance, we can have a UserDataFragment containing fields like username, id etc.)
- Fragments need to be defined **on** a type, e.g. `Pet`:

```
fragment PetData on Pet {
	name
    weight
    category
    status
}
```
- It's possible to use multiple fragments in a query, as well as add non-fragment fields to a query
- In GraphQL query language it's possible to define interfaces that can be then implemented by types - e.g. `type Cat implements Pet`, where `Pet` is an interface
- If a field is returning a list of items implementing the same interface (e.g. `Pet`), we can query for `__typename` to find out the type of an item
- While querying a field returning an interface, it's possible to return data only for a certain type implementing that field, e.g.:

```
... on Cat {
	sleepAmount #other pets don't have a sleepAmount field
}
```
- We use Graphql `union`s when we want to return a list of multiple types, e.g.:

```
union FamilyPet = Cat Dog
```
- When using a union, it's necessary to define an inline fragment on one of the types encapsulated by that union - `... on Dog {}` etc.
- Unions don't have to share **any** fields
- We can use GraphQL subscriptions to listen to data changes on a web socket
- Introspection is the ability to query information about a GraphQL API’s schema, example:

```
query {
  __schema {
    types {
      name
      kind
      description
    }
  }
}
```

in a way, we can ask GraphQL server to send us info about itself