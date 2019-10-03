install:
	npm install

start: build
	dist/bin/commander-gendiff.js --format nested __tests__/__fixtures__/comparison/yml/before.yml __tests__/__fixtures__/comparison/yml/after.yml
	
publish:
	npm publish

lint:
	npx eslint --debug .

test:
	npm test

build:
	npm run build