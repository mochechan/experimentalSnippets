#!/bin/bash

#昨天 (前一天)
date --date='1 days ago' "+%Y-%m-%d"
date -d '1 days ago' "+%Y-%m-%d"
date -d yesterday "+%Y-%m-%d"

#明天 (後一天)
date --date='1 days' "+%Y-%m-%d"
date -d '1 days' "+%Y-%m-%d"
date -d tomorrow "+%Y-%m-%d"

#1小時前
date --date='1 hours' "+%Y-%m-%d %H:%M:%S"

#1小時後
date --date='1 hours' "+%Y-%m-%d %H:%M:%S"

#1分鐘前
date --date='1 minutes ago' "+%Y-%m-%d %H:%M:%S"

#1分鐘後
date --date='1 minutes' "+%Y-%m-%d %H:%M:%S"

#1秒前
date --date='1 seconds ago' "+%Y-%m-%d %H:%M:%S"

#1秒後
date --date='1 seconds' "+%Y-%m-%d %H:%M:%S"

