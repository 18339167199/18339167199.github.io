//https://www.dotcpp.com/oj/problem1000.html
//Data:2021-3-25
//author:李茂灿

import java.util.Scanner;
import java.util.BigInteger;

public class Main {
	public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
		int j = sc.nextInt();
		BigInteger a,b;

		for(int i = 0; i < j; i++){
		   a = sc.nextBigInteger();
		   b = sc.nextBigInteger();
		   System.out.println("Case " + (i + 1) + ":");
		   System.out.println(a + " + " + b + " = " + a.add(b));
		   if (i != j - 1) {
		    System.out.println();
		   }
		}
		    sc.close();
			n++;
		   int a = sc.nextInt();
		   int b = sc.nextInt();
		   int c = a + b;
		   System.out.println("case " + (n) +":");
		   System.out.println(a + " + " + b + " = " + c);
		   System.out.println();
	    }
   }