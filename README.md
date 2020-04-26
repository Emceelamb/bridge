# Bridges to the Internet

*Bridges to the Internet* creates a platform for localized network infrastructure to minimize resources required for networked communication to better serve their local communities during times of intermittent connection from limited network resources.

**Internal Web Links**:  
- Community Website: `http://bridge` or `http://10.0.0.1`
- Pi-Hole Dashboard: `http://pi.hole:8080/admin` or `http://10.0.0.1:8080/admin`

## Pre-requisites
- Raspberry Pi 3B+/ 4B (with on-board WiFi)
- 8GB+ Micro SD card (C10 Preferred)
- Ethernet Cable
- Internet Modem/ Router

## Installation
*Bridges* is a network router powered by Raspberry Pi that hosts a HTTP web proxy, DNS sinkhole, and web server for internal web pages. The router image comes pre-configured with Pi-Hole, a network ad-blocker, and Squid. To set up the router you must have the pre-requisite hardware and your build machine must have a Micro SD card reader as well as Balena Etcher to flash the router image.

### Build Requirements
- Pre-requisite materials
- [*Bridges* image](https://drive.google.com/open?id=1dwv18Lyx4Elu50rah06Jb-MrmHzcGZB5)
- Internet connectivity
- Micro SD card reader
- [Balena Etcher](https://www.balena.io/etcher/)
- SSH Client ([PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/) for Windows Build Machines, Linux and Mac OS will have a built-in SSH client)

### Windows
1. Download and install [Balena Etcher](https://www.balena.io/etcher/)
2. Download [*Bridges* image](https://drive.google.com/open?id=1dwv18Lyx4Elu50rah06Jb-MrmHzcGZB5)
3. Insert Micro SD card into build machine
4. Open Balena Etcher and select *bridge.img.gz* as your image and your SD card as target drive
5. Confirm your target drive and Flash
![Screenshot of Balena Etcher](https://sandbox.markofthelam.com/img/balena.png)  
6. When flash is complete eject SD card and insert into Raspberry Pi
7. Connect Raspberry Pi to internet modem with Ethernet cable and power on the Raspberry Pi
8. The first boot will take extra time to expand the SD card and initialize software, wait at least 10 minutes
9. When it is completed a wireless network should be visible named `Bridges WiFi`
10. Connect to `Bridges WiFi` with the password `community`
11. Use PuTTY to SSH into the Raspberry Pi
  - Host: `oper@10.0.0.1`
  - Port: `22`
  - Password: `bridges`
12. Change WiFi SSID and Password by running `sudo bash configurewifi.sh` in the Raspberry Pi shell
13. You should now be broadcasting your own WiFi network with Pi Hole DNS sinkhole, Squid Cache, and Node Express Web Server
  - The local web server can be accessed in the browser at either `http://bridges` or `http://10.0.0.1`
  - The Pi-Hole Dashboard can be accessed in the browser at `http://pi.hole:8080/admin`
14. Follow post-installation instructions to configure your clients to make use of Squid HTTP proxy.


### Mac OS
1. Download and install [Balena Etcher](https://www.balena.io/etcher/)
2. Download [*Bridges* image](https://drive.google.com/open?id=1dwv18Lyx4Elu50rah06Jb-MrmHzcGZB5)
3. Insert Micro SD card into build machine
4. Open Balena Etcher and select *bridge.img.gz* as your image and your SD card as target drive
5. Confirm your target drive and Flash
![Screenshot of Balena Etcher](https://sandbox.markofthelam.com/img/balena.png)  
6. When flash is complete eject SD card and insert into Raspberry Pi
7. Connect Raspberry Pi to internet modem with Ethernet cable and power on the Raspberry Pi
8. The first boot will take extra time to expand the SD card and initialize software, wait at least 10 minutes
9. When it is completed a wireless network should be visible named `Bridges WiFi`
10. Connect to `Bridges WiFi` with the password `community`
11. Use your preferred terminal to SSH into the Raspberry Pi with `ssh oper@bridges` and password: `bridges`
12. Change WiFi SSID and Password by running `sudo bash configurewifi.sh` in the Raspberry Pi shell
13. You should now be broadcasting your own WiFi network with Pi Hole DNS sinkhole, Squid Cache, and Node Express Web Server
  - The local web server can be accessed in the browser at either `http://bridges` or `http://10.0.0.1`
  - The Pi-Hole Dashboard can be accessed in the browser at `http://pi.hole:8080/admin`
14. Follow post-installation instructions to configure your clients to make use of Squid HTTP proxy.

### Linux
1. Download and install [Balena Etcher](https://www.balena.io/etcher/)
2. Download [*Bridges* image](https://drive.google.com/open?id=1dwv18Lyx4Elu50rah06Jb-MrmHzcGZB5)
3. Insert Micro SD card into build machine
4. Open Balena Etcher and select *bridge.img.gz* as your image and your SD card as target drive
5. Confirm your target drive and Flash
![Screenshot of Balena Etcher](https://sandbox.markofthelam.com/img/balena.png)  
6. When flash is complete eject SD card and insert into Raspberry Pi
7. Connect Raspberry Pi to internet modem with Ethernet cable and power on the Raspberry Pi
8. The first boot will take extra time to expand the SD card and initialize software, wait at least 10 minutes
9. When it is completed a wireless network should be visible named `Bridges WiFi`
![Bridge WiFi Network Manager](https://sandbox.markofthelam.com/img/bridge-linux.png)
10. Connect to `Bridges WiFi` with the password `community`
11. Use your preferred terminal to SSH into the Raspberry Pi with `ssh oper@bridges` and password: `bridges`
12. Change WiFi SSID and Password by running `sudo bash configurewifi.sh` in the Raspberry Pi shell
13. You should now be broadcasting your own WiFi network with Pi Hole DNS sinkhole, Squid Cache, and Node Express Web Server
  - The local web server can be accessed in the browser at either `http://bridges` or `http://10.0.0.1`
  - The Pi-Hole Dashboard can be accessed in the browser at `http://pi.hole:8080/admin`
14. Follow post-installation instructions to configure your clients to make use of Squid HTTP proxy.

## Post Installation
To make use of Squid HTTP Web Cache you must configure your client devices to use the router as the HTTP Proxy. This enables Squid Cache to act as a proxy server allowing all connected to use the network cache server which will allow faster web requests for connected clients. It is optimal to configure the proxy in your system settings so that all applications running your device. The specific instructions will vary between operating systems, but  you can use Chrome Browser to navigate to your system proxy settings.

### Computer Proxy Setup
#### Chrome/ Chromium Proxy Setup
Chromium uses your system proxy settings. When changed it will affect all applications on your machine.  

1. Open Chrome and open Preference panel
2. Navigate to Advanced > Systems page
3. Manually configure proxy with the router IP address as your proxy server 
  - HTTP Proxy: `10.0.0.1`
  - Port: `3128`
4. This will set the 

#### Firefox Proxy Setup
You can manually set the router as the proxy server on Firefox Browser. You will do this in the browser's preferences page.

1. Open Firefox Browser and go to Preferences panel
2. Navigate to Network Settings and select *settings*
3. Select Manual Proxy Configuration and set:
  - HTTP Proxy: `10.0.0.1`
  - Port: `3128`
  
### Mobile Devices
#### IPhone
1. Navigate WiFi Settings
2. Select to Bridge WiFi options 
3. Select Configure Proxy
4. Enable Manual Proxy
  - Server: `10.0.0.1`
  - Port: `3128`
  
### Pi-Hole
*Bridge WiFi* has Pi-Hole pre-configured. Pi-Hole is a DNS Sinkhole which acts as a network level ad-blocker. It greatly improves network speeds by re-directing malicious and advertisement dns requests. Please view the [Pi Hole Website](https://pi-hole.net/) for instructions for advanced configurations.

The Pi-Hole web dashboard can be viewed at:
- `http://pi.hole:8080/admin` or `http://10.0.0.1:8080/admin`

![Pi-Hole Dashboard](https://sandbox.markofthelam.com/img/piholedashboard.png)

## Thank you
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
