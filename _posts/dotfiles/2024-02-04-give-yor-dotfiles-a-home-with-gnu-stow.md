---
title:  "Give yor dotfiles a home with GNU Stow"
header:
  teaser: /assets/images/give-yor-dotfiles-a-home-with-gnu-stow/give-yor-dotfiles-a-home-with-gnu-stow.png
  header: /assets/images/give-yor-dotfiles-a-home-with-gnu-stow/give-yor-dotfiles-a-home-with-gnu-stow.png
  og_image: /assets/images/give-yor-dotfiles-a-home-with-gnu-stow/give-yor-dotfiles-a-home-with-gnu-stow.png
categories:
  - MacOS
tags:
  - git
  - stow
  - dotfiles
  - environment
classes: wide
last_modified_at: 2024-01-15T11:08:45+04:00
---

## Getting started.
Make sure you have already set up a dotfiles directory like I've described in the video called [How to create dotfiles folder](https://mbagrat.com/macos/how-to-create-dotfiles-folder/)

{% include figure image_path="/assets/images/give-yor-dotfiles-a-home-with-gnu-stow/give-yor-dotfiles-a-home-with-gnu-stow.png" alt="The basic of dotfiles" %}

In this video I'm going to assume that your dotfiles directory is located right inside your home, and it's called `~/.dotfiles`.

You'll also need to install GNU Stow, you can find it in the package managers of most GNU/Linux distributions with the name `stow`.

If you're on macOS, you can install it with Homebrew via the command `brew install stow`

On Windows, you can install Stow via the `MSYS2` command shell using `pacman -S stow`, but make sure you run the shell as Administrator and have the `MSYS` environment variables set to `winsymlinks:nativestrict` so that it creates symbolic links correctly, otherwise `stow` just copies the files!

## About GNU Stow
[GNU Stow](https://www.gnu.org/software/stow/) describe itself as a "symlink farm manager", but in practical terms it's just a program that can mirror the structure of one directory into another by creating symbolic links back to the original files.

This is extremely useful when you have a directory full of configuration files that is managed by Git and you want to send all of those configuration files to where they belong in your home directory.

## Basic usage

Let's say we've got our configuration files stored in a directory under home directory called `.dotfiles`. We can easily create symbolic links to the files in this directory to the equivalent locations in the home directory using the following command:

```shell
stow .
```

Before we run that, let’s take a look at what’s already in the `.dotfiles` directory and the home directory:

```shell
ls -al ~
ls -al ~/.dotfiles
```

Now let’s run the`stow` command that I mentioned before:

```shell
cd ~/.dotfiles
stow .
ls -al ~
```

We can now see that all of the configuration files under `~/.dotfiles`, even those in child directories, have had symbolic links created!

It’s possible that you will receive an error saying that the target file or link already exists so you might need to remove existing files before this command will succeed.

## How it's works
GNU Stow walks the file and directory hierarchy of the directory passed as the first parameter to the stow command and creates symbolic links to those files in the equivalent locations in the target directory.

The important things to be aware of here is that our dotfiles directory `must have the same layout` as where the files would be placed under the home directory structure in your dotfiles folder so that all symbolic links get created in the right place.

One thing you may have noticed: we didn't specify what the target directory is! By default, `stow` assumes that the target directory is the parent directory of the one that you specify.

This means that `stow .` is equivalent to:

```shell
stow --dir=~/.dotfiles --targe=~/

# OR

stow  -d ~/.dotfiles -t ~/
```

This means that you have full control over the source and target directories that Stow uses!

> TIP: If you keep your dotfiles directory somewhere other than home folder, I'd recommend creating a simple Bash script for invoking stow with the right parameters since you'll probably have to run it occasionally.

## Ignoring files and directories
By default, GNU Stow does a good job of [ignoring common files and directories](https://www.gnu.org/software/stow/manual/stow.html#Types-And-Syntax-Of-Ignore-Lists) you might not want to be linked back to your home directory like `README` and `LICENSE` files, source control folders.

Let's say you have other files in your dotfiles folder that you don't want to have linked to your home directory. For example, our dotfiles folder has a `Notes.org` file. That really doesn't need to be in our home folder.

To skip files like this, we can create a file in our dotfiles folder called `.stow-local-ignore`. Each line of this file should be a string or regular expression representing any file or directory you don't want to link to your home folder.

Here's an example:

```shell
\.git
misc
#LICENSE
^/.*\.org
```

This will avoid linking the `.git` folder (important!), a folder called `mis`, the `LICENSE` file, and any files ending in `.org`, the latter being useful for you if you use Emacs and Org Mode to keep literate configuration files!

An important detail here is that specifying your own ignore file will override. Stow's default ignore list! We now need to add `LICENSE` to this list to ensure it doesn't get linked.

[GNU Stow Manual: Type and Syntax of Ignore lists](https://www.gnu.org/software/stow/manual/html_node/Types-And-Syntax-Of-Ignore-Lists.html)

## Cleaning up symbolic links
If for some reason you'd like to get rid of all the symbolic links that GNU Stow created in your home folder, you can do that with one extra parameter to the command we've been running so far:

```shell
stoe -D .
```

All of the previously-created symbolic links in the home directory will now be gone!

## Don't forget to `stow` every time you sync!
One last tip I'll mention: if you use Git to commit your configuration files to a repo that is shared between multiple machines, don't forget to run `stow` each time you sync to ensure that any new configuration files get linked into the proper location.

To make sure you never forget to do this, you can use this script I created `sync-dotfiles` to automate the whole process. This script will stash current changes to your dotfiles folder, pull any new changes from the remote repo, pop the stashed changes, and then run `stow .`

You might consider keeping this in a `bin` subfolder of your `~/.dotfiles` directory and add it to `PATH!`

```shell
#!/bin/sh

# Sync dotfiles repo and ensure that dotfiles are tangled correctly afterward

GREEN='\033[1;32m'
BLUE='\033[1;34m'
RED='\033[1;30m'
NC='\033[0m'

# Navigate to the directory of this script (generally ~/.dotfiles/.bin)
cd $(dirname $(readlink -f $0))
cd ..

echo -e "${BLUE}Stashing existing changes...${NC}"
stash_result=$(git stash push -m "sync-dotfiles: Before syncing dotfiles")
needs_pop=1
if [ "$stash_result" = "No local changes to save" ]; then
    needs_pop=0
fi

echo -e "${BLUE}Pulling updates from dotfiles repo...${NC}"
echo
git pull origin master
echo

if [[ $needs_pop -eq 1 ]]; then
    echo -e "${BLUE}Popping stashed changes...${NC}"
    echo
    git stash pop
fi

unmerged_files=$(git diff --name-only --diff-filter=U)
if [[ ! -z $unmerged_files ]]; then
   echo -e "${RED}The following files have merge conflicts after popping the stash:${NC}"
   echo
   printf %"s\n" $unmerged_files  # Ensure newlines are printed
else
   # Run stow to ensure all new dotfiles are linked
   stow .
fi
```

> NOTE: You might need to change the name of the `master` branch to `main` if your repository uses that instead!

{% include video id="CxAT1u8G7is" provider="youtube" %}

## Resources
- GNU Stow: [GNU Stow](https://www.gnu.org/software/stow/)
- GNU Stow Doc: [GNU Stow Doc](https://www.gnu.org/software/stow/manual/stow.html)

