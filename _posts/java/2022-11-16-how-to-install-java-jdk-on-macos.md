---
title: "How to install Java JDK on macOS"
header:
  teaser: /assets/images/how-to-install-java-jdk-on-macos/how-to-install-java-jdk-on-macos-title.png
  og_image: /assets/images/how-to-install-java-jdk-on-macos/how-to-install-java-jdk-on-macos-title-512x288.png
categories:
  - Java
tags:
  - productivity
  - programming
  - technology
  - devops
  - tmux
  - jenv
classes: wide 
last_modified_at: 2022-11-25T12:35:16+04:00
---

This article shows how to install Java JDK on macOS, Homebrew package manager, manual installation, and switch between different JDK versions.

{% include figure image_path="/assets/images/how-to-install-java-jdk-on-macos/how-to-install-java-jdk-on-macos-title.png" alt="this is top image" %}

Tested with
  - macOS Ventura 13.0.1 
  - Homebrew 3.6.11 
  - JDK 8, 11, 17 (Amazon Corretto and OpenJDK)
  - jEnv 0.5.5

P.S At the time of writing, the latest JDK GA is JDK 18, and the early access build is JDK 19.

> Since macOS 10.15 Catalina, the default Terminal shell switch from the [bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) 
> (Bourne-again shell) to [zsh](https://en.wikipedia.org/wiki/Z_shell) (Z shell). And we should move all the startup scripts
> and environment variables in `~/.bash_profile` or `~/.bashrc` to `~/.zshenv` or `~/.zshrc`.
> Also, read this [Zsh Startup Files](http://zsh.sourceforge.net/Intro/intro_3.html).

## Homebrew install latest Java on macOS
1. Install and upgrade [Homebrew](https://brew.sh/).
2. `brew search openjdk` to find all available Java-related formula.
  ```zsh
    ~ ❯ brew search openjdk
    
    ==> Formulae
    openjdk ✔                  openjdk@17 ✔               openj9
    openjdk@11 ✔               openjdk@8 ✔                openvdb
    
    ==> Casks
    adoptopenjdk               microsoft-openjdk          openkey
    adoptopenjdk8              microsoft-openjdk11
  ```
3. `brew info` to show the formula details.  
   The java formula is always containing the latest Java JDK (OpenJDK) version; at the time of writing, the latest is JDK 19.
  ```zsh
    ~ ❯ brew info openjdk
    
    ==> openjdk: stable 19.0.1 (bottled) [keg-only]
    Development kit for the Java programming language
    https://openjdk.java.net/
    /usr/local/Cellar/openjdk/19.0.1 (638 files, 318.6MB)
      Poured from bottle on 2022-11-09 at 15:22:22
    From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/openjdk.rb
    License: GPL-2.0-only with Classpath-exception-2.0
  ```
   The `openjdk@17` formula is containing the java 17LTS version
  ```zsh
    ~ ❯ brew info openjdk@17
    
    ==> openjdk@17: stable 17.0.5 (bottled) [keg-only]
    Development kit for the Java programming language
    https://openjdk.java.net/
    /usr/local/Cellar/openjdk@17/17.0.5 (641 files, 305.9MB)
      Poured from bottle on 2022-10-20 at 01:50:10
    From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/openjdk@17.rb
    License: GPL-2.0-only with Classpath-exception-2.0
  ```
   The `openjdk@11` formula is containing the java 11LTS version
  ```zsh
    ~ ❯ brew info openjdk@11
    
    ==> openjdk@11: stable 11.0.16.1 (bottled) [keg-only]
    Development kit for the Java programming language
    https://openjdk.java.net/
    /usr/local/Cellar/openjdk@11/11.0.16.1_1 (678 files, 298.8MB)
      Poured from bottle on 2022-09-24 at 09:39:00
    From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/openjdk@11.rb
    License: GPL-2.0-only
  ```
   The `openjdk@8` formula is containing the java 8LTS version
  ```zsh
    ~ ❯ brew info openjdk@8
    
    ==> openjdk@8: stable 1.8.0+352 (bottled) [keg-only]
    Development kit for the Java programming language
    https://openjdk.java.net/
    /usr/local/Cellar/openjdk@8/1.8.0+352 (782 files, 192.0MB)
      Poured from bottle on 2022-11-13 at 23:18:44
    From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/openjdk@8.rb
    License: GPL-2.0-only
  ```
4. `brew install openjdk` to install the latest JDK 19.
  ```zsh
    ~ ❯ brew install openjdk
  ```
   Or any LTS version you want
  ```zsh
    ~ ❯ brew install openjdk@17
  ```
  ```zsh
    ~ ❯ brew install openjdk@11
  ```
  ```zsh
    ~ ❯ brew install openjdk@8
  ```
5. Where does Homebrew install the java?  
   Homebrew installed the JDK files and directories at `/usr/local/Cellar/openjdk/`, and symbolic link at `/usr/local/opt/openjdk` points to the latest Java 19.0.1 version.
  ```zsh
    ~ ❯ ls -lsa /usr/local/Cellar/openjdk/
    
    total 0
    0 drwxr-xr-x@   3 mbagrat  admin    96 Nov  9 15:22 .
    0 drwxrwxr-x  189 mbagrat  admin  6048 Nov 14 21:41 ..
    0 drwxr-xr-x@  10 mbagrat  admin   320 Nov  9 15:22 19.0.1
  ```
  ```zsh
    ~ ❯ ls -lsa /usr/local/opt/openjdk

    0 lrwxr-xr-x@ 1 mbagrat  admin  24 Nov  9 15:22 /usr/local/opt/openjdk -> ../Cellar/openjdk/19.0.1
  ```
6. The `openjdk` formula is [keg-only](https://docs.brew.sh/FAQ#what-does-keg-only-mean), which means it is installed in 
   `/usr/local/Cellar` but not linked into places like `/usr/local/bin` or `/Library/Java/JavaVirtualMachines/` (macOS `/usr/bin/java` wrapper).

   For macOS `/usr/bin/java` wrapper to find the installed JDK, we manually create a symbolic link at `/Library/Java/JavaVirtualMachines/`.
  ```zsh
    ~ ❯ sudo ln -sfn /usr/local/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk
  ```
7. Done.
  ```zsh
    ~ ❯ java --version
    
    openjdk 19.0.1 2022-10-18
    OpenJDK Runtime Environment Corretto-19.0.1.10.1 (build 19.0.1+10-FR)
    OpenJDK 64-Bit Server VM Corretto-19.0.1.10.1 (build 19.0.1+10-FR, mixed mode, sharing)
  ```

## What's jEnv?
`jenv` gives you a few critical affordances for using java on development machines:
  - It lets you switch between java versions. This is useful when developing Android applications, which generally require 
    Java 8 for its tools, versus server applications, which use later versions like Java 11 or java 17.
  - It sets `JAVA_HOME` inside your shell, in a way that can be set globally, local to the current working directory or per shell.

### Installing jEnv
On OSX, the simpler way to install jEnv is using Homebrew
```zsh
 ~ ❯ brew install jenv
```
To activate jenv, add the following to your ~/.zshrc:
```zsh
 export PATH="$HOME/.jenv/bin:$PATH"
 eval "$(jenv init -)"
```
Restart your shell by closing and reopening your terminal window or running exec `$SHELL -l` in the current session for the changes to take effect.

To verify `jenv` was installed, run `jenv doctor`. On a macOS machine, you'll observe the following output:
```zsh
 ~ ❯ jenv doctor
 
 [OK]	No JAVA_HOME set
 [ERROR]	Java binary in path is not in the jenv shims.
 [ERROR]	Please check your path, or try using /path/to/java/home is not a valid path to java installation.
 	PATH : /Users/user/.jenv/libexec:/Users/user/.jenv/shims:/Users/user/.jenv/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
 [OK]	Jenv is correctly loaded
```

To add JDK into `jenv` run
```zsh
 ~ ❯ jenv add /Library/Java/JavaVirtualMachines/openjdk.jdk/Contents/Home/
 
 openjdk64-19.0.1 added
 19.0.1 added
 19.0 added
```

A alias name will be generated by parsing "java -version"

To see all Java versions available to `jenv` run
```shell
 ~ ❯ jenv versions
 
   system
   1.8.0.342
   1.8.0.345
   11.0.15
   17.0
   17.0.3
   18.0
 * 19 (set by /Users/mbagrat/.jenv/version)
   19.0
   19.0.1
   corretto64-1.8.0.342
   corretto64-11.0.15
   corretto64-17.0.3
   corretto64-19
   openjdk64-1.8.0.345
   openjdk64-11.0.15
   openjdk64-17.0.3
   openjdk64-19
   openjdk64-19.0.1
```

To be set or show the global Java version run
```shell
 ~ ❯ jenv global 19
```

And that's it. To verify that everything setup correct, run `jenv doctor`.
```zsh
 ~ ❯ jenv doctor
 
 [OK]	JAVA_HOME variable probably set by jenv PROMPT
 [OK]	Java binaries in path are jenv shims
 [OK]	Jenv is correctly loaded
```

## References
- [jenv](https://www.jenv.be)
- [Homebrew](https://brew.sh/)
- [Wikipedia macOS](https://en.wikipedia.org/wiki/MacOS)
- [Zsh Startup Files](https://zsh.sourceforge.io/Intro/intro_3.html)
- [What should/shouldn’t go in .zshenv, .zshrc, .zlogin, .zprofile, .zlogout?](https://unix.stackexchange.com/questions/71253/what-should-shouldnt-go-in-zshenv-zshrc-zlogin-zprofile-zlogout)

