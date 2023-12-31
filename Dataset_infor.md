## Attacks

The competition datasets include various API attack you may or may not encounter in any dataset. This is a basic description of the attacks you are encouraged to search online about these attacks in order to map out their features:

1. **SQL Injection** - One of the most common web attacks, uses backend SQL queries to inject code directly to the servers SQL database.

2. **Directory Traversal** - Uses basic terminal traversal strings in order to reach folders on the servers host that were not meant to be accessed by the user.

3. **Remote Code Execution (RCE)** - Some may call it the most critical exploit in any system, it allows the attacker to run code remotely on the local machine.

4. **Cookie Injection** - Cookies injected to a session they were not originated from. This is used sometimes to access another user illegitimately by using his tokens. 

5. **Cross Site Scripting (XSS)** - Another very widely used web vulnerability XSS enables the attacker to run client-side code that will eventually affect sensitive processes handled by the backend.

6. **Log4J** - One of the most famous recently patched vulnerabilities. An exploit in JAVA servers using the famous Apache logging library that enables to run code remotely (This is actually an "easy" RCE exploit) on the server.

7. **Log Forging** - A technique of using the system to print fake or fraudulent logs. This enables an attacker to "inject" other user logs or fake his own attack logs in order to make it harder for any security researcher to find out what he really did during his access.