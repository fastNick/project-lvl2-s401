install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js --format json before-recursive.yml after-recursive.yml
	
start-abs:
	npx babel-node -- src/bin/gendiff.js '/home/nick/Hexlet/project-lvl2/project-lvl2-s401/comparison_files/before.json' '/home/nick/Hexlet/project-lvl2/project-lvl2-s401/comparison_files/after.json'

publish:
	npm publish --dry-run

lint:
	npx eslint --debug --fix .

test:
	npm run test

make build:
	npm run build

make coveralls:
	npm run coveralls