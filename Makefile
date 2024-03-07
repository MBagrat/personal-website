run:
	bundle exec jekyll serve JEKYLL_ENV=production

# -I, --incremental: Enable the experimental incremental build feature. Incremental build only re-builds posts and pages that have changed, resulting in significant performance improvements for large sites, but may also break site generation in certain cases.
# -t --trace: Show the full backtrace when an error occurs.
# -D, --drafts: Process and render draft posts.
# -l, --livereload: Reload a page automatically on the browser when its content is edited.
run-dev:
	bundle exec jekyll serve -t -D -I -l JEKYLL_ENV=development