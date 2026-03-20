---
title: How do you build a computer like mine?
category: Tech
excerpt: Building a computer running completely on freedom respecting software without any proprietary binary blobs.
---

## Motivation
To build a computer running completely on freedom respecting software without any proprietary binary blobs.

## Hardware
### A small anecdote to begin with...
A Libreboot X200s bought from Flashed Tech. The proprietor, Jordan Smith, was generous enough to upgrade me to 512 GB SSD for a delay in order processing. Jordan helped me in building the machine from bottom up, just the way I wanted it.

The process of getting it to India was quite a journey, involving a month-long wait and a bit of an "interrogation" at the customs office. The officer had many questions about why I was importing a laptop instead of buying one locally, but I managed to get it released by making the legal customs payment with a receipt.

### Peripherals
I use two external displays ([Dell U2412M](https://images10.newegg.com/UploadFilesForNewegg/itemintelligence/dell/dell_u2412m_User_s_20Guide_en_us1400443493597.pdf)) with the above machine which is connected to an [Ultrabase X200 docking station](https://store.vikings.net/libre-friendly-hardware/ultrabase). 

The in-built LCD for the Libreboot has been removed completely in the setup I have. It's just the keyboard and the laptop base. Inspiration to do so — [The typewriter](https://typewriterrevolution.com/). Going headless makes it less portable, but I chose aesthetics and nostalgia over portability. One display is in vertical mode for GUI applications, and the other is in horizontal mode for my IDE.

## Software
### Firmware
Uses [Libreboot](https://libreboot.org/) BIOS. Proprietary BIOS and [Intel management engine (ME)](https://libreboot.org/faq.html#intelme) have been removed.

### Operating System
[Trisquel 8.0 LTS](https://trisquel.info/) — A fully free GNU/Linux operating system.

### Networking
Usage of Wired Ethernet to connect to internet using Tor. I use wired ethernet for networking as it supports 1Gbps bandwidth.

### Desktop environment
I use the [Mate](https://en.wikipedia.org/wiki/MATE_(software)) desktop environment for most of my work, and sometimes GNOME.

### Web Browser
[Abrowser](https://trisquel.info/en/wiki/abrowser-help) with [GNU LibreJS](https://www.gnu.org/software/librejs/), [HTTPS Everywhere](https://www.eff.org/https-everywhere), and other privacy-focused addons.

### Email
[Icedove](https://directory.fsf.org/wiki/Icedove) email client with [Enigmail](https://www.enigmail.net/index.php/en/) addon.

---

### A headless Libreboot X200s with external displays
![2020 computer setup](/assets/img/2020Setup.jpg "A headless Libreboot X200s with external displays. Photo created using Cheese application for GNOME")

### Current setup (Recently updated)
![2021 computer setup](/assets/img/godMode.jpg "Current setup (Recently updated)")

### Setup Diagram
![setup blueprint](/assets/img/ComputerSetup2021.jpg "Setup Diagram. Created using LibreOffice Draw")
