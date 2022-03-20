# What for?

Purpose of this repo is demo that communication between parent and iframe can be done even if cross origin policay is in play

# Read more

- https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#the_dispatched_event
- https://htmldom.dev/communication-between-an-iframe-and-its-parent-window/

# Dev notes

```
# run as sudo -> sudo -i
cat <<EEE >> /etc/hosts

127.0.0.1 local.com
127.0.0.1 local2.com

EEE

# git clone
# then enter main dir

make server

# visit in browser: http://local.com:4218/

# voila
```