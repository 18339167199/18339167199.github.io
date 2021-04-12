//https://www.dotcpp.com/oj/problem1012.html
// Data:2021-3-25
// author:李茂灿

import java.util.Scanner;
import Java.util.Array;

public class Main {
	public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
		int num = 0, chartra = 0, black = 0, other = 0;
		while(sc.hasNext()){
			String result = sc.nextLine();
			//利用toCharArray();将字符串转换为字符数组。
			char x[] = result.toCharArray();
		    for(int i = 0; i < x.length; i++){
		    	if(Character.isDigit(x[i])){
		    		num++;
		    	}else if(Character.isLetter(x[i])){
		    		chartra++;
		    	}else if(Character.isSpace(x[i])){
		    		black++;
		    	}else{
		    		other++;
		    	}
		    }
		    System.out.print(chartra);
		    System.out.print(" " + num);
		    System.out.print(" " + black);
		    System.out.print(" " + other);
	}
}