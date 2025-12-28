use std::io::{BufRead, BufReader, BufWriter, Write};
use std::net::TcpListener;

fn main() {
    // Listen to TCP connections on port 10000
    let listener = TcpListener::bind("127.0.0.1:10000").unwrap();

    while let Ok((stream, _)) = listener.accept() {
        let stream0 = stream.try_clone().unwrap();
        let mut reader = BufReader::new(stream0);
        let mut writer = BufWriter::new(stream);

        // read a line and just return it
        let mut buf = String::new();
        reader.read_line(&mut buf).unwrap();
        writer.write(buf.as_bytes()).unwrap();
        writer.flush().unwrap();
    }
}