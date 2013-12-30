// Javascript

// LINK WITH PARSE.COM API KEYS
Parse.initialize("8pRJ7tQFOoZYFwQyqJWFxuO8evvxpi9ZCuFVZfC6", "gBhVcuY3XviNWdXzVFRqsUmZ7todV5zuuvYcdKMa");

// C++ Code

/*

// Tile.h

 #ifndef TILE_H
 #define TILE_H
 
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
 int getNumber() const {return tileNumber;} //Returns tileNumber
 
 //MODIFICATION FUNCTIONS
 void setChecker(Checker* c); //Sets check pointer to checker and occupied to true
 void makeEmpty(); //Sets check to null and occupied to false
 void setColor(bool rb) {red_or_black = rb;} //Sets red_or_black
 void setNumber(int num) {tileNumber = num;} //Sets tileNumber
 
 //OVERLOADS
 friend ostream& operator <<(ostream& out, const Tile& obj); //Output operator
 
 private:
 bool occupied; //True if there is a checker on this tile
 bool red_or_black; //True if tile is red, false if tile is black
 int tileNumber; //Number tile on the board
 Checker* check;
 };
 #endif

// Tile.cpp

 #include "Tile.h"
 
 Tile::Tile()
 {
 occupied = false;
 red_or_black = true; //True if tile is red, false if tile is black
 check = NULL;
 tileNumber = 0;
 }
 
 void Tile::setChecker(Checker* c)
 {
 check = c;
 if(check != NULL)
 occupied = true;
 if(check == NULL)
 occupied = false;
 }
 
 void Tile::makeEmpty()
 //To avoid memory leak, this must be used directly after setChecker() has moved checker to another tile
 {
 check = NULL;
 occupied = false;
 }
 
 ostream& operator <<(ostream& out, const Tile& obj)
 {
 if(obj.isOccupied() == false)
 {
 if(obj.getColor() == true)
 out << "[ ] ";
 else
 out << "< > ";
 }
 
 else
 {
 if((obj.check)->getColor() == true)
 {
 if(obj.getColor() == true)
 {
 if((obj.check)->isKing())
 out << "[k] ";
 else
 out << "[R] ";
 }
 else
 {
 if((obj.check)->isKing())
 out << "<K> ";
 else
 out << "<B> ";
 }
 }
 else
 {
 if(obj.getColor() == true)
 {
 if((obj.check)->isKing())
 out << "[K] ";
 else
 out << "[B] ";
 }
 else
 {
 if((obj.check)->isKing())
 out << "<K> ";
 else
 out << "<B> ";
 }
 }
 }
 return out;
 }
 
*/