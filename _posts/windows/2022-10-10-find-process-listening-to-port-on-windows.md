---
title: "How to Find the Process Listening to Port on Windows 10 & 11"
header:
  teaser: /assets/images/find-process-listening-to-port-on-windows/check-ports-in-use-windows-10-04.png
  og_image: /assets/images/find-process-listening-to-port-on-windows/check-ports-in-use-windows-10-04.png
categories:
  - Windows
tags:
  - windows
  - pid
  - port
  - process-id
toc: true
toc_sticky: true
---
{% include figure image_path="/assets/images/find-process-listening-to-port-on-windows/check-ports-in-use-windows-10-04.png" alt="This is top image" %}

Can’t use a specific port? Here’s how to check which port is in use in Windows with simple commands and apps like currports and tcpview.

Windows has many applications connected or trying to connect to the internet at any point in time. With all those applications, it is only natural that they use many network ports.

Two or more applications may need the same port to work from time to time. When that specific port is already in use by one application, the other application cannot use that port, and it may show a warning message, error out, or crash entirely.

In those situations, it is better to know which ports are used and which application is using that specific port. That way, you can either change the port or terminate the problem-causing application so that the other one works as it should.

The good thing is that it is pretty easy to **know which port is used by which application in Windows**. So, without further ado, let me show the steps to find which ports are used in Windows 10 and 11 operating systems.

> Note: The methods shown below work in Windows 7, 8, 10, and 11.

## Command to check ports in 

Using a single command, you can get a list of all the ports in use by various programs. This method is quite helpful if you want to take a quick glance at the ports in use.

1. Search for “cmd” in the start menu, right-click on the Command Prompt and select “Run as Administrator.” This option lets you open the command prompt with admin rights. {% include figure image_path="/assets/images/find-process-listening-to-port-on-windows/open-command-prompt-as-admin.png" alt="This is top image" %}
2. In the elevated command prompt window, execute the below command. You can copy and paste the command into the Command Prompt window by right-clicking inside it.
  ```shell
    netstat -ab
  ```
3. You will see the port number right next to the IP address (ex: 192.168.42.198:50943) in the output result. You can see the highlighted portion of the attached image for better representation.

Keep in mind that the list will not be refreshed automatically. You have to execute the command again when you need an updated list. If you want the used port list to be updated automatically, follow one of the two methods illustrated below.

## Use CurrPorts to find ports in use

Nirsoft Utilities has a pretty neat and lightweight tool called CurrPorts. It shows all the ports used by Windows and other programs. Let me show you how to use the application to get the information you need.

A quick note: In case you don’t know, Nirsoft has a lot of small and portable apps that are pretty useful in day-to-day life. If you’ve never used Nirsoft Utilities, browse the developer site and find many interesting little tools.

1. First, [download](https://www.nirsoft.net/utils/cports.html) CurrPorts from the official website. Being a portable application, you don’t have to install it. After downloading, extract the exe file from the zip file and double-click the file to open it.

2. As soon as you open the window, the application will list all the connections and their ports. You can find the port number under the Local Port section. {% include figure image_path="/assets/images/find-process-listening-to-port-on-windows/check-ports-in-use-windows-10-04.png.webp" alt="This is CurrPorts image 1" %}

3. Being a dedicated port monitoring application, it offers quite a few options to manage the applications and ports. Right-click on any option, and you will see appropriate options like the ability to close the TCP connection, copying properties, application properties, etc.{% include figure image_path="/assets/images/find-process-listening-to-port-on-windows/check-ports-in-use-windows-10-05.png.webp" alt="This is CurrPorts image 2" %}

4. If you want finer control, you can create your own filters to narrow down the search. To do that, select “Options -> Advanced Filters” option. {% include figure image_path="/assets/images/find-process-listening-to-port-on-windows/check-ports-in-use-windows-10-06.png.webp" alt="This is CurrPorts image 3" %}

## Use Sysinternals TCPView to check ports in use

Sysinternals TCPView is a Microsoft tool that makes it easy to view all the TCP connections and ports used in Windows 10 and 11. The tool is very similar to CurrPorts.

1. Download [TCPView](https://docs.microsoft.com/en-us/sysinternals/downloads/tcpview) from the Sysinternals website, extract the exe file to your desktop, and double-click on it.

2. As soon as you open the application, you will see a user agreement. Agree to the agreement, and you will instantly see all the TCP connections and ports in use. You will find the port numbers under the Local Port section. {% include figure image_path="/assets/images/find-process-listening-to-port-on-windows/check-ports-in-use-windows-10-02.png.webp" alt="This is CurrPorts image 3" %}

3. You can end the connection and free the port if you want to. To do that, right-click on the connection and select “End Process.” This will terminates the process. {% include figure image_path="/assets/images/find-process-listening-to-port-on-windows/check-ports-in-use-windows-10-03.png.webp" alt="This is CurrPorts image 3" %}
