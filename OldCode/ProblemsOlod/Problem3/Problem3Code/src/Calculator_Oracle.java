//Made by Miles English

public class Calculator_Oracle {
    
    public static double doTheMath(double num1, double num2, String sign)
    {
        double answer = 0;
        if (sign.compareTo("plus")== 0)
                 answer = doAdd(num1, num2);
        if (sign.compareTo("minus")== 0)
            answer = doSubtract(num1, num2);
        if (sign.compareTo("over")== 0)
            answer = doDivide(num1, num2); 
        if (sign.compareTo("times")== 0)
            answer = doMultiply(num1, num2);
        return answer;
    }
    
    public static double doAdd(double num1, double num2)
    {
        double answer = num1 + num2;
        return answer;
    }
    
    public static double doSubtract(double num1, double num2)
    {
        return num1 - num2;
    }
    
    public static double doMultiply(double num1, double num2)
    {
        return num1 * num2;
    }
    
    public static double doDivide(double num1, double num2)
    {
        return num1 / num2;
    }
    
    public static void main(String[] args)
    {
        double num = Double.parseDouble(args[0]);
        String sign = args[1];                     
        double num1 = Double.parseDouble(args[2]);
        double answer = doTheMath(num, num1, sign); 
        System.out.println(answer);        
    }
}
