install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js --format nested __tests__/__fixtures__/comparison/yml/before.yml __tests__/__fixtures__/comparison/yml/after.yml
	
publish:
	npm publish

lint:
	npx eslint --debug .

test:
	npm test

build:
	npm run build