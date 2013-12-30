// Javascript

// LINK WITH PARSE.COM API KEYS
Parse.initialize("8pRJ7tQFOoZYFwQyqJWFxuO8evvxpi9ZCuFVZfC6", "gBhVcuY3XviNWdXzVFRqsUmZ7todV5zuuvYcdKMa");

// C++ Code

/*

 // Checker.h
 
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
 void setKing(bool k) {king = k;} //Sets king value
 
 //OVERLOADS
 //	friend ostream& operator <<(ostream& out, const Checker& obj); //Output operator
 
 private:
 bool red_or_black; //True if checker is red, false if checker is black
 size_t location; //Current location of checker, equals BOARD_SIZE if checker is dead
 bool king; //True if check has been kinged (affects movement of checker)
 bool dead; //True if checker has died
 };
 #endif
 
 // Checker.cpp
 
 #include "Checker.h"
 
 Checker::Checker()
 {
 red_or_black = true;
 location = 0;
 king = false;
 dead = false;
 }
 
 Checker::Checker(bool r_or_b, size_t loc)
 {
 red_or_black = r_or_b;
 location = loc;
 king = false;
 dead = false;
 }
 
 bool Checker::validMove(size_t space) const
 {
 if(space >= BOARD_SIZE)
 return false;
 
 //If not kinged
 if(!king)
 {
 //If red (top-down)
 if(red_or_black == true)
 {
 //If the checker is on the LEFT edge of the board
 if(location % 8 == 0)
 {
 if(space == location + 9)
 return true;
 else
 return false;
 }
 //If the checker is on the RIGHT edge of the board
 else if(location % 8 == 7)
 {
 if(space == location + 7)
 return true;
 else
 return false;
 }
 //Otherwise...
 else
 {
 if((space == location + 9) || (space == location + 7))
 return true;
 else
 return false;
 }
 }
 
 //If black (bottom-up)
 if(red_or_black == false)
 {
 //If the checker is on the LEFT edge of the board
 if(location % 8 == 0)
 {
 if(space == location - 7)
 return true;
 else
 return false;
 }
 //If the checker is on the RIGHT edge of the board
 else if(location % 8 == 7)
 {
 if(space == location - 9)
 return true;
 else
 return false;
 }
 //Otherwise...
 else
 {
 if((space == location - 7) || (space == location - 9))
 return true;
 else
 return false;
 }
 }
 }
 
 //If kinged
 if(king)
 {
 //If the checker is on the LEFT edge of the board
 if(location % 8 == 0)
 {
 if((space == location + 9) || (space == location - 7))
 return true;
 else
 return false;
 }
 //If the checker is on the RIGHT edge of the board
 else if(location % 8 == 7)
 {
 if((space == location - 9) || (space == location + 7))
 return true;
 else
 return false;
 }
 //Otherwise...
 else
 {
 if((space == location + 9) || (space == location - 7) || (space == location - 9) || (space == location + 7))
 return true;
 else
 return false;
 }
 }
 return false;
 }
 
 void Checker::move(size_t space)
 {
 if(validMove(space))
 location = space;
 }
 
 void Checker::kill()
 {
 dead = true;
 location = BOARD_SIZE;
 }
 
 /*ostream& operator <<(ostream& out, const Checker& obj)
 {
 if(obj.getColor() == false)
 out << "B";
 else
 out << "R";
 return out;
 }*/

*/