#include "Checker.h"
#include <cstdlib>
#include <iostream>
using namespace std;

class Tile
{
public:
	//CONSTRUCTOR
	Tile(); //Default constructor
	
	//ACCESS FUNCTIONS
	bool isOccupied() const {return occupied;} //Returns true if there is a checker here
	bool getColor() const {return red_or_black;} //Even squares are red, odd are black
	Checker* getChecker() const {return check;} //Returns pointer to checker on tile
	
	//MODIFICATION FUNCTIONS
	void setChecker(Checker* c); //Sets check pointer to checker and occupied to true
	void makeEmpty(); //Sets check to null and occupied to false
	void setColor(bool rb) {red_or_black = rb;} //Sets red_or_black
	
	//OVERLOADS
	friend ostream& operator <<(ostream& out, const Tile& obj); //Output operator
	
private:
	bool occupied; //True if there is a checker on this tile
	bool red_or_black; //True if tile is red, false if tile is black
	Checker* check;
};