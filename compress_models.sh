#!/bin/bash

# https://github.com/CesiumGS/gltf-pipeline

for model in public/models/*.glb; 
do
  echo $model
  gltf-pipeline -i "$model" -o "$model" -d
done

