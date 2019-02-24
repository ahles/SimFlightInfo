# whereismyplane

Electron-App that listens to the position information sent by X-Plane and displays the current location on a openstreetmap.

Install this app on a second computer in the network you're using X-Plane.

Configure X-Plane to send the positional data (globalposition) over UDP 49000 to the IP of the computer in your local network where this app is installed:

- In X-Plane open the settings and go to the tab "Data Output".
- Activate the checkbox ☑ "Network via UDP" for the Index 20 "Latitude, Longitude & Altitude".
- On the right side under "Network Configuration" activate the checkbox ☑ "Send network data output"
- Select "Enter IP-Address", if necessary
- Enter the IP Adress of the computer this app is installed (f.e 192.168.1.11)
- Enter Port number 4900
- Above under "Output rates" I recommend setting the "UDP Rate" to 1.0 packets/s or slower
- Klick done

## Project setup
```
yarn install
```

## DEV Mode
```
yarn electron:serve
```

## BUILD App
```
yarn electron:build
```

### Lints and fixes files
```
yarn run lint
```
