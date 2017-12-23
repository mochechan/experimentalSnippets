#!/bin/bash
Unix[0]='Debian' #Declaring an Array and Assigning values
Unix[1]='Red hat'
Unix[2]='Ubuntu'
Unix[3]='Suse'
echo a ${Unix[1]} #To access an element from an array use curly brackets like ${name[index]}.
echo b ${Unix[@]} #Print the Whole Bash Array
echo c ${#Unix[@]} #Number of elements in the array
echo d ${#Unix}  #Number of characters in the first element of the array.i.e Debian
echo ${Unix[@]/Ubuntu/SCO Unix} #Search and Replace in an array elements

Unix=("${Unix[@]}" "AIX" "HP-UX") #Add an element to an existing Bash Array
echo ${Unix[7]}
unset Unix[3] #Remove an Element from an Array
echo ${Unix[3]}


#The above script will just print null which is the value available in the 3rd index. The following example shows one of the way to remove an element completely from an array.
unix=('Debian' 'Red hat' 'Ubuntu' 'Suse' 'Fedora' 'UTS' 'OpenLinux');
pos=3
unix=(${unix[@]:0:$pos} ${unix[@]:$(($pos + 1))})
echo ${unix[@]}

declare -a Unixx=('Debian' 'Red hat' 'Ubuntu' 'Suse' 'Fedora');
declare -a patter=( ${Unixx[@]/Red*/} ) #Remove Bash Array Elements using Patterns
echo ${patter[@]}


declare -a Linux=('Debian' 'Red hat' 'Red hat' 'Suse' 'Fedora'); #Initializing an array during declaration
echo ${Linux[1]} ${#Linux[1]} #Length of the nth Element in an Array
echo 3:2 ${Unix[@]:3:2} #Extraction by offset and length for an array
echo 2:0:4 ${Linux[2]:0:4} #Extraction with offset and length, for a particular element of an array

Unix2=('Debian' 'Red hat' 'Ubuntu' 'Suse' 'Fedora' 'UTS' 'OpenLinux');
Linux2=("${Unix2[@]}")
echo ${Linux2[@]}

#Concatenation of two Bash Arrays
Unix=('Debian' 'Red hat' 'Ubuntu' 'Suse' 'Fedora' 'UTS' 'OpenLinux');
Shell=('bash' 'csh' 'jsh' 'rsh' 'ksh' 'rc' 'tcsh');
UnixShell=("${Unix[@]}" "${Shell[@]}")
echo ${UnixShell[@]}
echo ${#UnixShell[@]}

unset UnixShell #Deleting an Entire Array

#Load Content of a File into an Array
filecontent=( `cat "logfile" `)

for t in "${filecontent[@]}"
do
echo $t
done
echo "Read file content!"

exit 0;
