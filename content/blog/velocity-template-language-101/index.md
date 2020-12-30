---
slug: velocity-template-language-101
date: 2020-12-30
title: 'Velocity Template Language 101'
published: true
banner: './velocity-logo.png'
---

# Velocity Template Language 101

[Source](https://velocity.apache.org/engine/1.7/user-guide.html)

## Creating variables
`#set( $a = "Velocity" )`

>The following rule of thumb may be useful to better understand how Velocity works: References begin with $ and are used to get something. Directives begin with # and are used to do something.

## Comments

`## This is a single line comment.`

```
#*
  This is
  a multi-line comment
*#
```

## References

>There are three types of references in the VTL: variables, properties and methods.

Variables start with $ - e.g. `$foo`
Properties: `$customer.Address`
Methods: `$page.setTitle( "My Home Page" )`

## Index notation

>Using the notation of the form `$foo[0]` can be used to access a given index of an object

## Directives

### #set

>The `#set` directive is used for setting the value of a reference. A value can be assigned to either a variable reference or a property reference, and this occurs in brackets, as demonstrated:

```vtl
#set( $primate = "monkey" )
#set( $customer.Behavior = $primate )
```

If a right hand side is a property or method reference that evaluates to `null` it will **not** be assigned to left hand side:

```vtl
#set( $result = $query.criteria("name") )
The result of the first query is $result

#set( $result = $query.criteria("address") )
The result of the second query is $result
```

### Conditionals

```vtl
#if( $foo )
  <strong>Velocity!</strong>
#end
```

```vtl
#if( $foo < 10 )
    **Go North**
#elseif( $foo == 10 )
    **Go East**
#elseif( $bar == 6 )
    **Go South**
#else
    **Go West**
#end
```

### Loops

`#foreach` loop:

```vtl
<ul>
#foreach( $product in $allProducts )
    <li>$product</li>
#end
</ul>
```

The contents of the `$allProducts` variable is a Vector, a Hashtable or an Array. The value assigned to the $product variable is a Java Object and can be reference

### Range operator

Example:
```vtl
#foreach( $foo in [1..5] )
$foo
#end
```

Output:
```vtl
First example:
1 2 3 4 5
```