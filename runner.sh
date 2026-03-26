#!/bin/bash

# Gemini CLI Task Runner
# This script identifies the next incomplete task in TODO.md and asks Gemini CLI to complete it.

get_next_task() {
    grep -m 1 "^- \[ \]" TODO.md | sed 's/.*- \[ \] //'
}

while true; do
    TASK=$(get_next_task)
    
    if [ -z "$TASK" ]; then
        echo "🎉 All tasks in TODO.md are complete!"
        echo "Asking Gemini CLI for 12 more extension ideas..."
        gemini "All tasks in TODO.md are complete. Please generate 12 more professional and secure extension ideas, add them to the Future Growth section of TODO.md, and then identify the next one to work on."
        # Refresh task list
        TASK=$(get_next_task)
        if [ -z "$TASK" ]; then break; fi
    fi

    echo "🚀 Starting Task: $TASK"
    
    # Call Gemini CLI to perform the task, deploy, and validate
    gemini "Complete this task from TODO.md: '$TASK'. Ensure you:
    1. Implement the feature/fix.
    2. Run 'npm run build' to validate.
    3. Commit and push the changes to master.
    4. Deploy to GitHub Pages using 'npm run deploy'.
    5. Update TODO.md to mark it as complete.
    6. Verify the live site if possible."

    echo "✅ Task Complete. Waiting 30 seconds before next iteration..."
    sleep 30
done
