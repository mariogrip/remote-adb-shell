### Remote ADB shell

This allows you to access ADB shell over network

#### How to install

`sudo npm install -g remote-adb-shell`

#### Usage

```
Usage: remote-adb-shell [options] <host> (default host: localhost)

Options:


  -h, --help         output usage information
  -V, --version      output the version number
  -s, --server       Server mode
  -p, --port <port>  Port (default: 9999)
```

### Examples

Start server: `remote-adb-shell -s`  
Connect to server: `remote-adb-shell [server ip]`
