---
title: 'The Ultimate Tmux Cheat Sheet: Master Terminal Multiplexing'
excerpt:
  'A comprehensive guide to tmux with advanced configurations, productivity tips, and real-world
  workflows for developers and system administrators.'
header:
  teaser: /assets/images/tmux-cheat-sheet/tmux-cheat-sheet.jpg
  og_image: /assets/images/tmux-cheat-sheet/tmux-cheat-sheet.jpg
  overlay_image: /assets/images/tmux-cheat-sheet/tmux-cheat-sheet.jpg
  overlay_filter: 0.5
  caption:
    'Photo credit: [**Terminal
    Productivity**](https://unsplash.com/photos/a-computer-screen-with-a-bunch-of-text-on-it-1LLh8k2_YFk)'
categories:
  - Terminal
  - Productivity
  - DevOps
tags:
  - tmux
  - terminal
  - productivity
  - devops
  - workflow
  - multiplexer
  - configuration
toc: true
toc_sticky: true
toc_label: 'Navigation'
toc_icon: 'terminal'
sidebar:
  - title: 'Quick Reference'
    text:
      'Download the [PDF cheat sheet](/assets/downloads/tmux-cheat-sheet.pdf) for offline reference.'
  - title: 'Video Tutorial'
    text: 'Watch our [YouTube tutorial](https://youtube.com/watch?v=example) for visual learners.'
last_modified_at: 2025-06-28T15:30:00+04:00
# classes: wide
---

Tmux (terminal multiplexer) is an essential tool for developers and system administrators who work
extensively in the terminal. This comprehensive guide covers everything from basic usage to advanced
configurations, helping you become a tmux power user.

{% include figure image_path="/assets/images/tmux-cheat-sheet/tmux-cheat-sheet.jpg" alt="Tmux Cheat Sheet Overview" caption="Master tmux to supercharge your terminal workflow" %}

## Why Use Tmux?

Before diving into commands, let's understand why tmux is invaluable:

- **Session Persistence**: Keep your work alive even when disconnected
- **Multiple Windows**: Organize different projects in separate windows
- **Pane Management**: Split your terminal for multitasking
- **Remote Work**: Perfect for SSH sessions and server management
- **Scripting**: Automate complex terminal setups

{: .notice--info} **Pro Tip**: Tmux is especially powerful when combined with tools like Vim, Git,
and various CLI utilities. It transforms your terminal into a complete development environment.

## Installation

### macOS

```bash
# Using Homebrew
brew install tmux

# Using MacPorts
sudo port install tmux
```

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install tmux
```

### CentOS/RHEL/Fedora

```bash
# CentOS/RHEL
sudo yum install tmux

# Fedora
sudo dnf install tmux
```

## Getting Started

### Session Management

| Task                | Command                          | Description                 |
| ------------------- | -------------------------------- | --------------------------- |
| Start tmux          | `tmux`                           | Start with default session  |
| Start named session | `tmux new -s <session-name>`     | Create session with name    |
| Start with command  | `tmux new -s work -c ~/projects` | Start in specific directory |
| Attach to last      | `tmux attach` or `tmux a`        | Reconnect to last session   |
| Attach to named     | `tmux a -t <session-name>`       | Connect to specific session |
| List sessions       | `tmux ls`                        | Show all active sessions    |
| Kill session        | `tmux kill-session -t <name>`    | Terminate specific session  |
| Kill all sessions   | `tmux kill-server`               | Terminate tmux server       |

### Creating Your First Session

```bash
# Start a new session for a project
tmux new-session -d -s "my-project" -c ~/code/my-project

# Create multiple windows
tmux new-window -t "my-project" -n "editor" -c ~/code/my-project
tmux new-window -t "my-project" -n "server" -c ~/code/my-project
tmux new-window -t "my-project" -n "logs" -c ~/code/my-project

# Attach to the session
tmux attach-session -t "my-project"
```

## The Prefix Key

The prefix key is your gateway to tmux commands. By default, it's `Ctrl+b`, but many users prefer
`Ctrl+a`:

```bash
# Default prefix
Ctrl + b
```

{: .notice--warning} **Important**: All tmux keyboard shortcuts require pressing the prefix key
first, then the command key. For example, `Ctrl+a c` means press `Ctrl+a`, release, then press `c`.

### Changing the Prefix Key

Add this to your `~/.tmux.conf`:

```bash
# Unbind default prefix
unbind C-b

# Set new prefix to Ctrl+a
set -g prefix C-a

# Ensure we can send Ctrl+a to applications
bind C-a send-prefix
```

{: .notice--tip} **Ergonomic Tip**: Remap your Caps Lock key to Ctrl at the OS level. This makes
`Ctrl+a` much more comfortable to press repeatedly.

## Session Control

| Task                   | Keyboard Shortcut | Command Line                 |
| ---------------------- | ----------------- | ---------------------------- |
| List all sessions      | `Ctrl+a s`        | `tmux list-sessions`         |
| Detach from session    | `Ctrl+a d`        | `tmux detach-client`         |
| Rename current session | `Ctrl+a $`        | `tmux rename-session <name>` |
| Switch to last session | `Ctrl+a L`        | `tmux switch-client -l`      |
| Choose session tree    | `Ctrl+a w`        | Interactive session browser  |

### Session Workflow Example

```bash
# Development workflow
tmux new -s dev -d
tmux send-keys -t dev 'cd ~/projects && vim .' Enter

# Create additional sessions for different contexts
tmux new -s monitoring -d
tmux send-keys -t monitoring 'htop' Enter

tmux new -s logs -d
tmux send-keys -t logs 'tail -f /var/log/system.log' Enter

# Switch between sessions quickly
tmux attach -t dev
```

## Window Management

Windows in tmux are like tabs in a browser - each contains one or more panes.

| Task                  | Keyboard Shortcut | Command Line                  |
| --------------------- | ----------------- | ----------------------------- |
| Create new window     | `Ctrl+a c`        | `tmux new-window`             |
| Rename current window | `Ctrl+a ,`        | `tmux rename-window <name>`   |
| List all windows      | `Ctrl+a w`        | `tmux list-windows`           |
| Close current window  | `Ctrl+a &`        | `tmux kill-window`            |
| Switch to window by # | `Ctrl+a 0-9`      | `tmux select-window -t <num>` |
| Switch to next window | `Ctrl+a n`        | `tmux next-window`            |
| Switch to previous    | `Ctrl+a p`        | `tmux previous-window`        |
| Switch to last window | `Ctrl+a l`        | `tmux last-window`            |
| Move window           | `Ctrl+a .`        | `tmux move-window -t <num>`   |
| Find window           | `Ctrl+a f`        | Search window names           |

### Window Organization Tips

```bash
# Create a structured session with named windows
tmux new-session -d -s fullstack
tmux rename-window -t fullstack:0 'frontend'
tmux new-window -t fullstack -n 'backend'
tmux new-window -t fullstack -n 'database'
tmux new-window -t fullstack -n 'docker'
tmux new-window -t fullstack -n 'monitoring'

# Set up each window with specific commands
tmux send-keys -t fullstack:frontend 'cd ~/app/frontend && npm run dev' Enter
tmux send-keys -t fullstack:backend 'cd ~/app/backend && npm start' Enter
tmux send-keys -t fullstack:database 'mysql -u root -p' Enter
```

## Pane Management

Panes allow you to split your terminal window into multiple sections.

### Basic Pane Operations

| Task                   | Keyboard Shortcut | Command Line                 |
| ---------------------- | ----------------- | ---------------------------- |
| Split horizontally     | `Ctrl+a "`        | `tmux split-window -v`       |
| Split vertically       | `Ctrl+a %`        | `tmux split-window -h`       |
| Navigate between panes | `Ctrl+a o`        | `tmux select-pane -t <dir>`  |
| Go to last active pane | `Ctrl+a ;`        | `tmux last-pane`             |
| Close current pane     | `Ctrl+a x`        | `tmux kill-pane`             |
| Toggle pane zoom       | `Ctrl+a z`        | `tmux resize-pane -Z`        |
| Show pane numbers      | `Ctrl+a q`        | Display pane indices         |
| Break pane to window   | `Ctrl+a !`        | `tmux break-pane`            |
| Join pane from window  | `Ctrl+a @`        | `tmux join-pane -s <window>` |

### Advanced Pane Navigation

| Task               | Keyboard Shortcut   | Description              |
| ------------------ | ------------------- | ------------------------ |
| Move to pane left  | `Ctrl+a Left`       | Navigate with arrow keys |
| Move to pane right | `Ctrl+a Right`      | Navigate with arrow keys |
| Move to pane up    | `Ctrl+a Up`         | Navigate with arrow keys |
| Move to pane down  | `Ctrl+a Down`       | Navigate with arrow keys |
| Resize pane left   | `Ctrl+a Ctrl+Left`  | Hold Ctrl for continuous |
| Resize pane right  | `Ctrl+a Ctrl+Right` | Hold Ctrl for continuous |
| Swap pane up       | `Ctrl+a {`          | Move pane position       |
| Swap pane down     | `Ctrl+a }`          | Move pane position       |

### Pane Layout Presets

| Task                  | Keyboard Shortcut | Description             |
| --------------------- | ----------------- | ----------------------- |
| Cycle through layouts | `Ctrl+a Space`    | Auto-arrange panes      |
| Even horizontal       | `Ctrl+a Alt+1`    | Equal width columns     |
| Even vertical         | `Ctrl+a Alt+2`    | Equal height rows       |
| Main horizontal       | `Ctrl+a Alt+3`    | Large top, small bottom |
| Main vertical         | `Ctrl+a Alt+4`    | Large left, small right |
| Tiled                 | `Ctrl+a Alt+5`    | Grid arrangement        |

## Copy Mode and Scrolling

Copy mode allows you to scroll through terminal history and copy text.

### Entering Copy Mode

| Task              | Keyboard Shortcut | Description              |
| ----------------- | ----------------- | ------------------------ |
| Enter copy mode   | `Ctrl+a [`        | Start scrolling/copying  |
| Exit copy mode    | `q` or `Escape`   | Return to normal mode    |
| Paste copied text | `Ctrl+a ]`        | Insert clipboard content |

### Vi-Style Copy Mode

Enable vi-style keys in your config:

```bash
# Enable vi mode
setw -g mode-keys vi
set -g status-keys vi

# Vi-style copy bindings
bind-key -T copy-mode-vi v send-keys -X begin-selection
bind-key -T copy-mode-vi y send-keys -X copy-selection-and-cancel
bind-key -T copy-mode-vi r send-keys -X rectangle-toggle
```

### Copy Mode Navigation

| Task                   | Vi Keys    | Emacs Keys  |
| ---------------------- | ---------- | ----------- |
| Move cursor            | `h/j/k/l`  | Arrow keys  |
| Start of line          | `0` or `^` | `Ctrl+a`    |
| End of line            | `$`        | `Ctrl+e`    |
| Next word              | `w`        | `Alt+f`     |
| Previous word          | `b`        | `Alt+b`     |
| Page up                | `Ctrl+u`   | `Page Up`   |
| Page down              | `Ctrl+d`   | `Page Down` |
| Go to top              | `g`        | `Alt+<`     |
| Go to bottom           | `G`        | `Alt+>`     |
| Search forward         | `/`        | `Ctrl+s`    |
| Search backward        | `?`        | `Ctrl+r`    |
| Next search result     | `n`        | `Ctrl+s`    |
| Previous search result | `N`        | `Ctrl+r`    |

### Selection and Copying

| Task             | Vi Keys        | Description           |
| ---------------- | -------------- | --------------------- |
| Start selection  | `Space` or `v` | Begin text selection  |
| Select line      | `V`            | Select entire line    |
| Select rectangle | `Ctrl+v`       | Column selection mode |
| Copy selection   | `Enter` or `y` | Copy to tmux buffer   |
| Cancel selection | `Escape`       | Exit selection mode   |

## Mouse Support

Modern tmux supports mouse interaction for easier navigation.

### Enabling Mouse Mode

```bash
# Enable mouse support
set -g mouse on

# Optional: Configure mouse behavior
set -g mouse-select-pane on
set -g mouse-select-window on
set -g mouse-resize-pane on
```

### Mouse Operations

- **Click**: Switch between panes and windows
- **Scroll**: Navigate through terminal history
- **Drag**: Resize panes by dragging borders
- **Double-click**: Select words
- **Triple-click**: Select entire lines
- **Right-click**: Context menu (if configured)

{: .notice--info} **Note**: Mouse mode can interfere with terminal applications that have their own
mouse support. Toggle it on/off as needed.

## Buffer Management

Tmux maintains multiple copy buffers for managing copied text.

| Task                | Command                              | Description             |
| ------------------- | ------------------------------------ | ----------------------- |
| List all buffers    | `tmux list-buffers`                  | Show buffer contents    |
| Show buffer content | `tmux show-buffer -b <index>`        | Display specific buffer |
| Paste from buffer   | `tmux paste-buffer -b <index>`       | Insert buffer content   |
| Delete buffer       | `tmux delete-buffer -b <index>`      | Remove buffer           |
| Save buffer to file | `tmux save-buffer -b 0 ~/buffer.txt` | Export buffer to file   |
| Load file to buffer | `tmux load-buffer ~/file.txt`        | Import file as buffer   |

### Working with Multiple Buffers

```bash
# Copy multiple selections in copy mode
# Each copy creates a new buffer

# View all buffers
tmux list-buffers

# Choose which buffer to paste
tmux choose-buffer

# Paste from specific buffer
tmux paste-buffer -b 2
```

## Advanced Configuration

### Complete ~/.tmux.conf Example

```bash
# =======================
# BASIC SETTINGS
# =======================

# Set prefix to Ctrl-a
unbind C-b
set -g prefix C-a
bind C-a send-prefix

# Reload config file
bind r source-file ~/.tmux.conf \; display-message "Config reloaded!"

# Enable mouse support
set -g mouse on

# Set default terminal mode to 256color
set -g default-terminal "screen-256color"
set -ga terminal-overrides ",xterm-256color:Tc"

# Increase scrollback buffer size
set -g history-limit 50000

# Display messages for 2 seconds
set -g display-time 2000

# Start window and pane indices at 1
set -g base-index 1
setw -g pane-base-index 1

# Automatically renumber windows
set -g renumber-windows on

# =======================
# KEY BINDINGS
# =======================

# Vi mode
setw -g mode-keys vi
set -g status-keys vi

# Pane splitting
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"
unbind '"'
unbind %

# Pane navigation (vim-like)
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# Window navigation
bind -n S-Left previous-window
bind -n S-Right next-window

# Pane resizing
bind -r H resize-pane -L 5
bind -r J resize-pane -D 5
bind -r K resize-pane -U 5
bind -r L resize-pane -R 5

# Copy mode bindings
bind-key -T copy-mode-vi v send-keys -X begin-selection
bind-key -T copy-mode-vi y send-keys -X copy-pipe-and-cancel "pbcopy"
bind-key -T copy-mode-vi r send-keys -X rectangle-toggle

# Quick pane cycling
bind -n M-h select-pane -L
bind -n M-l select-pane -R
bind -n M-k select-pane -U
bind -n M-j select-pane -D

# =======================
# APPEARANCE
# =======================

# Status bar position
set -g status-position top

# Status bar colors
set -g status-bg colour235
set -g status-fg colour136
set -g status-attr default

# Window status
setw -g window-status-fg colour244
setw -g window-status-bg default
setw -g window-status-current-fg colour166
setw -g window-status-current-bg default

# Pane borders
set -g pane-border-fg colour235
set -g pane-active-border-fg colour240

# Message colors
set -g message-bg colour235
set -g message-fg colour166

# Status bar content
set -g status-left-length 40
set -g status-left "#[fg=green]Session: #S #[fg=yellow]#I #[fg=cyan]#P"
set -g status-right "#[fg=cyan]%d %b %R"
set -g status-interval 60
set -g status-justify centre

# Activity monitoring
setw -g monitor-activity on
set -g visual-activity on

# =======================
# PLUGINS (using TPM)
# =======================

# List of plugins
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'
set -g @plugin 'christoomey/vim-tmux-navigator'
set -g @plugin 'tmux-plugins/tmux-yank'
set -g @plugin 'tmux-plugins/tmux-open'

# Plugin settings
set -g @resurrect-strategy-vim 'session'
set -g @resurrect-strategy-nvim 'session'
set -g @continuum-restore 'on'
set -g @continuum-boot 'on'

# Initialize TMUX plugin manager (keep this line at the very bottom)
run '~/.tmux/plugins/tpm/tpm'
```

### Installing TPM (Tmux Plugin Manager)

```bash
# Clone TPM
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm

# Add to your ~/.tmux.conf (already included in config above)
# Reload tmux config
tmux source ~/.tmux.conf

# Install plugins with Ctrl+a I (capital i)
```

## Essential Plugins

### 1. Tokyo Night Theme

```bash
set -g @plugin 'janoamaral/tokyo-night-tmux'
set -g @tokyo-night-tmux_window_id_style digital
set -g @tokyo-night-tmux_pane_id_style hsquare
set -g @tokyo-night-tmux_zoom_id_style dsquare
```

### 2. Vim Navigation

```bash
set -g @plugin 'christoomey/vim-tmux-navigator'
```

### 3. Session Persistence

```bash
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'

# Auto-restore sessions
set -g @continuum-restore 'on'
set -g @continuum-boot 'on'
```

### 4. Enhanced Copy/Paste

```bash
set -g @plugin 'tmux-plugins/tmux-yank'
```

## Workflow Examples

### Full-Stack Development Setup

```bash
#!/bin/bash
# save as setup-dev.sh

SESSION_NAME="fullstack-dev"

# Create session
tmux new-session -d -s $SESSION_NAME

# Window 1: Frontend
tmux rename-window -t $SESSION_NAME:0 'frontend'
tmux send-keys -t $SESSION_NAME:frontend 'cd ~/projects/my-app/frontend' Enter
tmux send-keys -t $SESSION_NAME:frontend 'npm run dev' Enter

# Split for logs
tmux split-window -t $SESSION_NAME:frontend -v -p 30
tmux send-keys -t $SESSION_NAME:frontend 'npm run test:watch' Enter

# Window 2: Backend
tmux new-window -t $SESSION_NAME -n 'backend'
tmux send-keys -t $SESSION_NAME:backend 'cd ~/projects/my-app/backend' Enter
tmux send-keys -t $SESSION_NAME:backend 'npm run dev' Enter

# Split for database
tmux split-window -t $SESSION_NAME:backend -v -p 30
tmux send-keys -t $SESSION_NAME:backend 'docker-compose up database' Enter

# Window 3: Editor
tmux new-window -t $SESSION_NAME -n 'editor'
tmux send-keys -t $SESSION_NAME:editor 'cd ~/projects/my-app && nvim .' Enter

# Window 4: Git/Terminal
tmux new-window -t $SESSION_NAME -n 'git'
tmux send-keys -t $SESSION_NAME:git 'cd ~/projects/my-app' Enter

# Attach to session
tmux attach-session -t $SESSION_NAME
```

### Server Monitoring Setup

```bash
#!/bin/bash
SESSION_NAME="monitoring"

tmux new-session -d -s $SESSION_NAME

# System monitoring
tmux rename-window -t $SESSION_NAME:0 'system'
tmux send-keys -t $SESSION_NAME:system 'htop' Enter

# Split for disk usage
tmux split-window -t $SESSION_NAME:system -h
tmux send-keys -t $SESSION_NAME:system 'watch -n 5 df -h' Enter

# Split for network
tmux split-window -t $SESSION_NAME:system -v
tmux send-keys -t $SESSION_NAME:system 'nethogs' Enter

# Logs window
tmux new-window -t $SESSION_NAME -n 'logs'
tmux send-keys -t $SESSION_NAME:logs 'tail -f /var/log/syslog' Enter

# Split for application logs
tmux split-window -t $SESSION_NAME:logs -v
tmux send-keys -t $SESSION_NAME:logs 'tail -f /var/log/nginx/access.log' Enter

tmux attach-session -t $SESSION_NAME
```

## Troubleshooting

### Common Issues

**Issue**: Tmux not starting or showing errors

```bash
# Check tmux version
tmux -V

# Validate config file
tmux source-file ~/.tmux.conf
```

**Issue**: Colors not displaying correctly

```bash
# Check terminal capabilities
echo $TERM

# Add to ~/.tmux.conf
set -g default-terminal "screen-256color"
set -ga terminal-overrides ",xterm-256color:Tc"
```

**Issue**: Mouse scrolling not working

```bash
# Enable mouse mode
set -g mouse on

# If still not working, try
set -g mouse-select-pane on
set -g mouse-resize-pane on
set -g mouse-select-window on
```

**Issue**: Copy/paste not working with system clipboard

```bash
# macOS
brew install reattach-to-user-namespace

# Add to ~/.tmux.conf
set -g default-command "reattach-to-user-namespace -l $SHELL"
```

### Performance Optimization

```bash
# Reduce escape time for faster key response
set -sg escape-time 0

# Limit history size if experiencing slowdowns
set -g history-limit 10000

# Disable automatic window renaming if not needed
setw -g automatic-rename off

# Reduce status bar update frequency
set -g status-interval 60
```

## Command Reference

### Most Used Commands

| Command                     | Description          |
| --------------------------- | -------------------- |
| `tmux new -s name`          | Create named session |
| `tmux a -t name`            | Attach to session    |
| `tmux ls`                   | List sessions        |
| `tmux kill-session -t name` | Kill session         |
| `Ctrl+a d`                  | Detach from session  |
| `Ctrl+a c`                  | New window           |
| `Ctrl+a "`                  | Split horizontal     |
| `Ctrl+a %`                  | Split vertical       |
| `Ctrl+a z`                  | Toggle zoom          |
| `Ctrl+a [`                  | Copy mode            |

### Less Common but Useful

| Command                | Description               |
| ---------------------- | ------------------------- |
| `tmux display-message` | Show current session info |
| `tmux list-keys`       | Show all key bindings     |
| `tmux info`            | Show server information   |
| `tmux capture-pane -p` | Capture pane content      |
| `tmux respawn-pane`    | Restart dead pane         |

## Conclusion

Tmux is an incredibly powerful tool that can transform your terminal workflow. Start with the basics
and gradually incorporate more advanced features as you become comfortable. The key to mastering
tmux is consistent practice and customization to fit your specific needs.

Remember to:

- Start with a simple configuration and expand gradually
- Create automation scripts for common workflows
- Use plugins to enhance functionality
- Practice keyboard shortcuts until they become muscle memory
- Customize your setup based on your daily tasks

{: .notice--success} **Next Steps**: Try creating your own tmux session script for your current
project. Start with basic window and pane setup, then add more automation as you become comfortable
with the workflow.

---

## Resources and Further Reading

- [Official Tmux Documentation](https://github.com/tmux/tmux/wiki)
- [Tmux Plugin Manager](https://github.com/tmux-plugins/tpm)
- [Awesome Tmux](https://github.com/rothgar/awesome-tmux)
- [Tokyo Night Tmux Theme](https://github.com/janoamaral/tokyo-night-tmux)
- [Vim-Tmux Navigator](https://github.com/christoomey/vim-tmux-navigator)

**Download**: [PDF Cheat Sheet](/assets/downloads/tmux-cheat-sheet.pdf) |
[Config Templates](/assets/downloads/tmux-configs.zip)
