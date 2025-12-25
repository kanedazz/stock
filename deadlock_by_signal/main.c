#include <signal.h>
#include <pthread.h>
#include <unistd.h>
#include <stdio.h>

pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

void handler(int sig) {
    printf("received signal\n");
    pthread_mutex_lock(&mutex); // deadlock
    pthread_mutex_unlock(&mutex);
}

int main(int argc, char* argv[]) {
    signal(SIGUSR1, handler);
    pthread_mutex_lock(&mutex); // receiving a signal after here will cause a deadlock
    printf("locked mutex\n");
    printf("run `kill -s SIGUSR1 %d` in another terminal to cause a deadlock\n", getpid());
    sleep(10);
    pthread_mutex_unlock(&mutex); // receiving a signal before here will cause a deadlock
    printf("unlocked mutex\n");
    return 0;
}