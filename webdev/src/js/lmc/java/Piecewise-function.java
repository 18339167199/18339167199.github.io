//https://www.dotcpp.com/oj/problem1007.html
// Data:2021-3-25
// author:李茂灿

import java.util.Scanner;

public class Main {
	public static void main(String[] args) {	

        Scanner scanner = new Scanner(System.in);
        int x = scanner.nextInt();
        if (x<1)
        {
        x=x;    
        }
        else if(x>=1&&x<10)
        {
            x=2*x-1;
        }
        else if(x>=10)
        {
            x=3*x-11;
        }
        System.out.println(x);
    }
}
