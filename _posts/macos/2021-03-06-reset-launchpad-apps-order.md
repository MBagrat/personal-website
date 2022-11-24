---
title: "Reset Launchpad Apps Order"
header:
    teaser: /assets/images/reset-launchpad-apps-order/reset-launchpad-apps-order.png
    og_image: /assets/images/reset-launchpad-apps-order/reset-launchpad-apps-order.png
categories: 
 - MacOS
tags: 
 - sierra
 - big-sur
 - monterey
classes: wide
last_modified_at: 2022-03-02T15:26:16+04:00
---

The Launchpad in macOS helps you access applications quickly.
If you decide you want to reset the Launchpad apps where they appear in their default order.

{% include figure image_path="/assets/images/reset-launchpad-apps-order/reset-launchpad-apps-order.png" alt="This is top image" %}

Please follow these steps
1. From the Finder, select `“Go”` > `“Utilities”` > `“Terminal“`.
2. Type the following command, then press “Enter“.

```
defaults write com.apple.dock ResetLaunchPad -bool true; killall Dock
```

The Launchpad apps will then be refreshed to their default state.
