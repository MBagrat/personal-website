---
title: "How to Configure Git Username and Email Address"
header:
  teaser: /assets/images/configure-git-username-and-email/configure-git-username-and-email.jpg
  og_imsge: /assets/images/configure-git-username-and-email/configure-git-username-and-email.jpg
categories:
  - Git
tags: 
  - git
  - vcs
  - version-control-system
toc: true
toc_sticky: true
---

{% include figure image_path="/assets/images/configure-git-username-and-email/configure-git-username-and-email.jpg" alt="Creating newer ECC keys for GnuPG header image" caption="The first thing you should do after installing Git on your system is to configure your git username and email address."%}

Git is a distributed version control system that’s being used by most software teams today. The first thing you should do after installing Git on your system is to configure your git username and email address. Git associate your identity with every commit you make.

Git allows you to set a global and per-project username and email address. You can set or change your git identity using the `git config` command. Changes only affect future commits. The name and email associated with the commits you made prior to the change are not affected.

### Setting Global Git Username and Email

The global git username and email address are associated with commits on all repositories on your system that don’t have repository-specific values.

To set your global commit name and email address run the `git config` command with the `--global` option:

```bash
git config --global user.name "Your Name"
git config --global user.email "youremail@yourdomain.com"
```

Once done, you can confirm that the information is set by running:

```bash
git config --list
```

Output

```bash
user.name=Your Name
user.email=youremail@yourdomain.com
```

The command saves the values in the global configuration file, `~/.gitconfig`:

```
[user]
    name = Your Name
    email = youremail@yourdomain.com
```

You can also edit the file with your text editor, but it is recommended to use the `git config` command.

### Setting Git Username and Email for a Single Repository

If you want to use a different username or email address for a specific repository, run the `git config` command without the `--global` option from within the repository directory.

Let’s say you want to set a repository-specific username and email address for a stored in the `~/Code/myapp` directory. First, switch the repository root directory:

```bash
cd ~/Code/myapp
```

Set a Git username and email address:

```bash
git config user.name "Your Name"
git config user.email "youremail@yourdomain.com"
```

Verify that the changes were made correctly:

```bash
git config --list
```

Output

```bash
user.name=Your Name
user.email=youremail@yourdomain.com
```

The repository-specific setting are kept in the `.git/config` file under the root directory of the repository.

### Conclusion

The Git username and email address can be set with the `git config` command. The values are associated with your commits.

If you are new to Git, read the [Pro Git book](https://git-scm.com/book/en/v2) , which is an excellent resource for learning about how to use Git.

Leave a comment below if you hit a problem or have feedback.
