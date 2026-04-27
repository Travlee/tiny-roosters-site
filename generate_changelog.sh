#!/bin/bash

# Ensure data directory exists
mkdir -p data

echo "Generating site changelog from git logs..."

# We find all current markdown files. This automatically excludes deleted files.
# For each file, we check if it's a draft.
# We strip 'content/' from the path to make it easier for Hugo to match.
find content -name "*.md" -print0 | while IFS= read -r -d '' file; do
    if grep -qE "draft\s*=\s*true" "$file"; then
        continue
    fi
    rel_path=${file#content/}
    # Using a rare delimiter for the split
    git log --follow --pretty=tformat:"%aI%x1F%s" -- "$file" | while IFS=$'\x1F' read -r date msg; do
        if [ -n "$date" ] && [ -n "$msg" ]; then
            jq -n --arg date "$date" --arg msg "$msg" --arg file "$rel_path" \
                '{date: $date, msg: $msg, file: $file}'
        fi
    done
done | jq -s 'sort_by(.date) | reverse' > data/changelog.json

echo "Changelog generated in data/changelog.json"
