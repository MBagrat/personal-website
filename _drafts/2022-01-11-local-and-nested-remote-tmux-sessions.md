---
title: "Tmux in practice: Local and nested remote tmux sessions"
header:
teaser: /assets/images/tmux-in-practice/tmux-in-practice.jpg
og_image: /assets/images/tmux-in-practice/tmux-in-practice.jpg
categories:
  - Tools
tags:
  - productivity
  - programming
  - technology
  - devops
  - tmux
classes: wide
---

{% include figure image_path="/assets/images/tmux-in-practice/tmux-in-practice.jpg" alt="this is top image"  
caption="We discuss tmux features, their relevance for local and remote scenarios, and how to setup and configure tmux to support nested sessions" %}

This is the first part of my [tmux in practice]({{ site.baseurl }}/tools/tmux-in-practice/) article series. It is about 
using and configuring [tmux](https://github.com/tmux/tmux) v2, local and remote tmux sessions usage, and how to support 
a scenario when a remote tmux session is going to be nested inside a local tmux session.

Before you start reading, here is a [working example](https://github.com/MBagrat/tmux-config) from my machine. We have a 
local tmux session on OSX inside iTerm2 (run in full screen mode). The local session has 2 windows: “zsh” and “node”.

The “zsh” window is split into 2 panes: in both panes we SSH’ed to the remote hosts (CentOS7 and Ubuntu14) and jump into
remote tmux sessions there.

The bottom pane with the Ubuntu14 remote session is further split into 2 panes, and we have 3 windows: shell, mon, and logs.

{% include figure image_path="assets/images/tmux-in-practice/local-and-nested-remote-tmux-sessions/local-and-nested-remote-tmux-sessions.png" 
alt="this is top image" caption="Nested tmux remote sessions happily coexist even in side-by-side panes in local tmux session" %}

If you’re curious how it all works together, continue reading.

## Features
First let’s quickly go through tmux features and advantages, to understand their relevance to local or remote scenarios. 
We should clarify to ourselves why we need this “nested tmux in tmux” thing, because at first glance it looks pretty crazy.

1. **Terminal multiplexing, named windows, split window into several panes.** This makes more sense for the local environment, when you decide to supercharge your terminal emulator, which otherwise does not support aforementioned features. For example, iTerm or Terminator are already capable of multiplexing a terminal.
2. Setup and kick off tmux session with a pre-configured set of windows and panes, their arrangement, and commands run inside to **avoid hassle of repeatedly setting up them again and again from scratch.**  
  For example: “dev” session, which includes the 
    - “#1: shell” window with 2 panes for ad-hoc usage
    - “#2: monitoring” window with `htop` and `sysdig` panes
    - “#3: log” window with `journalctl` and `tail -f app.log` panes
    - “#4: node” window running `node` server  
    
    Tmux lets you write script to achieve this, and if you prefer the configuration-like approach, take a look at [tmuxinator](https://github.com/tmuxinator/tmuxinator).   
    
    This is relevant for both local and remote scenario.
3. **Persist your working state, so you can detach and resume later with the same state as you left.** When working locally with several projects, you can setup several per-project tmux sessions and switch context easily On the remote machine, you can detach from session by the end of a working day, and get back to the same session from home at evening.
4. **Survive abrupt connection drops.** This is one of the most important feature. Suppose, you SSH onto remote host, and have a long-running process there. If SSH connection is lost or physical network drop occurs, SIGHUP signal would be sent to the remote shell, and it and all its child processes would be terminated. Tmux makes your remote processes resistant to such risks.

Less important features, but still worth mention are as follows:

1. **Once you setup tmux environment, you are less dependent on the parent terminal emulator and its unique set of features**, and can switch to another terminal emulator will less hassle. Given I’m an iTerm2 on OSX user, I can migrate to Terminator or konsole on Linux by installing my tmux configuration there, and get the very same known environment I am already used to.
2. **Share your remote session with your colleague, so you can collaborate in real time.** I think it’s of rare use in a real world, but sounds cool. Yeah, pair programming, and other cool buzzwords. 😏

So, to conclude, **tmux is responsible for two main things:**

1. Terminal multiplexing, session/window/pane management
2. Persist session state and survive disconnects for remote scenarios

Where tmux really shines is (2). Regarding (1), [some people argue](https://news.ycombinator.com/item?id=11283955), 
that tmux breaks Unix philosophy, because it’s trying to do 2 things, instead of doing one and doing it well, and that (1) 
should not be a tmux responsibility.

### Nested local and remote sessions

So, given all that, some people prefer using tmux on the local machine only on top of their terminal emulator, supercharging 
it with multiplexing and window management in the first place. People who spent most of their time SSH’ing on remote hosts, 
make use of persistent session nature and resistance to network disconnects.

**But do local and remote cases have to be mutually exclusive? Can I combine them?** Yes, it’s legal to SSH to a remote host 
and start the tmux session there, while already being in a tmux environment locally.

This is called nested sessions, but comes with some obstacles:

First of all, you face the question: **How you can control inner sessions, since all keybindings are caught and handled by 
outer sessions?**

The most common solution is to press `prefix` twice (prefix is a keybinding that puts tmux in a command mode, usually it’s 
`C-b`, but some people prefer remapping it to screen-like `C-a`). The first prefix keystroke is caught by the outer session, 
whereas second is passed to the inner session. No extra steps need to be done, and this works out of the box.

However, root keybindings — those which are listened globally, not in command mode — are still caught by the outer session 
only. And I found it’s really annoying to double press `prefix`. For me it’s even annoying to press it once, in iTerm2 
there is no such thing as command mode, and I just press `“⌘⌥→”` to select pane on the right, instead of sending two 
separate keystrokes `C-a RightArrow`.

Another solution is to setup 2 individual prefixes, for example, `C-b` for a local session, while `C-a` for a remote one. 
With the configuration below, it means that pressing `C-a` locally would send default prefix `C-b` to the remote session. 
Found this solution [here](https://simplyian.com/2014/03/29/using-tmux-remotely-within-a-local-tmux-session/).

```shell
set -g prefix C-b
bind-key -n C-a send-prefix
```

But it really feels like:

{% include figure image_path="assets/images/tmux-in-practice/local-and-nested-remote-tmux-sessions/you-dawg-i-heard-you-like-tmux.jpeg"
alt="You dawg, I heard you like tumx" %}

