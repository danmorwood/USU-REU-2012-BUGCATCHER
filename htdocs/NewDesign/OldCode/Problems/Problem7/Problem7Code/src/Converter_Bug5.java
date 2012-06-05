//BUG 5 : LINE 33 When the minutes go past 60, hours decrement instead of incrementing

public class Converter_Bug5 {
     public static String convertSecsToTime(int sec)
     {
         double seconds = sec;
         int minutes = 0;
         int hours = 0;
         int days = 0;
         boolean secondsFixed = false;
         boolean minutesFixed = false;
         boolean hoursFixed = false;
         
         if (seconds < 0.0)
             return "Error: Bad input";
         
         while (secondsFixed == false || minutesFixed == false || hoursFixed == false)
         {
             if (seconds >= 60)
             {
                 seconds -=60;
                 minutes +=1;
             }
             if (minutes >= 60)
             {
                 minutes -=60;
                 hours -=1;
             }
             if (hours >= 24)
             {
                 hours -=24;
                 days +=1;
             }
             if (seconds < 60)
                 secondsFixed = true;
             if (minutes < 60)
                 minutesFixed = true;
             if (hours < 24)
                 hoursFixed = true;
         }
         return days + ":" + hours + ":" + minutes + ":" + seconds;
         
     }      
     
   public static void main(String[] args) {
       int num = Integer.parseInt(args[0]);
       String answer = convertSecsToTime(num);
       System.out.println(answer);
   
   }    
}

