use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    // two chopsticks
    let c0 = Arc::new(Mutex::new(()));
    let c1 = Arc::new(Mutex::new(()));

    let c0_cloned = Arc::clone(&c0);
    let c1_cloned = Arc::clone(&c1);

    // 1st philosopher
    let p0 = thread::spawn(move || {
        for _ in 0..100000 {
            let _pick0 = c0.lock().unwrap();
            println!("Philosopher 1: picked c0");
            let _pick1 = c1.lock().unwrap();
            println!("Philosopher 1: picked c1");
            println!("Philosopher 1: dining");
        }
    });

    // 2nd philosopher
    let p1 = thread::spawn(move || {
        for _ in 0..100000 {
            let _pick1 = c1_cloned.lock().unwrap();
            println!("Philosopher 2: picked c1");
            let _pick0 = c0_cloned.lock().unwrap();
            println!("Philosopher 2: picked c0");
            println!("Philosopher 2: dining");
        }
    });

    p0.join().unwrap();
    p1.join().unwrap();
}
