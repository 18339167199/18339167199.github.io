//https://www.dotcpp.com/oj/problem1009.html
// Data:2021-3-25
// author:李茂灿

import java.util.Scanner;

public class Main {
	public static void main(String[] args) {	

        Scanner sc = new Scanner(System.in);
		while(sc.hasNext()){
		int count = sc.nextInt();
		//String.valueOf(count).length() 将整数转换成字符串 长度
		int tep = String.valueOf(count).length();
		System.out.println(String.valueOf(count).length());
		int result[] = new int [tep];
		int op[] = new int [tep];
		int backup = count;
		//revere 用来反转之后的数
		int revere = 0;
		String  str = "";
		for(int i = 0; i < tep; i++){
			result[i] = backup % 10;
			backup = backup / 10;
		}
		
		//计算输出的第一行
		for(int i = result.length -1; i >=0; i--){
			str += result[i];
			//应为最后一个是后面不带空格的，所以要判断不是最后一个的后就加上
			if(i > 0){
				str += "";
			}
		}
		//计算反过来的数
		for(int i = 0; i < result.length; i++){
			revere  += result[i]*Math.pow(10,(tep - i -1));
		}
		//输出
		System.out.println(tep);
		System.out.println(str);
		System.out.println(revere);
	}
}