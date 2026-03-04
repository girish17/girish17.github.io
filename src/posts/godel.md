---
title: AI and Gödel
category: Philosophy/AI
excerpt: Gödel's undecideability theorem states that in any mathematical system there are conjecture(s) that can neither be proved or disproved...
---

Gödel's undecideability theorem states that in any mathematical system there are conjecture(s) that can neither be proved or disproved. One such is Goldbach's conjecture which states that, any even number greater than two can be written as sum of (not necessarily distinct) primes.

e.g. $$4 = 2+2, 6 = 3+3, 8 = 5+3, 42 = 37+5$$

There's no proof for this conjecture. It cannot be disproved either using an example or by a proof of contradiction. Another such is the even-odd function:

Let $f: N \longrightarrow N$ be defined by

$$f(n) = \begin{cases} 
n/2 & \text{n even} \\
3n+1 & \text{n odd}
\end{cases}$$

then, for every $n$, there is an integer $i$ such that $f^{i}(n) = 1$.

e.g. 
$$f(21) = f(21 \times 3 + 1) = f(64)$$
$$= f(64/2) = f(32)$$
$$= f(32/2) = f(16)$$
$$= f(16/2) = f(8)$$
$$= f(8/2) = f(4)$$
$$= f(4/2) = f(2)$$
$$= f(2/2) = 1$$

Therefore, $f(f(f(f(f(f(f(f(21)))))))) = 1$

This too has no proof or can be disproved. However, it can be shown to work for large integers, through this computer program: [https://github.com/girish17/pdslab/blob/master/trials/oddEven.c](https://github.com/girish17/pdslab/blob/master/trials/oddEven.c)

The implication of Gödel's undecidability theorem on a computer science sub-field such as AI means the following:

> If we imagine giving to a computer an initial set of formulae (axioms) and a set of logical principles (operations) for calculating new formulae (theorems), then no matter how powerful the computer, there are some true statements that the computer will never be able to derive.

Although, computers have been useful in proving computationally difficult results, Gödel's undecidability theorem destroys the myth many people have that any difficult mathematical problem will eventually be solved by a powerful enough computer (AI). (Micheals & Rosen, 1991)

My conclusion is: AI/ML is unreliable and can never be used in a mission critical computer system where primarily human life is at stake i.e. life threatening situations, as there's no way to prove the correctness of all the algorithms used by an AI model (which is basically a mathematical system). I had watched this interview of Bjarne Stroustrup, creator of C++, with Lex Friedman on YouTube ([https://www.youtube.com/watch?v=uTxRF5ag27A&t=5891](https://www.youtube.com/watch?v=uTxRF5ag27A&t=5891)), years ago and he says that AI/ML cannot be trusted in life threatening situations and gives an example of a self-driving car asking for a human input in a very small time frame randomly. Ideally, no such input should be requested, it should take decisions on its own. What if the human is sleeping or reading a book in the car?
