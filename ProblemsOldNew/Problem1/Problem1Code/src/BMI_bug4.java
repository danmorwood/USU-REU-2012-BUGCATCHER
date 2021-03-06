/*
 * BUG 4 : LINE 41-48 logic error in comparisons
 */

/**
 *
 * @author DPDR
 */

public class BMI_bug4 {
    private int feet = 0;
    private int inches = 0;
    private int weight = 0;
    private static double underW = 18.5;
    private static double normalW = 24.9;
    private static double overW = 29.9;

public BMI_bug4( int ft, int in, int lbs)
{
    feet= ft;
    inches = in;
    weight = lbs;
}

public int height( )
{
    //compute height in inches
    int heightIn = (feet*12)+inches;
    return heightIn;
}

public double computeBmi(int height )
{
    double bmi =weight;
    return (bmi/(height*height))*703;
}

public String bmiRating( )
{
    double bmi = computeBmi( height());
    if (bmi > underW)
        return "Normal weight";
    else if( bmi > normalW)
        return "Overweight";
    else if(bmi > overW)
        return "Obese";
    else
        return "Underweight";
}

    public static void main(String[] args) {
        // TODO code application logic here
        
        
        int arg1 = 0;
        int arg2 = 0;
        int arg3 = 0;
        
        arg1 = Integer.parseInt(args[0]);
        arg2 = Integer.parseInt(args[1]);
        arg3 = Integer.parseInt(args[2]);
                
        if(arg1 < 0 || arg2 < 0 ||arg3 <= 0 )
        {
            System.out.println("Invalid Input Value(s)");
            return;
        }
                
        BMI_bug4 bmi = new BMI_bug4(arg1, arg2, arg3);
        System.out.printf(bmi.bmiRating() + " %1$.1f\n", bmi.computeBmi(bmi.height()));      
    
    }
}