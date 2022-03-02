---
title: "Jekyll Rouge Highlighter"
header:
    teaser: /assets/images/jekyll-rouge-highlighter/jekyll-rouge-highlighter.png
    og_image: /assets/images/jekyll-rouge-highlighter/jekyll-rouge-highlighter.png
categories:
  - Jekyll
tags:
  - jekyll
  - rouge
  - highlighter
toc: true
toc_sticky: true
---

This article describes how to configure Rouge to handle formatting of Highlights.

{% include figure image_path="/assets/images/jekyll-rouge-highlighter/jekyll-rouge-highlighter.png" alt="this is top image" %}

## Install

Ensure rouge is installed. Need 1.5 or later.
Check `Gemfile.lock`, it should already be there.

### Use Rouge

`_config.yml`
```yml
markdown: kramdown
highlighter: rouge

kramdown:
  syntax_highlighter: rouge
```

###Line Numbers
```yml
markdown: kramdown
highlighter: rouge

kramdown:
  syntax_highlighter: rouge
  syntax_highlighter_opts:
    block:
      line_numbers: true
      start_line: 1
```
### Set Tab Size

The default tab size for a browser is 8 spaces. This will not do.

To change this to 2 spaces, add to css
```css
pre {
	tab-size: 2;
	-moz-tab-size: 2;
}
```
I am using Sass and so I add to `all.scss`

## References
- [Jekyll configuration](https://jekyllrb.com/docs/configuration/){:target="_blank"}
- [Kramdown Options](https://kramdown.gettalong.org/options.html){:target="_blank"}
- [Kramdown parser](https://kramdown.gettalong.org/parser/kramdown.html){:target="_blank"}
- [Kramdown Rouge](https://kramdown.gettalong.org/syntax_highlighter/rouge.html){:target="_blank"}
- [tab-size](https://developer.mozilla.org/en-US/docs/Web/CSS/tab-size){:target="_blank"}