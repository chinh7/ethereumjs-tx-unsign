#!/usr/bin/env bash

log='./run.log'

./js/unsign_raw_transaction.js &> "$log"
