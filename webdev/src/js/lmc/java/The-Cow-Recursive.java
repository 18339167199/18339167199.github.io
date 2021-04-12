//https://www.dotcpp.com/oj/problem1004.html
//  Data:2021-3-25
//  author:李茂灿

import java.util.Scanner;

public class Main {
	public static void main(String[] args) {

		Scanner scanner=new Scanner(System.in);
		Main main=new Main();
		while (true) {
		int n=scanner.nextInt();
		if (n==0) {
		    break;
		}
		    main.nainiu(n);
		}
		public void nainiu(int a) {
		  int[] i=new int[55];
		  i[0]=1;
		  i[1]=2;
		  i[2]=3;
		for (int j = 3; j < i.length; j++) {
		  i[j]=i[j-1]+i[j-3];
		}
		  System.out.println(i[a-1]);
	  }
 }