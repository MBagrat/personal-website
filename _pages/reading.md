---
title: "Reading List"
layout: single
permalink: /reading-list
author_profile: true
classes: wide
---
Here is a list of reading resources that I have found helpful.

## Books

### The Pragmatic Programmer
Andrew Hunt and David Thomas, Addison-Wesley, 2000

This was the book that really got me interested in software development as a craft and not just a means to an end. It confirmed what I had noticed over several years through my own experience in developing software and extended my horizons about what is and should be possible if one wishes to create quality software. This book is a great place to start your journey from hacking scripts together to creating software that you can be proud of.

### Working Effectively With Legacy Code
Michael Feathers, Prentice Hall, 2004

Lots of software falls into the category of Legacy Code: code that either has no tests, is so written that no-one wants to touch it, or induces fear at the thought of having to change it. This is but one of the reasons why one should write clean code, however, we are seldom so lucky. This book contains strategies for dealing with old (or not-so-old!) programs and how you can safely update and improve them so that you can get on with implementing that new feature without the fear of breaking already-working production code.

### Code Complete (2nd Edition)
Steve McConnell, Microsoft Press, 2004

This is an updated edition of the classic work on software construction. Where “The Pragmatic Programmer” and “Clean Code” both discuss software construction and the mechanics and behaviours involved in that construction (with a focus on agile techniques), this book takes the topic much deeper. It provides not only advice and insights from the author’s personal experience (as the other books do) but also the results of research and case studies into software development. If you wish more detail and more depth concerning software development, and possibly research-supported reasons for writing clean, maintainable code, then this is a must-read. Because of the level of depth and detail it is quite a tome, so be prepared for the time investment required to read it.

### Refactoring
Martin Fowler, Addison-Wesley, 1999

Software is almost never written correctly the first time. There might be code smells, the design might not be quite right, the software might not actually deliver what the users actually want. This usually isn’t really an issue since software is so malleable and as such the software, its architecture and its design can be improved over time. This is especially important if users’ requirements also change over time. The process of moulding software into that which does the required job is called refactoring, and this is the book on the topic. If you have inherited software and need to extend it as part of your work (without breaking existing functionality!) then this book will provide you with advice as to how to do this. After having read the first 5 chapters you should be able to see how the advice applies to your particular situation. The remaining chapters focus on individual refactorings and can be used as a reference as soon as you notice particular code smells in your own software.

### Practical Vim
Drew Neil, Pragmatic Bookshelf, 2012

If you use any other editor other than vim this book probably won’t help you much. However, if you use vim as your editor this is the book to buy. Even if you’ve been using vim for several years (I’ve been using vim intensively since about 2000) and you think there isn’t much more to learn, this book will still teach you something.

## Screencasts/Videos
### Destroy all software
[http://destroyallsoftware.com](http://destroyallsoftware.com){:target="_blank"}

Gary Bernhardt presents in his series of screencasts a varied mixture of topics within and surrounding software development. He has obviously thought very deeply about the topics he presents, since he often focuses on why something is the way it is or why it should be done in a particular way. The screencasts are very focussed and contain a large amount of information compressed into the 10 to 15 minute long videos. Your head will likely hurt after watching a screencast since there is so much information packed into each one. The videos are mostly presented in the Ruby programming language and often discuss web-based applications using the Model-View-Controller design pattern. While this may not sound like it will help you in your current situation, the presentations about testing and design principles will help you partition your code to make it much more easily extensible so that adding that new feature will be much simpler. Even if that isn’t really what you’re looking for, how he combines the Unix shell, Git and Vim into a complete and powerful development environment will show you how to save time in the regular tasks so that you can spend more time thinking about solving interesting problems.

### Vimcasts.org
[http://vimcasts.org](http://vimcasts.org){:target="_blank"}

Not only has Drew Neil written a great book on the subject, he also creates free screencasts concerning vim tips and usage. My recommendation: start from the beginning and work your way through to the most recent episodes (there are currently over 50 episodes). They are usually about 5–10 minutes long and contain a very focussed, clear and polished discussion about a given vim feature (of which there are many).
