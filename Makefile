SRC = $(wildcard src/*.js src/test/*.js)
LIB = $(SRC:src/%.js=lib/%.js)
BABEL = node_modules/.bin/babel


.PHONY: test

all: lib lib/test test


lib: $(LIB)
lib/%.js: src/%.js
	mkdir -p $(@D)
	${BABEL} $< -o $@


test:
	npm test
