---
title:  "How to create dotfilees folder"
header:
  teaser: /assets/images/how-to-create-dotfiles-folder/how-to-create-dotfiles-folder.png
  header: /assets/images/how-to-create-dotfiles-folder/how-to-create-dotfiles-folder.png
  og_image: /assets/images/how-to-create-dotfiles-folder/how-to-create-dotfiles-folder.png
categories:
  - MacOS
tags:
  - git
  - dotfiles
  - environment
classes: wide
last_modified_at: 2024-01-15T11:08:45+04:00
---

## Create a folder to store your dotfiles.
I recommend to creating this directory in the root of your home folder so that it's easier to use tools like GNU Stow:

{% include figure image_path="/assets/images/how-to-create-dotfiles-folder/how-to-create-dotfiles-folder.png" alt="The basic of dotfiles" %}

```shell
mkdir ~/.dotfiles
```

Now we have a fresh new folder ready to be populated with files!

## Move some of your existing configuration files and folders into it
Move the configuration files you care about to an equivalent file path in `~/.dotfiles:`

```shell

mv ~/.emacs.d ~/.dotfiles/
mv ~/.bash_profile ~/.dotfiles

# ... etc ...

```

You should mirror the directory structure that files have in your home folder on Linux and MacOs so that dotfiles management tools can easily place the files where they belong.

On Windows this doesn't matter quite as much.

## Create symbolic links to the original config file locations
You can use the  `ln` command on Linux and MacOs to create symbolic links from a source file or directory to a new location:

```shell
# Create a new link called ~/.emacs.d which comes from ~/.dotfiles/.emacs.d
ln -sf ~/.dotfiles/.emacs.d ~/.emacs.d
```

We'll use this to create links back into the home directory for all the configuration files and folders we moved.

## For Windows users
On Windows, you can create a junction using `mklink`. To create a link for an **individual file**, use `mklink /H`:

```
mklink /H link-name.conf original-file.conf
```

To create a link for a directory, use `mklink /J`:

```
mklink /J c:\Users\mbagrat\AppData\Roaming\.emacs.d c:\Users\mbagrat\AppData\Roaming\.dotfiles\.emacs.d
```

NOTE: this command only works when you have started the Command Prompt (cmd.exe) as an administrator! Make sure to right click the icon and select "Run as Administrator" to lunch an elevated prompt.

## The downside of symbolic links
As you might imagine, it's tedious to create and manage symbolic links this, especially when you are syncing them between machines.
Some people solve this by writing a "bootstrapping" script that can create all symbolic links automatically.
It's easier to use a tool meant for this purpose, we will talk about GNU Stow and others!

{% include video id="gibqkbdVbeY" provider="youtube" %}

## What's next?
Now that we have a dotfiles folder, the next step is to start managing it with Git!

## Resources
- Git Doc: [Git Doc](https://git-scm.com/)
