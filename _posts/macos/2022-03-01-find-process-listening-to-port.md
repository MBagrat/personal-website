---
title: "How to Find the Process Listening to Port on Mac OS X"
header:
    teaser: /assets/images/find-process-listening-to-port/find-process-listening-to-port.png
    og_image: /assets/images/find-process-listening-to-port/find-process-listening-to-port.png
categories: 
 - MacOS
tags: 
 - osx
 - pid
 - port
 - process-id
toc: true
toc_sticky: true
---

{% include figure image_path="/assets/images/find-process-listening-to-port/find-process-listening-to-port.png" alt="This is top image" caption="To find the process that is listening to a port on Mac OS X, we’ll use the lsof command to find the process ID (PID), and the ps command to show the name." %}

### Find the Process ID (PID)

There are two different ways we can use to find the process that is listening to a port on Mac OS X.

#### Find the Process ID (PID) Using lsof

Using the **lsof** command we can find the process ID (PID) for a specific port that is in a LISTEN state. In a terminal type the following and replace the “<port-number>” with our port number.

```bash
lsof -nP -iTCP -sTCP:LISTEN | grep <port-number>
```

This generates output that looks like this:

```bash
node 63851 pogo 27u IPv6 0xfded4774db1c601f 0t0 TCP *:9999 (LISTEN)
```

In the output above the PID (process ID) is the second value, in this example output the process ID (PID) is “63851”. This command will also print out the port number, which is 9999 in the above output example.

#### Find the Process ID (PID) Using netstat

Using the **nestat** command we can find the process ID (PID) for a specific port. In a terminal type the following and replace the “<port-number>” with our port number.

```bash
netstat -anv | grep <port-number>
```

This generates output that looks like this:

```bash
tcp46 0 0 *.9999 *.* LISTEN 131072 131072 63851 0 0x0100 0x00000106
```

In the output above the PID (process ID) is the ninth value (the fourth value from the end), in this example output the process ID (PID) is “63851”. This command will also print out the port number, which is 9999 in the above output example.

### Find the Process Name

We can now use the process status command ps to display the process name for the process ID (PID).

```bash
ps -Ao user,pid,command | grep -v grep | grep <PID>
```

This generates output that looks like this:

```bash
mymachine 63851 the-process
```

In the output above the process name is the last value “the-process.” Now we know the name of the process that is listening to the port. The reason as to why the **grep** command is listed twice is to avoid displaying the process ID (PID) for the **grep** command itself.

### Other Useful Commands

#### How to Kill or Stop the Process by PID

You can kill the process by process ID (PID) using the **kill** command. Replace “<PID>” with the process ID from **lsof** or **netstat**.

```bash
kill -9 <PID>
```

#### The lsof Command

The **lsof** command lists open files. Network sockets count as files, so each open network socket, either listening or actively in use is listed by **lsof**. In addtion you can run the **man lsof** command to display all the different options for **lsof**.

```bash
man lsof
```

lsof can take a very long time to execute, so I suggest that you use -n (inhibits the conversion of network numbers to host names for network files) and -P (inhibits the conversion of port numbers to port names for network files) to speed it up.

```bash
lsof -nP
```