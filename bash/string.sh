#!/bin/bash
#Bash String Manipulation Examples – Length, Substring, Find and Replace

var="Welcome to the geekstuff"
echo string length is ${#var}

# ${string:position}
# ${string:position:length}
echo ${var:15}
echo ${var:15:4}

# deletes the shortest match of $substring from front of $string
# ${string#substring}

# deletes the shortest match of $substring from back of $string
# ${string%substring}

filename="bash.string.txt"
echo ${filename#*.}
echo ${filename%.*}


# deletes the longest match of $substring from front of $string
# ${string##substring}

# deletes the longest match of $substring from back of $string
# ${string%%substring}

echo "After deletion of longest match from front:" ${filename##*.}
echo "After deletion of longest match from back:" ${filename%%.*}


# Replace only first match  ${string/pattern/replacement}
echo "After Replacement:" ${filename/str*./operations.}

# Replace all the matches  ${string//pattern/replacement}
filename="Path of the bash is /bin/bash"
echo "After Replacement:" ${filename//bash/sh}

# Replace beginning and end  ${string/#pattern/replacement}
filename="/root/admin/monitoring/process.sh"
echo "Replaced at the beginning:" ${filename/#\/root/\/tmp}
echo "Replaced at the end": ${filename/%.*/.ksh}



