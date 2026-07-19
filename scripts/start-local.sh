#!/bin/zsh
# Start InstantViral local development server.
# Run this in YOUR terminal (Cursor Terminal or Mac Terminal) — keep the window open.

cd /Users/usmanfadi/Documents/instantviral-next || exit 1

echo "Starting InstantViral at http://localhost:3000"
echo "Keep this terminal open. Press Ctrl+C to stop."
echo ""

exec npm run dev
