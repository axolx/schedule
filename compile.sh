#! /bin/sh
COMPILER=$DROPBOX/lib/js/compiler.jar
JAVA=/usr/bin/java
OUT=schedule.js
$JAVA -jar $COMPILER --js=js/util.js --js=js/phaseLabel.js --js=js/phase.js \
    --js=js/calendar.js --js=js/keyboard.js --js=js/mouse.js \
    --js_output_file=$OUT

