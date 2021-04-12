//https://www.dotcpp.com/oj/problem1005.html
// Data:2021-3-25
// author:李茂灿

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        double f = sc.nextDouble();
        double c = 5*(f-32)/9;
        // 保留两位小数        
        System.out.println(String.format("c=%.2f", c));
    }
}