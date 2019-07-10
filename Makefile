install:
	npm install

start:
	npx babel-node -- src/bin/training.js

publish:
	npm publish

lint:
	npx eslint --debug .