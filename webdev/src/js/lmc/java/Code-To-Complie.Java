//https://www.dotcpp.com/oj/problem1003.html
// Data:2021-3-25
// author:李茂灿

import Java.util.Scanner;

public class Main {
	public static void main(String[] args) {	

        String c1 = "C";
		String c2 = "h";
		String c3 = "i";
		String c4 = "n";
		String c5 = "a";
		Scanner sc = new Scanner(System.in);
		String password = sc.nextLine();
		String result  = "";
		switch (password) {
		case "C" :
			c1 = "G";
			result = c1;
			break;
		case "h" :
			c2 = "l";
			result = c2;
			break;
		case "i" :
			c3 = "m";
			result = c3;
			break;
		case "n" :
			c4 = "r";
			result = c4;
			break;
		case  "a" :
			c5 = "e";
			result = c5;
			break;
		case "China" :
			result = "Glmre" ;
			break;
		}
		System.out.println(result);
	}
}