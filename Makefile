run:
	jekyll serve JEKYLL_ENV=production

# -I --incremental: Incremental build
# -t --trace: Show the full backtrace when an error occurs.
# -D, --drafts: Process and render draft posts.
# -l, --livereload: Reload a page automatically on the browser when its content is edited.
run-dev:
	jekyll serve -I -t -D -l JEKYLL_ENV=development

# -I --incremental: Incremental build
# -t --trace: Show the full backtrace when an error occurs.
# -D, --drafts: Process and render draft posts.
# -l, --livereload: Reload a page automatically on the browser when its content is edited.
run-dev-bundle:
	bundle exec jekyll serve -I -t -D -l JEKYLL_ENV=development

clean:
	jekyll clean

doctor:
	jekyll doctor
