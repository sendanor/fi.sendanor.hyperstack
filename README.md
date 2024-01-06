# Obsolete

This project is deprecated. The development continues under the [HyperifyIO Project](https://github.com/hyperifyio).

# @sendanor/fi.sendanor.hyperstack

Common code for HyperStack protocol for TypeScript (as a Git Submodule).

### Types in hyperstack

Hyper stack architecture evolves around types. Everything can be presented as a
low level independent JSON data transfer object. Entity classes are higher level
presentations of these DTO types with an easy-to-use public API for the programmer
of Hyper stack application.

#### Data transfer objects (DTOs)

* Immutable
* Implemented as a TypeScript interface
* Can be presented as a pure JSON object
* Intended to be constructed and utilized using an entity class
* No methods (only utility functions)

Data transfer objects are pure JSON-compatible objects which present an immutable
state of a unit of something. Each DTO type has its own counterpart entity class. 
Usual way to construct a DTO object and it's utility functions is using the 
entity class and its higher level chainable methods.

#### Entity interfaces

Entity interfaces describe and document the public API of an entity class. 

#### Entity classes

Entity classes are implementations of these entity interfaces. These classes
will have the same internal properties as counterpart DTOs, but only provide 
access to these properties using setter and getter methods. Names strictly 
follow the same pattern based on the properties of the counterpart DTO. 

Entity factory can be used to implement these classes without actually 
implementing the class itself. This is possible because of the strict pattern
for naming the functionality. Only the entity interface must be defined by the 
programmer.

### See also

* [The Main Repository](https://github.com/sendanor/hyperstack)
