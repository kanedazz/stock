# Deadlock by Signal

Demonstrates a deadlock scenario where a signal handler attempts to acquire a mutex that's already locked by the main thread.

## How it works

The main thread locks a mutex and sleeps for 10 seconds. If a `SIGUSR1` signal is received during this time, the signal handler tries to lock the same mutex, causing a deadlock.

## Compile

```bash
gcc -o main main.c -pthread
```

## Run

1. Start the program:
   ```bash
   ./main
   ```

2. In another terminal, send a signal to trigger the deadlock:
   ```bash
   kill -s SIGUSR1 <pid>
   ```
   (The program will print its PID when it starts)

The program will hang because the signal handler is waiting for a mutex that's already locked by the main thread.

