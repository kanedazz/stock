# Echo Server

A simple TCP echo server written in Rust that listens for connections and echoes back any line of text sent to it.

## Description

This server listens on `127.0.0.1:10000` and accepts TCP connections. When a client connects and sends a line of text, the server reads it and sends it back (echoes it) to the client.

## Building

Make sure you have Rust installed. Then build the project:

```bash
cargo build
```

Or build and run in one step:

```bash
cargo run
```

## Testing

Once the server is running, you can test it from a Mac terminal using `nc` (netcat):

```bash
nc 127.0.0.1 10000
```

After connecting, type any text and press Enter. The server will echo back what you typed. Press `Ctrl+C` to disconnect.

### Example Session

```bash
$ nc 127.0.0.1 10000
Hello, World!
Hello, World!
```

## How It Works

1. The server binds to `127.0.0.1:10000` using `TcpListener`
2. It accepts incoming connections in a loop
3. For each connection:
   - Creates a buffered reader and writer from the stream
   - Reads a line from the client
   - Writes the same line back to the client
   - Flushes the output

