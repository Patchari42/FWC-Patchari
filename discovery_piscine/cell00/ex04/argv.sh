#!/bin/bash

args=("$@")

if [ ${#args[@]} -eq 0 ]; then
    echo "No arguments supplied"
else
    for ((i=0; i<3 && i<${#args[@]}; i++)); do
        echo "${args[i]}"
    done
fi             
