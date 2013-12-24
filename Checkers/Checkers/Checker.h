#ifndef CHECKER_H
#define CHECKER_H

#include <cstdlib>
#include <iostream>
using namespace std;

const size_t BOARD_SIZE = 64; //Number of tiles on board, currently only functional at 64
class Checker
{
public:
	//CONSTRUCTOR
	Checker(); //Default constructor (not reccomended)
	Checker(bool r_or_b, size_t loc); //Initializes checker as red or black, and gives it a location
	
	//ACCESS FUNCTIONS
	bool getColor() const {return red_or_black;} //Returns checker color
	size_t getLocation() const {return location;} //Returns checker location
	bool isKing() const {return king;} //Returns whether checker has been kinged
	bool isDead() const {return dead;} //Returns whether checker is dead
	bool validMove(size_t space) const; //True if checker can be moved to space
	
	//MODIFICATION FUNCTIONS
	void move(size_t space); //Moves checker to space if space is valid
	void kill(); //Sets dead to true and location to BOARD_SIZE when checker is jumped
	
	//OVERLOADS
//	friend ostream& operator <<(ostream& out, const Checker& obj); //Output operator
	
private:
	bool red_or_black; //True if checker is red, false if checker is black
	size_t location; //Current location of checker, equals BOARD_SIZE if checker is dead
	bool king; //True if check has been kinged (affects movement of checker)
	bool dead; //True if checker has died
};
#endif