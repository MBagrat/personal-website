---
title: "Scripting Java 11, Shebang And All"
header:
  teaser: /assets/images/scripting-java-11-shebang-and-all/scripting-java-11-shebang-and-all.jpg
  og_image: /assets/images/scripting-java-11-shebang-and-all/scripting-java-11-shebang-and-all.jpg
categories:
  - Java
tags:
  - java
  - tools
  - shebang
  - scripting
  - java-scripting
  - java-scripting-shebang
toc: true
toc_sticky: true
last_modified_at: 2022-03-17T11:44:16+04:00
---

From Java 11 on, you can execute a single source file without compiling it first. Beyond experimentation, you can write 
scripts this way. Even the shebang is supported!

{% include figure image_path="/assets/images/scripting-java-11-shebang-and-all/scripting-java-11-shebang-and-all.jpg" 
alt="From Java 11 on, you can execute a single source file without compiling it first." %}

There are several reasons why writing scripts in Java seems to be a bad idea, chief among them that it's always a two 
step process to run a source file: It first has to be compiled (with javac) before it can be executed (with java). 
Enter Java 11, which, for a single source file, blends these two steps into one:

```zsh
    java HelloJavaScripts.java
```

Yes, you saw that right: The JVM accepts a source file and executes it. More than that, you can even define proper scripts, 
with shebang and everything, that you can execute like this:

```zsh
  ./hello-java-scripts
```

Let's see how!

## Single-Source-File Execution

Executing a single source file is straightforward. Simply write a self-contained class with a main method ...

```java
  public class HelloJavaScripts {
	  public static void main(String[] args) {
		  System.out.println("Hello, Java scripts!");
	  }
  }
```

... and pass that file to **java**:

```zsh
  $ java HelloJavaScripts.java
  > Hello, Java scripts!
```

There you go, you've just executed your first Java script! (Pun fully intended.) And with that you can already start 
experimenting, but, as usual, there are a few details that you should know. Let's discuss them next before coming to 
what may be Java 11's hidden killer feature.

### Prerequisites

First of all, the JVM can only compile source files if the _jdk.compiler_ module is present. That's the case for all full 
JDKs, but if you're [building your own images with jlink](https://medium.com/nipafx-news/is-jlink-the-future-1d8cb45f6306), 
you may well end up without it. In that case, you'll see this error message:

```zsh
  Error: A JNI error has occurred,
    please check your installation and try again
  Exception in thread "main" java.lang.InternalError:
    Module jdk.compiler not in boot Layer
```

There's no way to fix this - you simply have to use a runtime image with that module.

### On To The Details!

Once you start using single-source-file programs, you'll quickly end up in situations where it helps or is even required 
to explicitly inform the JVM that it's supposed to execute a source file and which Java version to compile it against. 
You do that with the **--source** option:

```zsh
  $ java --source 11 HelloJavaScripts.java
```

This is particularly interesting in conjunction with preview features (where specifying the source is a requirement anyways):

```zsh
  # running my switch expression demo with Java 12;
  # more on that: https://www.youtube.com/watch?v=1znHEf3oSNI
  $ java --source 12 --enable-preview Switch.java
```

Another situation where **--source** needs to be added is if the source file name does not end in **.java**. Yes, you got that 
right, the **.java** suffix is not mandatory! In fact, you can name the file any way you want:

```zsh
  $ java --source 11 hello-java-scripts
```

Besides **--source** and **--enable-preview**, the JVM processes many other command line options like **--class-path, --module-path,** 
and [those to hack the JPMS](https://nipafx.dev/five-command-line-options-hack-java-module-system/). If you end up using 
a lot of flags, you can put them into a so-called [@-file](https://medium.com/nipafx-news/java-argument-files-affiliations-and-lego-f5348e361f30) 
and reference that:

```zsh
  # content of file `args`:
  --source 12
  --enable-preview
  --class-path 'deps/*'
  # use that file
  $ java @args HelloJavaScripts.java
```

Whatever command line flags you add, as you would expect, all arguments after the file name are passed to the program's main method:

```zsh
  $ java --source 11 Greetings.java hello java scripts
  # main receives [ "hello", "java", "scripts" ]
```

Last and maybe even least, the compiled source will be executed in the unnamed module of a class loader specifically created 
for it alone. That class loader's parent is the application class loader (which loads the class path content), which means 
the main class has access to all dependencies on the class path.

Since the application class loader can't also access the "main class" loader (no circular class loader dependencies allowed), 
the inverse is not true and classes from the class path won't have access to the main class. I know, I know, sadly we can't 
execute our Spring/Hibernate applications from a single source file. 😭

### But Why?!!

You may wonder what this feature is good for. I mean, if you can't even write a web-backend with it...

Its primary use case is similar to [jshell, Java's REPL](https://docs.oracle.com/en/java/javase/11/jshell/introduction-jshell.html#GUID-630F27C8-1195-4989-9F6B-2C51D46F52C8): 
You can use it to run quick experiments, particularly in environments without an IDE. But unlike with jshell, you'll be 
able to enjoy syntax highlighting (assuming you have access to something more advanced than Notepad), the lack of which 
renders the REPL unusable to me.

Although, if you're like me, you have at least three IDE instances running at all times anyways and starting an experiment 
requires nothing more than Alt-Tabbing to one of them, letting it spew out a main or test method, and off you go. So for me, 
experimentation is not an important use case for single-source-file execution.

But if you occasionally write a demo or two, turning each into a single self-contained and executable file will make it 
easier for your audience. Sharing a single file is simpler than distributing a few of them and your audience can decide 
whether they want to fire up an IDE or simply throw the file at the JVM. That may make it easier for them to get started - 
particularly if they're Java beginners.

One detail that may end up driving that use case are [incubator modules](https://openjdk.java.net/jeps/11) and 
[preview features](https://openjdk.java.net/jeps/12). These are mechanisms that the JDK team can use to let us experiment 
with not-yet-finalized APIs and syntax. Unlocking these features requires special compiler and JVM commands and putting 
them into the right places in an IDE can be tedious and fragile. As we have seen above, adding them to java is much simpler:

```zsh
  $ java --source 12 --enable-preview Switch.java
```

There's one other way to use single-source-files, though, and it will knock your socks off! (If you're on Linux or macOS.)

## Java Scripts With Shebang

We've already seen most of the ingredients for scripts above but one is still missing: the [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)). 
The big news is, you can add it to Java source files and the JVM will ignore it when compiling the source!

Here's the file **hello-java-scripts**:

```java 
  #!/opt/jdk-11/bin/java --source 11
  public class HelloJavaScripts {
    public static void main(String[] args) {
      System.out.println("Hello, Java scripts!");
    }
  }
```
If the file is executable (with **chmod +x hello-java-scripts**) and its name doesn't end with **.java**, you can run it with 
**./hello-java-scripts** or, if it's on your **PATH**, even with **hello-java-scripts**. Arguments following the script's name are 
naturally passed on to the main method.

If you need to add further compiler or JVM flags, you can either put them into the source file **after** the **--source** option 
or fall back to explicitly launching the JVM as usual:

```java
  java -Xlog --source 11 hello-java-scripts
```
(What's **-Xlog** you ask? [Here you go.](https://nipafx.dev/java-unified-logging-xlog/))

FYI: If a script file starts with a shebang line, the file name must not end in .java. Before passing the file to the 
compiler, the JVM will replace the shebang line with an empty one. This keeps the compiler from barfing while preserving 
line numbers, which is handy for fixing compile errors.

### "Are You Serious?!"

Fair question. As I see it, there are three criticisms of writing scripts with Java:

- compilation and execution is a two-step process
- Java's programming model is not conducive to quick results
- the JVM is slow to boot

As we've discussed at length, the first bullet is no longer true. The third is definitely true, although it would be 
interesting to see whether we could add Graal native images to the mix. The second bullet feels true, but I'm not sure 
whether that's actually still the case.

Admittedly, things like Java's file system interaction and HTTP requests are powerful but not exactly elegant. Other 
things are, though. Lambdas and streams, local-variable type inference with var, the upcoming switch expressions - all 
of these make Java quite expressive and easy to achieve results with. Let's see an example.

## Echo - The Java Way

The Linux command line has a very simple tool called **echo** that simply prints to the terminal whatever you pass to it:

```zsh
$ echo "Hello, world"
> Hello, world
```

That's too boring, even for Java, so let's try something a little more advanced. In Linux you can "pipe" the result of 
one command into the next. This doesn't actually work with echo (it doesn't read from stdin), but let's do it in our Java 
variant nonetheless:

```zsh
#!/opt/jdk-11/bin/java --source 11
//  [... imports ...]

public class Echo {

	public static void main(String[] args) throws IOException {
		var lines = readInput();
		lines.forEach(System.out::println);
	}

	private static Stream<String> readInput() throws IOException {
		var reader = new BufferedReader(new InputStreamReader(System.in));
		if (!reader.ready())
			return Stream.empty();
		else
			return reader.lines();
	}

}
```

As you can see, readInput() tries to read from System.in, which is connected to stdin. The if checks whether there is any 
input at all because if not, reader.lines() will block until that changes - we want to avoid that. (I know, I know, awkward
Java in action...)

Putting this into a file echo and making it executable allows piping text into it - the content of haiku.txt, for example:

```zsh
$ cat haiku.txt | ./echo
# this is the unaltered content of haiku.txt
> worker bees can leave
> even drones can fly away
> the queen is their slave
```

Now, thanks to streams, it's easy to throw a few more complex operations at the input. Adding command line options for 
sorting and making lines unique, for example, are one-liners:

```java
public static void main(String[] args) throws IOException {
	var lines = readInput();
	// modify the stream according to command line options
	for (var arg : args)
		lines = modifyStream(arg, lines);
	lines.forEach(System.out::println);
}

private static Stream<String> modifyStream(String arg, Stream<String> input) {
	switch (arg){
		case "--sort": return input.sorted();
		case "--unique": return input.distinct();
		default: {
			System.out.println("Unknown argument '" + arg + "'.");
			return input;
		}
	}
}
```
in action:
```zsh
$ cat haiku.txt | ./echo --sort
> even drones can fly away
> the queen is their slave
> worker bees can leave
```
That's not too bad, is it?

## Reflection
Running source files in two easy steps:
- write a self-contained class with a main method
- throw it at the JVM with java Script.java

Because it's often needed, you should by default add --source, though. For example when experimenting with preview features:
- write an experimental class with a main method
- run it with 
```zsh 
  java --source 12 --enable-preview Switch.java
```
Finally, consider scripting with Java:
- write a self-contained source file with a main method
- add a shebang with the path to your Java install as first line, for example 
```zsh
#!/opt/jdk-11/bin/java --source 11
```
- name the file any way you want, for example just script
- make it executable with chmod +x script
- run it with ./script

- Remember that you can add all kinds of command line flags either to java or to the shebang line (in that case, they 
- have to come after --source). Options following the source file name are passed to main.

