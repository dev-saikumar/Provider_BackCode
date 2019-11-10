const express = require("express");
const route= express.Router();

route.get('/',(req,res)=>{
    if(req.query.n==1){
        res.status(200).send(`import java.net.*;
        importjava.lang.*;
        import java.io.*;
        public class Experiment1
        {
        public static void main(String args[])
        {
        try
        {
        InetAddresslocaladdr=InetAddress.getLocalHost();
        System.out.println ("LocalIPAddress:"+localaddr);
        System.out.println ("Local hostname:"+localaddr.getHostName());
        }
        catch (UnknownHostException e)
        {
        System.err.println ("Can't detectlocalhost:"+e);
        }
        }
        }`).end();
    }
    if(req.query.n==2){
        res.status(200).send(`import java.io.*;
        import java.net.*;
        importjava.util.*;
        importjava.text.*;
        class Pings
        {
        public static void main(String args[]) throws IOException
        {
        ServerSocket s = new ServerSocket(2000);
        while(true)
        {
        Socket c = s.accept();
        InputStream in = c.getInputStream();
        InputStreamReaderinr = new InputStreamReader(in);
        BufferedReaderbr = new BufferedReader(inr);
        String str = br.readLine();
        System.out.println("Ping command received from : "+c.getInetAddress() +" with string
        "+str);
        PrintStream ps = new PrintStream(c.getOutputStream());
        ps.println(str);
        }
        }
        }
        
        
        import java.io.*;
import java.net.*;
public class Pingc
{
public static void main(String args[]) throws IOException
 {
long t1, t2;
while(true)
 {
try{
Socket soc = new Socket("localhost",2000);
InputStreamReaderisr = new InputStreamReader(System.in);
BufferedReaderbr = new BufferedReader(isr);
System.out.println("Type a string to ping : ");
String str = br.readLine();
OutputStreamos = soc.getOutputStream();
PrintWriterpw = new PrintWriter(os,true);
InputStream in = soc.getInputStream();
InputStreamReaderinr = new InputStreamReader(in);
BufferedReader br1 = new BufferedReader(inr);
t1 = System.currentTimeMillis();
pw.println(str);
String str1 = br1.readLine();
t2 = System.currentTimeMillis();
System.out.println("Pinging "+soc.getInetAddress()+" with string "+str );
System.out.println("Reply from "+soc.getInetAddress() +" String "+str1+" Length :
"+str1.length());
System.out.println("Sent : "+str.length()+" Received : "+str1.length()+" Lost : "+(str.length()-
str1.length()));
System.out.println("Approx. Time in Milliseconds = "+(t2-t1));
 }
catch(Exception e)
 {
System.out.println("Error : "+e.getMessage());
 }
} }}
        
        `).end();
    }
    if(req.queryn==3){
        res.status(200).send(`import java.net.*;
        import java.net.*;
        import java.io.*;
        importjava.util.Date;
        classDserver
        {
        public static void main(String args[])throws IOException
        {
        ServerSocket server=new ServerSocket(13);
        Socket connection=null;
        while(true)
        {
        try
        {
        connection=server.accept();
        Writer out=new OutputStreamWriter(connection.getOutputStream());
        Date now=new Date();
        out.write(now.toString()+"\r\n");
        out.flush();
        connection.close();
        }
        catch(IOException ex){}
        finally
        {
        try
        {
        if(connection!=null)
        connection.close();
        }
        catch(IOException ex){}
        }
        }
        }
        }
        
        CLIENT SIDE
import java.net.*;
import java.io.*;
importjava.util.Date;
classDclient
{
public static void main(String args[])
{
String hostname;
if(args.length>0)
{
hostname=args[0];
}
else
{
hostname="localhost";
}
try
{
Socket s=new Socket(hostname,13);
InputStreamtimestream=s.getInputStream();
StringBuffer time=new StringBuffer();
int c;
while((c=timestream.read())!=-1)
time.append((char)c);
String t=time.toString().trim();
System.out.println("Itis"+t+"at"+hostname);
}
catch(UnknownHostException ex)
{
System.err.println(ex);
}
catch(IOException ex){
System.err.println(ex);
}
}
}       
        `).end();
    }
    if(req.query.n==4){
        res.status(200).send(`
        CLIENT PROGRAM
        importjava.io.IOException;
        importjava.net.DatagramPacket;
        importjava.net.DatagramSocket;
        importjava.net.InetAddress;
        importjava.util.Scanner;
        public class Client
        {
        public static void main(String args[]) throws IOException
        {
        Scanner sc = new Scanner(System.in);
        DatagramSocket ds = new DatagramSocket();
        InetAddressip = InetAddress.getLocalHost();
        bytebuf[] = null;
        // loop while user not enters "bye"
        while (true)
        {
        String inp = sc.nextLine();
        buf = inp.getBytes();
        DatagramPacketDpSend= newDatagramPacket(buf, buf.length, ip, 1234);
        ds.send(DpSend);
        // break the loop if user enters "bye"
        if (inp.equals("bye"))
        break;
        }
        }
        }
        SERVER SIDE:
        importjava.io.IOException;
importjava.net.DatagramPacket;
importjava.net.DatagramSocket;
importjava.net.InetAddress;
importjava.net.SocketException;
public class Server
{
public static void main(String[] args) throws IOException
{
DatagramSocket ds = new DatagramSocket(1234);
byte[] receive = new byte[65535];
DatagramPacketDpReceive = null;
while (true)
{
// Step 2 : create a DatgramPacket to receive the data.
DpReceive = new DatagramPacket(receive, receive.length);
// Step 3 :revieve the data in byte buffer.
ds.receive(DpReceive);
System.out.println("Client:-" + data(receive));
// Exit the server if the client sends "bye"
if (data(receive).toString().equals("bye"))
{
System.out.println("Client sent bye.....EXITING");
break;
}
// Clear the buffer after every message.
receive = new byte[65535];
}
}
public static StringBuilder data(byte[] a)
{
if (a == null)
return null;
StringBuilder ret = new StringBuilder();
int i = 0;
while (a[i] != 0)
{
ret.append((char) a[i]);
i++;
}
return ret;
}
}
        `).end();
    }
    if(req.query.n==5){
        res.status(200).send(`(A)Daemon Thread execution
        import java.io.*;
        public class Test extends Thread
        {
        public void run()
        {
        if(Thread.currentThread().isDaemon())
        {
        System.out.println("daemon thread execution..");
        }
        else
        {
        System.out.println("user thread execution");
        }
        }
        public static void main(String[] args)
        {
         Test t1=new Test();
         Test t2=new Test();
         Test t3=new Test();
        t1.setDaemon(true);
        t1.start();
        t2.start();
        t3.start();
        }
        } 
        
        
        (B)Thread sleep and wakeup methods
public class Deamon extends Thread
{
publicDeamon(String s)
{
super(s);
}
public void run()
{
System.out.println("entering run()");
Try
{
System.out.println("in run() - currentThread()="+ Thread.currentThread());
for (int x = 1; x <= 3; x++)
{
System.out.println(x + " this is daemon thread "+ Thread.currentThread().isDaemon());
Try
{
Thread.sleep(300);
}
catch (Exception e)
{
e.printStackTrace();
}
System.out.println("thread woke up again");
}
}
catch (Exception e)
{
System.out.println(e.getMessage()); }
}
public static void main(String[] args)
{
Deamon d1 = new Deamon("1");
d1.setDaemon(true);
Deamon d2 = new Deamon("2");
Deamon d3 = new Deamon("3");
d1.start();
d2.start();
d3.start();
}
}
        `).end();
    }
    if(req.query.n==6){
        res.status(200).send(`importjava.net.InetAddress;
        importjava.net.NetworkInterface;
        importjava.net.SocketException;
        importjava.net.UnknownHostException;
        importjava.util.Scanner;
        public class MacAddress
        {
        public static void main(String[] args)
        {
        try
        {
        Scanner console = new Scanner(System.in);
        System.out.println("Enter System Name: ");
        String ipaddr = console.nextLine();
        InetAddress address = InetAddress.getByName(ipaddr);
        System.out.println("address = "+address);
        NetworkInterfaceni = NetworkInterface.getByInetAddress(address);
        if (ni!=null)
        {
        byte[] mac = ni.getHardwareAddress();
        if (mac != null)
        {
        System.out.print("MAC Address : ");
        for (int i=0; i<mac.length; i++)
        {
        System.out.format("%02X%s", mac[i], (i<mac.length - 1) ? "-" :"");
        }
        }
        else
        {
        System.out.println("Address doesn't exist or is not accessible/");
        }
        }
        else
        {
        System.out.println("Network Interface for the specified address is not found");
        }
        }
        catch(UnknownHostException | SocketException e)
        {
        }
        }
        }`).end();
    }
        res.status(200).send('ni yebba correct number kottu bey').end();
    });

module.exports=route;