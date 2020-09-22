#!/bin/bash

read -p "Bot token >> " token
read -p "Owner ID >> " owner_id

{
  echo "TOKEN=$token"
  echo "OWNERID=$owner_id"
} > ./.env
