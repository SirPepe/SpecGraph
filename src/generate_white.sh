#!/usr/bin/env bash
sed 's/#000000/==SCHWARZ==/g' graph.svg | sed 's/#ffffff/#000000/g' | sed 's/==SCHWARZ==/#FFFFFF/g' > graph_w.svg
echo "graph_w.svg generiert"
