#!/bin/bash

# UserInfo Task Runner (Autonomous YOLO Mode)
# Identifies the next task and executes it via Gemini CLI non-interactively.

get_next_task() {
    grep -m 1 "^- \[ \]" TODO.md | sed 's/.*- \[ \] //'
}

while true; do
    TASK=$(get_next_task)
    
    if [ -z "$TASK" ]; then
        echo "🎉 Current tasks complete. Requesting expansion..."
        gemini -y -p "All current tasks in TODO.md are complete. Please generate 12 more innovative diagnostic or security extensions, add them to TODO.md, and then immediately begin working on the first one."
        TASK=$(get_next_task)
        if [ -z "$TASK" ]; then break; fi
    fi

    echo "🚀 Executing Task: $TASK"
    
    # Executing in YOLO mode with non-interactive prompt
    gemini -y -p "Perform this task from TODO.md: '$TASK'. 
    Follow this strict workflow:
    1. Implementation & Logic.
    2. Build validation ('npm run build').
    3. Git commit & Push to master.
    4. Production deploy ('npm run deploy').
    5. Mark task as [x] in TODO.md.
    Ensure everything is production-ready and professional."

    echo "✅ Task Complete. Waiting 30 seconds for stability..."
    sleep 30
done
