---
slug: notes-from-design-graphql-schemas
date: 2020-11-01
title: "Notes from Design GraphQL Schemas on egghead.io"
published: true
banner: './banner.png'
---

Link to the course: [Designing GraphQL Schemas](https://egghead.io/courses/designing-graphql-schemas-99db?af=6p5abz) by [Nik Graf](https://egghead.io/instructors/nik-graf?af=6p5abz)

## Mocking and naming conventions

- When designing a schema, it's useful to have mock data available so we can send actual queries in GraphQL playground and verify the results. This allows us to iterate faster during schema design process.
- Luckily Apollo Server allows us to enable mock mode:

```ts
new ApolloServer({
	typeDefs,
	mocks: true // <--
})
```
- We can also modify the values returned from mocks by defining a `mocks` object:
```ts
const mocks = {
  String: () => "Cześć!" // "Hello", in Polish
}
```
- It's possible to mock only part of the schema, and have the rest actually resolved by a resolver:

```ts
const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
  mockEntireSchema: false,
});
````

- Designing a proper GraphQL schema requires us to have a good knowledge of the business domain. Star by writing the **queries** developers will send to the server (in other words - define the access patterns first)
- "While it's very appealing to pick a short and crisp name for a field, not naming the things exactly what they are can cause issues and confusion in the long run." - naming conventions are important. For example - `image` is not a string, rather a collection of fields: `url, description, thumbnailUrl` etc.
- Thinking about schema design up front is necessary in order to avoid introducing breaking changes later on
- The way you name your fields (e.g. `image` vs. `imageUrl`) can make quite an impact on your future schema changes

## When and Why to use Nullable vs Non-nullable Fields in GraphQL

- In GraphQL everything is `nullable` by default. In order to make something non-nullable you have to explicitly make it so by appending `!` to it
- Individual fields in a GraphQL request can have different authorization rules. That's why having nullable fields will simply return `null` for fields that the requester does not have access to.
- To quote official GraphQL documentation:

>when designing a graphical schema, it's important to keep in mind all the problems that could go wrong, and if null is an appropriate value for a field field. Typically, it is, but occasionally it's not. In those cases, use non-null types to make the guarantee.
- In order to deprecate a field in a GraphQL schema append `@deprecated` to it - you can also provide a reason why this field is deprecated and what should be used instead.

# Evolving the schema
- In the case we'd like to deprecate a field (for instance - because we want to replace a `String` field with a custom type with multiple fields), first introduce a new field (to provide the value right away), deprecate the original one and once all clients have updated their queries, deprecate the newly introduced field.
- This will take a while, but after this process you'll have a fully upgraded field - from `String` to custom type with several fields
- It's important to remember that in GraphQL it's not possible to query for *everything*. As such, we can verify which fields are still being accessed and by whom, which helps us inform those teams that a field X is deprecated and will be removed shortly.
- Breaking changes are never easy but this approach makes them possible
- Instead of always introducing new fields for new use cases (e.g. returning a `description` as text/html), add an optional argument to the field. This won't introduce any new breaking changes (since the change is optional!) and if someone will need to ask for `description` twice (text/html version), they can use a GraphQL alias
- By leveraging arguments in combination with GraphQL aliases, we can achieve the same results as with multiple explicitly-named fields
- In most GraphQL service implementations, there is also a way to specify custom scalar types. For example, we could define a Date type:

`scalar Date`

Then it's up to our implementation to define how that type should be serialized, deserialized, and validated. For example, you could specify that the Date type should always be serialized into an integer timestamp, and your client should know to expect that format for any date fields.

## Pagination
- The ideal solution is based on the [Relay Cursor Connections Specification](https://facebook.github.io/relay/graphql/connections.htm)
- The idea is to provide a number of items and an ID of an item which is going to become a cursor. Similar to a text editor, we can select e.g. 5 items (in the case of a text editor - character) `before` the cursor, or 10 items `after` the cursor.
- The recommended approach looks like this:
```graphql
{
  product(id: "abc") {
    name
    recommendedProducts(last: 5, before: "cde") {
      edges {
        node {
          name
          image {
            url
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
}
```
- And yes, this is bloated like hell, but solves all pagination-related problems
- Both `**edge******` and `pageInfo` fields can be extended with data useful for our use case

## Naming top-level Query Fields in GraphQL
- If we want to have an access pattern in which an `item` can be received either by an ID or by name, it's better to create two separate fields:

```
itemById(id: ID!)
itemByName(name: String!)
```

instead of having a single field that can take either an `id` or `name`. What happens if someone provides neither? Or both? This approach may lead to messy situations and that's why it's better to be more explicit in field names.
- If getting an `item` by ID is the most common use case, the team may decide to drop the `ById` suffix

## Mutations

- A GraphQL mutation should accept only a single `Input` argument, instead of a long list of arguments
- An approach which is recommended by Relay is to return a unique return payload for each mutation. In other words - every mutation should have a custom `input` and `payload` (output).
- The `input` argument should be mandatory since a mutation does not make sense without it
- When designing mutations it's better to focus on the Business Domain rather than the Data Model
- Designing schema with business domain in mind is likely to cause more mutations to be created but that's a good thing - it's better to have more focused mutations that are solving a business use case rather than a small set of mutations with lots of nullable fields
- When working with a list of items, it's better to have mutations for adding/removing items from the list rather than updating the whole list - because different clients (e.g. two browser tabs) can get inconsitent data after `update`ing the list in separation from one another
- In some cases it's necessary to update the whole list, but before doing that, the server should validate whether the client has the newest version of the list (e.g. by requiring the client to send a hashed version of it and validating it)
- As usual, there are tradeoffs - in some cases it's better to have a mutation like `UpdateProduct`
