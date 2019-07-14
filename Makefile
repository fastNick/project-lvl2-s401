install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js 'before.json' 'after.json'
	
start-abs:
	npx babel-node -- src/bin/gendiff.js '/home/nick/Hexlet/project-lvl2/project-lvl2-s401/json_files/before.json' '/home/nick/Hexlet/project-lvl2/project-lvl2-s401/json_files/after.json'

publish:
	npm publish --dry-run

lint:
	npx eslint --debug --fix .

test:
	npm run test

make build:
	npm run build