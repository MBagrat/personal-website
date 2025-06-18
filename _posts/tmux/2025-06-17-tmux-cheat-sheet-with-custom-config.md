---
title: "Tmux Cheat Sheet with Custom Configuration"
header:
  teaser: /assets/images/tmux-cheat-sheet/tmux-cheat-sheet.jpg
  og_image: /assets/images/tmux-cheat-sheet/tmux-cheat-sheet.jpg
categories:
  - Terminal
tags:
  - tmux
  - terminal
  - productivity
  - devops
toc: true
toc_sticky: true
last_modified_at: 2025-06-17T22:29:16+04:00
# classes: wide
---

A comprehensive guide and cheat sheet for using tmux effectively, including keyboard shortcuts, command-line commands, and configuration tips.

{% include figure image_path="/assets/images/tmux-cheat-sheet/tmux-cheat-sheet.jpg" alt="Tmux Cheat Sheet" %}

## Getting Started

### Start and Manage Sessions

| Task                    | Command                           |
| ----------------------- | --------------------------------- |
| Start tmux              | `tmux`                            |
| Start new named session | `tmux new -s <session-name>`      |
| Attach to last session  | `tmux attach` or `tmux a`         |
| Attach to named session | `tmux a -t <session-name>`        |
| List all sessions       | `tmux ls` or `tmux list-sessions` |
| Kill session            | `tmux kill-session -t <name>`     |

## Prefix Key

Default prefix key:

```
Ctrl + a
```

> 💡 Note: I've remapped `Caps Lock` to `Ctrl` using MAC OS keyboard settings for easier access.

To change to `Ctrl+a` (like GNU screen), add this to `~/.tmux.conf`:

```bash
unbind C-b
set -g prefix C-a
bind C-a send-prefix
```

## Sessions

| Task                | Keyboard / Command                 |
| ------------------- | ---------------------------------- |
| List sessions       | `Ctrl+a s` / `tmux ls`             |
| Detach from session | `Ctrl+a d`                         |
| Rename session      | `Ctrl+a $` / `tmux rename-session` |
| Switch session      | `tmux switch-client -t <name>`     |

## Windows

| Task              | Keyboard / Command                |
| ----------------- | --------------------------------- |
| Create new window | `Ctrl+a c` / `tmux new-window`    |
| Rename window     | `Ctrl+a ,` / `tmux rename-window` |
| List windows      | `Ctrl+a w`                        |
| Close window      | `Ctrl+a &` / `tmux kill-window`   |
| Move window       | `tmux move-window -s 1 -t 2`      |
| Select window     | `Ctrl+a 0-9` / `n` / `p` / `l`    |

## Panes

| Task               | Keyboard / Command                  |
| ------------------ | ----------------------------------- |
| Split horizontally | `Ctrl+a "` / `tmux split-window -v` |
| Split vertically   | `Ctrl+a %` / `tmux split-window -h` |
| Switch pane        | `Ctrl+a o` / `Ctrl+a ;`             |
| Resize pane        | `Ctrl+a` + arrow keys               |
| Kill pane          | `Ctrl+a x` / `tmux kill-pane`       |
| Toggle zoom        | `Ctrl+a z`                          |

## Copy Mode (vi-style)

Enable in config:

```bash
setw -g mode-keys vi
```

| Task                | Keyboard / Command       |
| ------------------- | ------------------------ |
| Enter copy mode     | `Ctrl+a [`               |
| Scroll in copy mode | `PgUp`, `k/j/h/l`, `w/b` |
| Start selection     | `Space`                  |
| Copy selection      | `Enter`                  |
| Paste buffer        | `Ctrl+a ]`               |
| Search text         | `/`, `?`, then `n`/`N`   |

## Mouse Mode

Enable mouse support in `~/.tmux.conf`:

```bash
set -g mouse on
```

- Click to switch panes/windows
- Scroll with mouse wheel
- Drag to resize

## Buffers

| Task                 | Command                            |
| -------------------- | ---------------------------------- |
| List buffers         | `tmux list-buffers`                |
| Show buffer contents | `tmux show-buffer -b 0`            |
| Paste buffer         | `tmux paste-buffer -b 0`           |
| Save buffer to file  | `tmux save-buffer -b 0 buffer.txt` |
| Delete buffer        | `tmux delete-buffer -b 0`          |

## Configuration Tips

Example `~/.tmux.conf`:

```bash
# Set Ctrl+a as prefix (replacing Caps Lock with Ctrl in OS settings)
unbind C-b
set -g prefix C-a
bind C-a send-prefix

# Enable mouse
set -g mouse on

# Vi mode
setw -g mode-keys vi
set -g status-keys vi

# History
set -g history-limit 10000

# Reload config
bind r source-file ~/.tmux.conf \; display-message "Reloaded!"
```

## Miscellaneous

| Task                 | Command                         |
| -------------------- | ------------------------------- |
| Enter command prompt | `Ctrl+a :`                      |
| Show key bindings    | `tmux list-keys`                |
| Reload config        | `tmux source-file ~/.tmux.conf` |
| Show info            | `tmux info`                     |

## Exiting

| Task              | Command            |
| ----------------- | ------------------ |
| Kill pane/window  | `exit`, `Ctrl+d`   |
| Kill all sessions | `tmux kill-server` |

## Custom Configuration Notes

> 📌 **Note from the user**: The following customizations are applied in my tmux setup:
>
> - Caps Lock is remapped to Ctrl at the OS level for ergonomic usage.
> - Prefix key is changed to `Ctrl+a`.
> - Mouse mode is enabled.
> - Panes and windows start indexing at 1.
> - Shift+Arrow and Alt+Vim keys are used for navigation.
> - Pane splitting uses `|` and `-` instead of `%` and `"`.
> - Vi mode enabled in copy mode and pane navigation.
> - Plugins managed with TPM, including:
>   - `tokyo-night-tmux` theme
>   - `vim-tmux-navigator`
>   - `tmux-which-key`
>   - (Optional) `resurrect`, `continuum`, etc.
> - Status bar is moved to the top.
> - Tree view with `s` key to sort/select panes and windows.

## References

- [tmuxcheatsheet.com](https://tmuxcheatsheet.com)
- [Official tmux documentation](https://github.com/tmux/tmux/wiki)
