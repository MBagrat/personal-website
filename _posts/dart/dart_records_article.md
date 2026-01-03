---
title: 'Dart Records: A Complete Guide'
excerpt:
  'A comprehensive guide to Dart records - the powerful new feature introduced in Dart 3.0 for
  creating immutable data structures with built-in equality and hashing.'
date: 2025-06-28
last_modified_at: 2025-06-28
categories:
  - Programming
  - Dart
tags:
  - dart
  - records
  - data-structures
  - dart3
  - immutable
  - tutorial
toc: true
toc_label: 'Table of Contents'
toc_icon: 'cog'
toc_sticky: true
header:
  overlay_color: '#0175C2'
  overlay_filter: '0.5'
  teaser: /assets/images/dart-records-complete-guide/dart-records-teaser.png
author_profile: true
share: true
related: true
---

Records in Dart represent one of the most significant additions to the language in recent years,
introduced in Dart 3.0. They provide a concise way to create immutable data classes with built-in
equality, hashing, and string representation. This article explores everything you need to know
about Dart records, from basic usage to advanced patterns.

## What Are Records?

Records are anonymous, immutable aggregate types that group multiple values together. Unlike
classes, records don't require explicit declaration and come with automatic implementations of
equality, hashing, and string representation. They're perfect for situations where you need to
return multiple values from a function or create simple data structures without the overhead of
defining a full class.

## Basic Record Syntax

Records use parentheses to group values and can contain positional and named fields:

```dart
// Positional fields only
var point = (3, 4);
var person = ('John', 25, 'Engineer');

// Named fields only
var coordinates = (x: 10, y: 20);
var user = (name: 'Alice', age: 30, role: 'Developer');

// Mixed positional and named fields
var mixed = (42, name: 'Bob', active: true);
```

## Type Annotations

Records have their own type syntax that mirrors their structure:

```dart
// Positional record types
(int, int) point = (3, 4);
(String, int, String) person = ('John', 25, 'Engineer');

// Named record types
({int x, int y}) coordinates = (x: 10, y: 20);
({String name, int age, String role}) user = (name: 'Alice', age: 30, role: 'Developer');

// Mixed record types
(int, {String name, bool active}) mixed = (42, name: 'Bob', active: true);
```

## Accessing Record Fields

Record fields are accessed using dot notation with specific syntax:

```dart
var point = (3, 4);
print(point.$1); // Access first positional field: 3
print(point.$2); // Access second positional field: 4

var user = (name: 'Alice', age: 30);
print(user.name); // Access named field: Alice
print(user.age);  // Access named field: 30

var mixed = (42, name: 'Bob', active: true);
print(mixed.$1);     // Positional field: 42
print(mixed.name);   // Named field: Bob
print(mixed.active); // Named field: true
```

## Records vs Classes

Records offer several advantages over traditional classes for simple data structures:

### Automatic Implementations

Records automatically provide implementations for equality, hashing, and string representation:

```dart
var point1 = (3, 4);
var point2 = (3, 4);
var point3 = (5, 6);

print(point1 == point2); // true - structural equality
print(point1 == point3); // false
print(point1.hashCode == point2.hashCode); // true
print(point1.toString()); // (3, 4)
```

### Immutability

Records are immutable by default, which makes them safe for concurrent programming and reduces bugs:

```dart
var user = (name: 'Alice', age: 30);
// user.name = 'Bob'; // This would be a compile error
```

### Conciseness

Records eliminate boilerplate code required for simple data classes:

```dart
// Traditional class approach
class Point {
  final int x, y;
  Point(this.x, this.y);

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is Point && x == other.x && y == other.y);

  @override
  int get hashCode => Object.hash(x, y);

  @override
  String toString() => 'Point($x, $y)';
}

// Record approach
typedef Point = (int x, int y);
var point = (x: 3, y: 4);
```

## Practical Use Cases

### Multiple Return Values

Records excel at returning multiple values from functions:

```dart
(String, int) parseNameAndAge(String input) {
  var parts = input.split(',');
  return (parts[0].trim(), int.parse(parts[1].trim()));
}

({String name, int age}) parseUserInfo(String input) {
  var parts = input.split(',');
  return (name: parts[0].trim(), age: int.parse(parts[1].trim()));
}

void main() {
  var (name, age) = parseNameAndAge('Alice, 30');
  print('Name: $name, Age: $age');

  var user = parseUserInfo('Bob, 25');
  print('User: ${user.name}, ${user.age}');
}
```

### Configuration Objects

Records work well for configuration parameters:

```dart
typedef DatabaseConfig = ({
  String host,
  int port,
  String database,
  bool ssl
});

void connectToDatabase(DatabaseConfig config) {
  print('Connecting to ${config.database} at ${config.host}:${config.port}');
  if (config.ssl) {
    print('Using SSL connection');
  }
}

void main() {
  var config = (
    host: 'localhost',
    port: 5432,
    database: 'myapp',
    ssl: true
  );

  connectToDatabase(config);
}
```

### Coordinate Systems

Records are perfect for representing points, vectors, and other mathematical constructs:

```dart
typedef Point2D = (double x, double y);
typedef Point3D = (double x, double y, double z);

Point2D addPoints(Point2D a, Point2D b) {
  return (x: a.x + b.x, y: a.y + b.y);
}

double distance(Point2D a, Point2D b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  return sqrt(dx * dx + dy * dy);
}
```

## Advanced Patterns

### Destructuring

Records support destructuring assignment, which allows extracting values into individual variables:

```dart
var person = (name: 'Alice', age: 30, city: 'New York');

// Destructure named fields
var (name: personName, age: personAge, city: personCity) = person;
print('$personName is $personAge years old and lives in $personCity');

// Destructure positional fields
var coordinates = (10, 20, 30);
var (x, y, z) = coordinates;
print('Position: ($x, $y, $z)');

// Partial destructuring
var (name: userName, age: _) = person; // Ignore age
print('User: $userName');
```

### Pattern Matching

Records work seamlessly with Dart's pattern matching:

```dart
String describePoint((int, int) point) {
  return switch (point) {
    (0, 0) => 'Origin',
    (0, _) => 'On Y-axis',
    (_, 0) => 'On X-axis',
    (var x, var y) when x == y => 'On diagonal',
    (var x, var y) when x > 0 && y > 0 => 'First quadrant',
    _ => 'Other location'
  };
}

void processResponse(({int status, String message}) response) {
  switch (response) {
    case (status: 200, message: var msg):
      print('Success: $msg');
    case (status: >= 400, message: var msg):
      print('Error: $msg');
    default:
      print('Unknown response');
  }
}
```

### Nested Records

Records can contain other records for complex data structures:

```dart
typedef Address = ({String street, String city, String country});
typedef Person = ({String name, int age, Address address});

var person = (
  name: 'Alice',
  age: 30,
  address: (
    street: '123 Main St',
    city: 'New York',
    country: 'USA'
  )
);

print('${person.name} lives at ${person.address.street}');
```

## Type Aliases and Documentation

Use type aliases to make record types more readable and maintainable:

```dart
/// Represents a 2D point in Cartesian coordinates
typedef Point2D = ({double x, double y});

/// Represents an HTTP response
typedef HttpResponse = ({
  int statusCode,
  String body,
  Map<String, String> headers
});

/// Represents a database query result
typedef QueryResult<T> = ({
  List<T> data,
  int totalCount,
  bool hasMore
});
```

## Performance Considerations

Records are optimized for performance and memory usage:

- They're allocated on the stack when possible
- Field access is as fast as direct variable access
- Equality comparison is optimized for structural equality
- Hash codes are efficiently computed and cached

## Best Practices

### When to Use Records

Use records when you need:

- Simple data structures without behavior
- Multiple return values from functions
- Immutable data containers
- Configuration objects
- Temporary data groupings

### When to Use Classes Instead

Prefer classes when you need:

- Methods and behavior
- Mutable state
- Inheritance
- Complex validation logic
- Interface implementations

### Naming Conventions

- Use descriptive type aliases for complex record types
- Follow Dart naming conventions for field names
- Consider using named fields for clarity when you have more than 2-3 fields

## Conclusion

Dart records provide a powerful and concise way to work with structured data. They eliminate much of
the boilerplate code associated with simple data classes while providing built-in equality, hashing,
and string representation. Their integration with pattern matching and destructuring makes them
particularly valuable for functional programming patterns and complex data processing scenarios.

As you incorporate records into your Dart projects, you'll find they lead to cleaner, more
maintainable code while reducing the cognitive overhead of managing simple data structures. Whether
you're returning multiple values from functions, creating configuration objects, or working with
coordinate systems, records offer an elegant solution that feels natural and intuitive in Dart's
type system.
