---
title: How to evaluate a software library?
category: Tech
excerpt: Key things to keep in mind when evaluating software libraries for your development and testing needs.
---

Very often we depend on a lot of software libraries for development and testing our custom software. Here are few things to keep in mind in doing so:

1.  **README and Releases:** We should go through the *README.md* file (if it exists, most of them *do*), releases and tags to identify how frequently the changes are made and the kind of bug fixes turned in.
2.  **Build from Source:** Download the source and build it. This gives us an idea whether the current version available is well maintained or not. Ideally, cloning from the repository (instead of downloading as a release in the form of tar or zip) and building it on a local machine should help us in estimation of time involved. This also allows us to understand the settings and configurations needed and whether the repository is well documented or not.
3.  **Try Examples:** Then, we should try out an example if it is mentioned in the repository or some found online. This should get us started. Most of the times we would end up cloning the repository and sifting across different folders to figure out if there were a way to execute it (happens most of the times in my case!).
4.  **Enhance and Tweak:** Then we must try to tweak the sample application to do some extra functions. For example — If we happen to evaluate say a graph plotting library then we can try changing the code to add an additional data point or an axes (too naive but useful!). We should try to extend the existing library by adding a small enhancement say like adding a color template/theme. A line graph could just be plotting the curve, we can maybe try to display the coordinates inline. This makes us feel more comfortable with the library. We also get an idea of how reusable it is and adding small features does actually make it look prettier.
5.  **Rating:** Having done all these, now we can start some sort of a rating (to rate or not to rate is too irate!). We can rate on following aspects:
    - **Ease of configuration:** Can I just double click on the executable and viola it’s up and running or even better no configuration required (it chooses for me — the *default*).
    - **Resource usage:** In terms of memory, CPU, network.
    - **Support:** Check those IRC channels, chats and comments in the community.
