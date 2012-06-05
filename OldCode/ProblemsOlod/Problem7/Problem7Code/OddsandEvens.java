package guizilla;

public class OddsandEvens {
	
	public static int oddDigits(int digits){
		int toReturn = 0;
		while (digits > 0){
			int isOdd = digits % 10;
			if ((isOdd % 2) != 0){
				toReturn++;
			}
			digits /= 10;
		}
		return toReturn;
	}
	
	public static int evenDigits(int digits){
		int toReturn = 0;
		while (digits > 0){
			int isOdd = digits % 10;
			if ((isOdd % 2) == 0){
				toReturn++;
			}
			digits /= 10;
		}
		return toReturn;
	}
	
	public static void main(String[] args){
			if (args[0].equals("even")){
				System.out.println(OddsandEvens.evenDigits(Integer.parseInt(args[1])));
			} else if (args[0].equals("odd")){
				System.out.println(OddsandEvens.oddDigits(Integer.parseInt(args[1])));
			}
	}

}
