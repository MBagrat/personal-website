---
title:  "The basic of dotfiles"
header:
  teaser: /assets/images/the-basic-of-dotfiles/the-basic-of-dotfiles.jpg
  header: /assets/images/the-basic-of-dotfiles/the-basic-of-dotfiles.jpg
  og_image: /assets/images/the-basic-of-dotfiles/the-basic-of-dotfiles.jpg
categories:
  - Linux
tags:
  - dotfiles
classes: wide
last_modified_at: 2024-01-15T11:08:45+04:00
---
## What are dotfiles
Your personal, crafted configuration!
- Text-based configuration files for the programs you use
- Personal scripts
- Called "dotfiles" because the file or directory starts with a "."

## Common dotfiles
On Linux and macOS there are certain dotfiles you will commonly see:
- `~/.bash_profile` - A script loaded when you log in
- `~/.bashrc` - A script loaded when you open a terminal
- `~/.emacs.d` - Emacs configuration
- `~/.vim.rc` - Vim configuration
- `~/.gitconfig` - Configuration for git
- `~/.config` - A folder full of many more configuration files

They're not as common on Windows, but many cross-platform programs will store dot-configuration files in `C:\Users\username` or `C:\Users\username\AppData\Roaming`.
Let's take a look!

## How should I manage theme?
The best way to manage your dotfiles is to keep them in source control.

## Benefits
- You can easily sync your configuration between multiple machines
- You can roll back to a previous configuration if you break something
- You can experiment with huge changes in branches
- You have a log of the changes you have been making over time, you never lose them!

## Which programs?
It doesn't really matter which one you choose. Decentralized is better though!

Obvious options are:
- [Git](https://git-scm.com)
- [Mercurial](https://www.mercurial-scm.org) (has implications for which host you can use)
- [Darcs](https://darcs.net)

However, I strongly recommend using Git so that you can do the next thing we will talk about:

## Publish your dotfiles!
It feels scary, but it's worth it.

Many programmers and computer enthusiasts now share their dot files on Github, Gitlab, and elsewhere.
With Emacs, you can take it even further!
Here's my dotfiles repo: [https://github.com/mbagrat/dotfiles](https://github.com/mbagrat/dotfiles)

## What's next?
- How to manage and share your dotfiles with Git
- Tools to make dotfiles management easier like GNU Stow
- Complete dotfiles management with Emacs (even on Windows!)


## Resources
{% include video id="BE87kUCTBVU" provider="youtube" %}
