---
title: Fields
category: Mathematics
excerpt: Definition and properties of fields in linear algebra, covering commutativity, associativity, and distributivity.
---

Let $F$ denote either the set of real numbers or the set of complex numbers:

1.  Addition is commutative: $x+y = y+x, \forall x,y \in F$
2.  Addition is associative: $x+(y+z) = (x+y)+z, \forall x, y, z \in F$
3.  There is a unique element $0 \in F: x+0=x, \forall x \in F$
4.  Multiplication is commutative: $xy = yx, \forall x,y \in F$
5.  To each $x \in F$ there corresponds a unique element $(-x) \in F: x+(-x)=0$
6.  Multiplication is associative: $x(yz) = (xy)z, \forall x,y,z \in F$
7.  There is an unique non-zero element $1 \in F$ such that $x.1 = x, \forall x \in F$
8.  To each non-zero $x \in F$ there corresponds a unique element $x^{-1} \in F$ such that $xx^{-1}=1, \forall x \in F$
9.  Multiplication distributes over addition; that is, $x(y+z) = xy+xz, \forall x,y,z \in F$
10. Addition associates with each pair of elements $x,y \in F$ an element $(x+y) \in F, \forall x,y \in F$
11. Multiplication associates with each pair $x, y$ an element $x.y \in F, \forall x,y \in F$

### Summary of Properties

| Property | Addition | Multiplication |
| :--- | :--- | :--- |
| Closure | $x+y \in F$ | $x.y \in F$ |
| Commutativity | $x+y=y+x$ | $x.y=y.x$ |
| Identity | $x+0=x$ | $x.1=x$ |
| Associativity | $x+(y+z)=(x+y)+z$ | $x(yz)=(xy)z$ |
| Inverse | $x+(-x)=0$ | $xx^{-1}=1$ |
| Distributivity | $x(y+z)=xy+xz, \forall x,y,z \in F$ | |

- The set of rational numbers $\mathbb{Q}$ is a subfield of complex numbers $\mathbb{C}$.
- The set of all complex numbers of the form $x+y\sqrt{2}$ where $x$ and $y$ are rational, is a subfield of $\mathbb{C}$.
