//https://www.dotcpp.com/oj/problem1008.html
// Data:2021-3-25
// author:李茂灿

import java.util.Scanner;

public class Main {
	public static void main(String[] args) {
        
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        int y=0;
        if (x >= 90) {
            System.out.println("A");
        } else if (x >= 80 && x < 89) {
            System.out.println("B");
        } else if (x >= 70 && x < 79) {
            System.out.println("C");
        } else if (x >= 60 && x < 69) {
            System.out.println("D");
        } else if (x < 60) {
            System.out.println("E");
        }
    }