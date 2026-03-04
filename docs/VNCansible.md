---
layout: yanfu
---

# How to setup VNC login password programmatically

Sometimes we want to have a bash script for setup VNC login password programmatically. By using VNC pipe method, we can acheive this goal!

```bash
$ echo {{password}} | vncpasswd -f > ~/.vnc/passwd
``` 