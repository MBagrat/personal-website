run:
	bundle exec jekyll serve JEKYLL_ENV=production

# -t --trace: Show the full backtrace when an error occurs.
# -D, --drafts: Process and render draft posts.
# -l, --livereload: Reload a page automatically on the browser when its content is edited.
run-dev:
	bundle exec jekyll serve -t -D -l JEKYLL_ENV=development
