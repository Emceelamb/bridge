# Bridge to the Internet

*Bridge to the Internet* creates a platform for localized network infrastructure to minimize resources required for networked communication to better serve their local communities during times of intermittent connection from limited network resources.

![Bridge to the Internet logo](https://sandbox.markofthelam.com/img/bridge-logo.png)

## Table of Contents
- [About](#about)
- [Installation Instructions](#installation)
- [Post Installation](#post-installation)
- [Services](#services)
- [Acknowledgements](#acknowledgements)

## About

Bridge to the Internet is a router which hosts robust local area communication applications which activates local area networks to strengthen connection within a local community. With the internet under heavy strain due to the COVID-19 pandemic it becomes clear that we must maximize our network resources and look for alternatives to internet based communication. This project is especially relevant for people in remote areas with impacted bandwidth. It creates more resilient communication channels. The use cases are endless, from wireless doorbell monitoring, to communicating to neighbors within a building, and - with additional wifi repeaters - potentially scaled to cover a city block.

The router applies network infrastructure typically reserved for businesses and institutions into a single device. It can quickly set up an internet sharing wireless hot spot with an Proxy Web Server for caching and a DNS Sinkhole preconfigured as well as a local web server running an asynchronous  message board, and real time text chat.

**Internal Web Links**:  
- Community Website: `http://bridge` or `http://10.0.0.1`
- Pi-Hole Dashboard: `http://pi.hole:8080/admin` or `http://10.0.0.1:8080/admin`


## Installation
*Bridge* is a network router powered by Raspberry Pi that hosts a HTTP web proxy, DNS sinkhole, and web server for internal web pages. The router image comes pre-configured with Pi-Hole, a network ad-blocker, and Squid. To set up the router you must have the pre-requisite hardware and your build machine must have a Micro SD card reader as well as Balena Etcher to flash the router image.

Instructions for:  
* [Windows OS](#windows)
* [Mac OS](#mac-os)
* [Linux OS](#linux)

### Build Requirements
- Raspberry Pi 3B+/ 4B (with on-board WiFi)
- 8GB+ Micro SD card (C10 Preferred)
- Ethernet Cable
- [*Bridge* image](https://drive.google.com/open?id=1dwv18Lyx4Elu50rah06Jb-MrmHzcGZB5)
- Internet connectivity
- Micro SD card reader
- [Balena Etcher](https://www.balena.io/etcher/)
- SSH Client ([PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/) for Windows Build Machines, Linux and Mac OS will have a built-in SSH client)
- Internet Modem/ Router

### Windows
1. Download and install [Balena Etcher](https://www.balena.io/etcher/)
2. Download [*Bridge* image](https://drive.google.com/open?id=1dwv18Lyx4Elu50rah06Jb-MrmHzcGZB5)
3. Insert Micro SD card into build machine
4. Open Balena Etcher and select *bridge.img.gz* as your image and your SD card as target drive
5. Confirm your target drive and Flash
![Screenshot of Balena Etcher](https://sandbox.markofthelam.com/img/balena.png)  
6. When flash is complete eject SD card and insert into Raspberry Pi
7. Connect Raspberry Pi to internet modem with Ethernet cable and power on the Raspberry Pi
8. The first boot will take extra time to expand the SD card and initialize software, wait at least 10 minutes
9. When it is completed a wireless network should be visible named `Bridge WiFi` (If it does not appear please power cycle the Raspberry Pi)
10. Connect to `Bridge WiFi` with the password `community`
11. Use PuTTY to SSH into the Raspberry Pi
  - Host: `oper@10.0.0.1`
  - Port: `22`
  - Password: `bridge`
12. Change WiFi SSID and Password by running `sudo bash configurewifi.sh` in the Raspberry Pi shell
13. You should now be broadcasting your own WiFi network with Pi Hole DNS sinkhole, Squid Cache, and Node Express Web Server
  - The local web server can be accessed in the browser at either `http://bridge` or `http://10.0.0.1`
  - The Pi-Hole Dashboard can be accessed in the browser at `http://pi.hole:8080/admin`
14. Follow post-installation instructions to configure your clients to make use of Squid HTTP proxy.


### Mac OS
1. Download and install [Balena Etcher](https://www.balena.io/etcher/)
2. Download [*Bridge* image](https://drive.google.com/open?id=1dwv18Lyx4Elu50rah06Jb-MrmHzcGZB5)
3. Insert Micro SD card into build machine
4. Open Balena Etcher and select *bridge.img.gz* as your image and your SD card as target drive
5. Confirm your target drive and Flash
![Screenshot of Balena Etcher](https://sandbox.markofthelam.com/img/balena.png)  
6. When flash is complete eject SD card and insert into Raspberry Pi
7. Connect Raspberry Pi to internet modem with Ethernet cable and power on the Raspberry Pi
8. The first boot will take extra time to expand the SD card and initialize software, wait at least 10 minutes
9. When it is completed a wireless network should be visible named `Bridge WiFi` (If it doesn't appear please power cycle the Raspberry Pi)
![Mac WiFi](https://sandbox.markofthelam.com/img/mac-wifi.png)  
10. Connect to `Bridge WiFi` with the password `community`
11. Use your preferred terminal to SSH into the Raspberry Pi with `ssh oper@bridge` and password: `bridge`
12. Change WiFi SSID and Password by running `sudo bash configurewifi.sh` in the Raspberry Pi shell
13. You should now be broadcasting your own WiFi network with Pi Hole DNS sinkhole, Squid Cache, and Node Express Web Server
  - The local web server can be accessed in the browser at either `http://bridge` or `http://10.0.0.1`
  - The Pi-Hole Dashboard can be accessed in the browser at `http://pi.hole:8080/admin`
14. Follow post-installation instructions to configure your clients to make use of Squid HTTP proxy.

### Linux
1. Download and install [Balena Etcher](https://www.balena.io/etcher/)
2. Download [*Bridge* image](https://drive.google.com/open?id=1dwv18Lyx4Elu50rah06Jb-MrmHzcGZB5)
3. Insert Micro SD card into build machine
4. Open Balena Etcher and select *bridge.img.gz* as your image and your SD card as target drive
5. Confirm your target drive and Flash
![Screenshot of Balena Etcher](https://sandbox.markofthelam.com/img/balena.png)  
6. When flash is complete eject SD card and insert into Raspberry Pi
7. Connect Raspberry Pi to internet modem with Ethernet cable and power on the Raspberry Pi
8. The first boot will take extra time to expand the SD card and initialize software, wait at least 10 minutes
9. When it is completed a wireless network should be visible named `Bridge WiFi`
![Bridge WiFi Network Manager](https://sandbox.markofthelam.com/img/bridge-linux.png)
10. Connect to `Bridge WiFi` with the password `community`
11. Use your preferred terminal to SSH into the Raspberry Pi with `ssh oper@bridge` and password: `bridge`
12. Change WiFi SSID and Password by running `sudo bash configurewifi.sh` in the Raspberry Pi shell
13. You should now be broadcasting your own WiFi network with Pi Hole DNS sinkhole, Squid Cache, and Node Express Web Server
  - The local web server can be accessed in the browser at either `http://bridge` or `http://10.0.0.1`
  - The Pi-Hole Dashboard can be accessed in the browser at `http://pi.hole:8080/admin`
14. Follow post-installation instructions to configure your clients to make use of Squid HTTP proxy.

## Post Installation
To make use of Squid HTTP Web Cache you must configure your client devices to use the router as the HTTP Proxy. This enables Squid Cache to act as a proxy server allowing all connected to use the network cache server which will allow faster web requests for connected clients. It is optimal to configure the proxy in your system settings so that all applications running your device. The specific instructions will vary between operating systems, but  you can use Chrome Browser to navigate to your system proxy settings.

### Computer Proxy Setup
#### Chrome/ Chromium Proxy Setup
Chromium uses your system proxy settings. When changed it will affect all applications on your machine.  

1. Open Chrome and open Preferences panel
2. Navigate to Advanced > Systems page
3. Manually configure proxy with the router IP address as your proxy server 
  - HTTP Proxy: `10.0.0.1`
  - Port: `3128`
![Mac OS System Settings](https://sandbox.markofthelam.com/img/mac-systemsettings.png)
4. You can test if it is operating properly by visiting a bogus URL (ldfkjalgkjalj.com). If you receive an error from Squid it means your device is sending requests through the proxy server. Alternatively you can run a packet capture to see HTTP requests are going through port 3128.
5. You should be now be sending requests to the Squid Proxy Server! This will speed up your internet as devices on the network will cache http here.
![Squid Cache Error Page](https://sandbox.markofthelam.com/img/squiderror.png)

#### Firefox Proxy Setup
You can manually set the router as the proxy server on Firefox Browser. You will do this in the browser's preferences page.

1. Open Firefox Browser and go to Preferences panel
2. Navigate to Network Settings and select *settings*
3. Select Manual Proxy Configuration and set:
  - HTTP Proxy: `10.0.0.1`
  - Port: `3128`
4. You can test if it is operating properly by visiting a bogus URL (ldfkjalgkjalj.com). If you receive an error from Squid it means your device is sending requests through the proxy server. Alternatively you can run a packet capture to see HTTP requests are going through port 3128.
5. You should be now be sending requests to the Squid Proxy Server! This will speed up your internet as devices on the network will cache http here.
![Squid Cache Error Page](https://sandbox.markofthelam.com/img/squiderror.png)
  
### Mobile Devices
#### IPhone
1. Navigate WiFi Settings
![WiFi Settings](https://sandbox.markoftelam.com/img/ios1.jpg)
2. Select to Bridge WiFi options 
![Bridge Wifi Options IOS](https://sandbox.markofthelam.com/img/ios2.jpg)
3. Select Configure Proxy
4. Enable Manual Proxy
  - Server: `10.0.0.1`
  - Port: `3128`
4. You can test if it is operating properly by visiting a bogus URL (ldfkjalgkjalj.com). If you receive an error from Squid it means your device is sending requests through the proxy server. Alternatively you can run a packet capture to see HTTP requests are going through port 3128.
5. You should be now be sending requests to the Squid Proxy Server! This will speed up your internet as devices on the network will cache http here.
![Squid Cache Error Page](https://sandbox.markofthelam.com/img/squiderror.png)
  

## Services
### Pi Hole
*Bridge WiFi* has Pi-Hole pre-configured. Pi-Hole is a DNS Sinkhole which acts as a network level ad-blocker. It greatly improves network speeds by re-directing malicious and advertisement dns requests. Please view the [Pi Hole Website](https://pi-hole.net/) for instructions for advanced configurations.

The Pi-Hole web dashboard can be viewed at:
- `http://pi.hole:8080/admin` or `http://10.0.0.1:8080/admin`

### Squid Cache
[Squid](http://www.squid-cache.org/) is a caching proxy for the Web supporting HTTP, HTTPS, FTP, and more. It reduces bandwidth and improves response times by caching and reusing frequently-requested web pages

![Pi-Hole Dashboard](https://sandbox.markofthelam.com/img/piholedashboard.png)

## Acknowledgements
- [Mimi Onuoha](https://github.com/MimiOnuoha/), Thesis Advisor
- [Alden Jones](https://github.com/miamiww), Thesis Resident
- [Ellen Nickles](https://github.com/ellennickles), Thesis Resident
- [Tom Igoe](https://github.com/tigoe), Advisor
- [Anthony Bui](https://github.com/epylinkn)
- [Luming Hao](https://github.com/lh00000000)
- [Tushar Goyal](https://github.com/asd0999)

### Powered by
![Squid Cache Icon](http://www.squid-cache.org/Artwork/SN1.png)  
![Pi Hole Icon](https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Pi-hole_vector_logo.svg/43px-Pi-hole_vector_logo.svg.png)
