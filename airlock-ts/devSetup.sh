#!/bin/bash

# This script is used to setup the development environment for the airlock-ts project.

# Link the shared components
npm link ../../common-ts/
npm link d3-common


# Install the required packages
npm install