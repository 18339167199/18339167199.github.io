//https://www.dotcpp.com/oj/problem1010.html
// Data:2021-3-25
// author:李茂灿

import java.util.Scanner;

public class Main {
	public static void main(String[] args) {	

       Scanner sc=new Scanner(System.in);
       int a=sc.nextInt();
       double y=0;

       if(a<100000){ y=a*0.1; 
         }else if(a<=200000){ 
           y=100000*0.1+(a-100000)*75/1000; 
         }else if(a<=400000){ 
           y=100000*0.1+100000*0.075+(a-200000)*0.05;
         }else if(a<=600000){
           y=100000*0.1+100000*0.075+200000*0.05+(a-400000)*0.03; 
         }else if(a<=1000000){ 
           y=100000*0.1+100000*0.075+200000*0.05+200000*0.015+(a-600000)*0.015; 
         }else if(a>1000000){
           y=1000000.1+1000000.075+2000000.05+2000000.03+4000000.015+10000000.01;
       }
       System.out.println((int)y);
    }
}