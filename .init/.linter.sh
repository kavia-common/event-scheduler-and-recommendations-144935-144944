#!/bin/bash
cd /home/kavia/workspace/code-generation/event-scheduler-and-recommendations-144935-144944/event_planner_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

