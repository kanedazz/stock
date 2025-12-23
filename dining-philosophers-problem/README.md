# Dining Philosophers Problem

A Rust implementation of the classic dining philosophers problem demonstrating potential deadlock scenarios with concurrent resource access.

## Overview

This program simulates two philosophers sharing two chopsticks (mutexes). Each philosopher must acquire both chopsticks to dine. The implementation intentionally creates a deadlock-prone scenario where philosophers acquire locks in different orders.

## Running

```bash
cargo run
```

## Implementation Details

- Uses `Arc<Mutex<()>>` to share chopsticks between threads
- Each philosopher runs in a separate thread
- Philosophers acquire locks in opposite orders, which can lead to deadlock
- Demonstrates Rust's concurrency primitives: `Arc`, `Mutex`, and `thread::spawn`

