#include <iostream>
#include <string>
#include <iomanip>
#include <fstream>

using namespace std;
static double underW = 18.5;
static double normalW = 24.9;
static double overW = 29.9;

class BMI{
public:
    int feet;
    int inches;
    int weight;

 BMI( int ft, int in, int lbs)
 {
    feet= ft;   
    weight = lbs;
	
 }

 int height( )
 {
    //compute height in inches
    int heightIn = (feet*12)+inches;
    return heightIn;
 }

 double computeBmi(int height )
 {
    double bmi = weight;
    return bmi/(height*height)*703;
 }

 string bmiRating( )
 {
    double bmi = computeBmi( height());
    if( bmi < underW)
        return "Underweight";
    else if( bmi < normalW)
        return "Normal weight";
    else if( bmi < overW)
        return "Overweight";
    else
        return "Obese";
 }
};

int main(int argc, char* argv[]) {
       
int arg1 = atoi(argv[1]);
int arg2 = atoi(argv[2]);
int arg3 = atoi(argv[3]);
            
if(arg1 < 0 || arg2 < 0 ||arg3 <= 0 )
{
    cout << "Invalid Input Value(s)";
    return 0;
}
               
BMI bmi(arg1, arg2, arg3);
cout << bmi.bmiRating()  <<  " " << bmi.computeBmi(bmi.height());
return 0;
}