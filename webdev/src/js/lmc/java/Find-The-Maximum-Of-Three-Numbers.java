//https://www.dotcpp.com/oj/problem1006.html
// Data:2021-3-25
// author:李茂灿

import Java.util.Scanner;

public class Main {
	public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
		while(sc.hasNext()){
		int a = sc.nextInt();
		int b = sc.nextInt();
		int c = sc.nextInt();
		int max;
		if(a > b){
			if(a > c){
			max = a;
			System.out.println(max);
			}
		}
		if(b > a){
			if(b > c){
			max = b;
			System.out.println(b);
		}
		    }
		if(c > a){
			if(c > b){
				max = c;
				System.out.println(c);
			}
	}
}