---
title: "Xcode: Markup For Playgrounds"
header:
    teaser: /assets/images/markup-for-playground/markup-for-playground-banner.jpeg
    og_image: /assets/images/markup-for-playground/markup-for-playground-banner.jpeg
categories:
  - Swift
tags:
  - xcode
  - swift
  - apple
  - ios
  - macos
  - playground
toc: true
toc_sticky: true
---

In this post you will learn how to use markup for Playgrounds.

*Hint: This post uses **Xcode 13.4** and **Swift 5**.*

{% include figure image_path="/assets/images/markup-for-playground/markup-for-playground-banner.jpeg" alt="this is top image" %}

Let’s start by looking at how the markup language works. Just start a new Playground and write the following lines:

```swift
/*:
 
 # Title
 
 Text
 
*/

var i: Int = 0
```

Now click ‘Editor -> Show Rendered Markup’ and you’ll get this result:

{% include figure image_path="/assets/images/markup-for-playground/markup-for-playground-rendered-markup-result.png" alt="Rendered markup result" caption="Rendered markup result" %}

You can switch back to the unrendered view by clicking ‘Editor -> Show Raw Markup’. It’s a little bit cumbersome though to use the menu for this task. It is better to add a shortcut for this operation. You can add a shortcut at ‘Xcode -> Preferences… -> Key Bindings -> Show Rendered Markup’:

{% include figure image_path="/assets/images/markup-for-playground/markup-for-playground-key-bindings.png" alt="Xcode Key Bindings" caption="Xcode key bindings setup" %}

All markup expressions are always inside comments, followed by `:` at the beginning of the comment:

```swift
/*:
 
 # Title
 
*/


//: #  Title
```

## Headers

You can use three different kinds of headers:

```swift
/*:
 
 # Heading
 ## Heading 2
 ### Heading 3
 
*/
```

This will be rendered as follows:

{% include figure image_path="/assets/images/markup-for-playground/markup-for-playground-heading.png" alt="Headings" caption="Headings" %}

## Links

### Internal links
Of course you can also add internet links:

```swift
//: [iOS development blog](http://www.thomashanning.com)
```
This will be rendered as follows:

{% include figure image_path="/assets/images/markup-for-playground/markup-for-playground-internal-links.png" alt="Internal links" caption="Internal links" %}

### Playground Page links
You can not only link outside of the playground, but also to other pages within the same playground. By the way: New playground pages can be created by clicking ‘File -> New -> Playground Page’. Now, if you want link to a Playground Page that is called ‘ExamplePage’, use the following:

```swift
//: [Example Page](ExamplePage)
```

You can also link to the next or the previous page by using `@previous` and `@next`:

```swift
/*:

[Link to the previous page](@previous)

[Link to the next page](@next)

*/
```

The order is determined by the the order of the pages inside the navigator.

## Lists
You can also easily create lists:

```swift
/*:

### List with bullet points:

* Line 1
* Line 2

*/
```

It will be rendered like this:

{% include figure image_path="/assets/images/markup-for-playground/markup-for-playground-bullet-points.png" alt="Bullet points" caption="List with bullet points" %}

You can also have different levels by using indentations:

```swift
/*:

### List with bullet points:

* Line 1
  * Line 1 a
  * Line 1 b
* Line 2

*/
```
It will be rendered like this:

{% include figure image_path="/assets/images/markup-for-playground/markup-for-playground-different-levels-bullet-points.png" alt="Different levels bullet points" caption="List with different level bullet points" %}

Of course also numbered lists are possible:

```swift
/*:

### List with numbers:

1. Line 1
2. Line 2

*/
```
It will be rendered like this:

{% include figure image_path="/assets/images/markup-for-playground/markup-for-playground-numbered-list.png" alt="Numbered list" caption="Numbered list" %}

## Images
You can display images that are located inside the ‘Resources’ folder of your playground. You can just drag and drop the image into the playground, if the navigator is open:

{% include figure image_path="/assets/images/markup-for-playground/markup-for-playground-xcode-navigation-view.png" alt="Xcode Navigation view" caption="Xcode Navigation view" %}

Now you can display the image inside your playground:

```swift
/*:

![alternate text ](swift.png)

*/
```

The alternate text will be displayed, if the image cannot be loaded.

## Bold and italic
It’s also possible to use bold and italic:

```swift
/*:

*italic*

**bold**

*/
```

## Xcode Playground - Introduction

[![Blinking LEDs](http://img.youtube.com/vi/oMLHuX5nHvM/0.jpg)](https://www.youtube.com/watch?v=oMLHuX5nHvM "Xcode Playground - Introduction")

## Resources

- Original Article - [Xcode: Markup For Playgrounds](https://thomashanning.com/xcode-markup-for-playgrounds/)

