---
title: "Mac: Logout a user from the command line"
header:
  teaser: /assets/images/logout-user-from-command-line/user-switching-menu.png
  og_image: /assets/images/logout-user-from-command-line/user-switching-menu.png
categories:
  - MacOS
tags:
  - osx
  - user
  - til
  - logout
toc: true
toc_sticky: true
last_modified_at: 2022-03-02T15:26:16+04:00
---

{% include figure image_path="/assets/images/logout-user-from-command-line/user-switching-menu.png" alt="This is top image" caption="Logout user from terminal." %}

You don’t have to use the macOS UI to logout a user. Instead, in the Terminal use:

```bash
sudo launchctl bootout gui/$(id -u <username>)
# or
sudo launchctl bootout user/$(id -u <username>)
```

Works on macOS 10.11.x or later.

Via [apple.stackexchange.com](https://apple.stackexchange.com/questions/126761/way-to-logout-a-user-from-the-command-line-in-os-x-10-9).
