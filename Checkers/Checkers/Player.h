#include <cstdlib>
#include <iostream>
using namespace std;

class Player
{
public:
	//CONSTRUCTORS
	Player(); //Default constructor
	
	//ACCESS FUNCTIONS
	int getPieces() {return piecesLeft;}
	int getMoves() {return moves;}
	int getKings() {return kings;}
	int getJumps() {return jumps;}
	
	//MODIFICATION FUNCTIONS
	void losePiece() {piecesLeft--;}
	void addMove() {moves++;}
	void addKing() {kings++;}
	void addJump() {jumps++;}
	
private:
	int piecesLeft;
	int moves;
	int kings;
	int jumps;
};