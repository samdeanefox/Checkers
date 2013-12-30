// Javascript

// LINK WITH PARSE.COM API KEYS
Parse.initialize("8pRJ7tQFOoZYFwQyqJWFxuO8evvxpi9ZCuFVZfC6", "gBhVcuY3XviNWdXzVFRqsUmZ7todV5zuuvYcdKMa");

// C++ Code

// main.cpp

/*
 
 TO DO:
 -fix single jump validation bugs
 -Double jumps
 -triple jumps
 
 
 
 BOARD MAP
 
 [0 ] [1 ] [2 ] [3 ] [4 ] [5 ] [6 ] [7 ]  Red(true, player 1) starts here
 
 [8 ] [9 ] [10] [11] [12] [13] [14] [15]
 
 [16] [17] [18] [19] [20] [21] [22] [23]
 
 [24] [25] [26] [27] [28] [29] [30] [31]
 
 [32] [33] [34] [35] [36] [37] [38] [39]
 
 [40] [41] [42] [43] [44] [45] [46] [47]
 
 [48] [49] [50] [51] [52] [53] [54] [55]
 
 [56] [57] [58] [59] [60] [61] [62] [63] Black(false, player 0) starts here
 
 */


/*
#include "Tile.h"
#include "Player.h"
#include <iostream>
using namespace std;

int main ()
{
	//DECLARATIONS
	Tile board[BOARD_SIZE]; //Board represented as an array of tiles
	Player red; //Player 1
	Player black; //Player 2
	bool whoseTurn = true; //true is red, false is black
	int from; //Stores user's menu selection
	int to; //Stores user's menu selection
	bool gameOver = false; //True when game ends
	bool goAgain = false; //Used for input validation
    bool goBack = false; //Used when a player wants to re-do a move
    int userSelection = 0; //For user to select menu items
    int jumpChecker1 = 0; //To mark a jumped checker
    //  int jumpChecker2 = 0; //To mark a jumped checker (double jump)
    //  int jumpChecker3 = 0; //To mark a jumped checker (triple jump)
	
	//INITIALIZE THE BOARD
	int align = 1;
	for(int i = 0; i < BOARD_SIZE; i++)
	{
        //Set tile numbers
        board[i].setNumber(i);
        
		//Manage alignment
		if(i == 8 || i == 24 || i == 40 || i == 56)
			align = 2;
		if(i == 0 || i == 16 || i == 32 || i == 48)
			align = 1;
		
		//Set tile color
		if(i % 2 == 0)
		{
			if(align == 1)
				board[i].setColor(true);
			else
				board[i].setColor(false);
		}
		else
		{
			if(align == 1)
				board[i].setColor(false);
			else
				board[i].setColor(true);
		}
		
		//Add red checkers
		if((i >= 0) && (i <= 23) && (board[i].getColor() == true))
		{
			board[i].setChecker(new Checker(true, i));
			//cout << "\n" << board[i].getChecker()->getColor() << " " << i;
		}
		
		//Add black checkers
		if((i >= 40) && (i <= 63) && (board[i].getColor() == true))
		{
			board[i].setChecker(new Checker(false, i));
			//cout << "\n" << board[i].getChecker()->getColor() << " " << i;
		}
	}
	
	//GAMEPLAY
	do
	{
		//PRINT BOARD
		cout << "\n\n\n0    ";
		for(int i = 0; i < BOARD_SIZE; i++)
		{
			//To see pieces
			cout << board[i];
			
			//To see numbers instead of pieces
			/*cout << "[" << i << "] ";
             if(i < 10)
             cout << " ";*/
			if(i% 8 == 7)
			{
				cout << "   " << i << "\n\n";
				if(i != 63)
				{
					cout << i + 1 << "   ";
					if(i == 7)
						cout << " ";
				}
			}
		}
		
		//GET INFO FROM USER
		cout << "\nPlayer " << whoseTurn << ", your turn!";
        
        do
        {
            //GET WHETHER IT IS A JUMP OR REGULAR MOVE
            do
            {
                cout << "\nEnter 0 to move, 1 for a single jump, 2 for a double jump, or 3 for a triple jump\n";
                cin >> userSelection;
                if(userSelection != 0 && userSelection != 1 && userSelection != 2 && userSelection != 3)
                    cout << "\nEnter 0, 1, 2, or 3\n";
            }
            while (userSelection != 0 && userSelection != 1 && userSelection != 2 && userSelection != 3);
            
            //GET CHECKER
            do
            {
                goBack = false;
                cout << "\nWhich piece? (Enter -1 to go back)\n";
                cin >> from;
                if(from == -1)
                {
                    goBack = true;
                    goAgain = false;
                    userSelection = -1;
                }
                else if(from < 0 || from >= BOARD_SIZE || board[from].getChecker() == NULL || (board[from].getChecker())->getColor() != whoseTurn)
                {
                    goBack = false;
                    cout << "\nInvalid space number\n";
                    goAgain = true;
                }
                
                //VALIDATE IF PIECE CAN BE MOVED
                //REGULAR MOVE
                else if(userSelection == 0)
                {
                    //If checker is a king
                    if(board[from].getChecker()->isKing() == true)
                    {
                        //If it is on the back edge
                        if(from > 55)
                        {
                            //Middle board
                            if(from % 8 != 0 && from % 8 != 7)
                            {
                                if(board[from - 9].isOccupied() == true && board[from - 7].isOccupied() == true)
                                {
                                    cout << "\nThis piece cannot be moved\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                            //Left edge
                            else if(from % 8 == 0)
                            {
                                if(board[from - 7].isOccupied() == true)
                                {
                                    cout << "\nThis piece cannot be moved\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                            //Right edge
                            else
                            {
                                if(board[from - 9].isOccupied() == true)
                                {
                                    cout << "\nThis piece cannot be moved\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                        }
                        
                        //If it is on the front edge
                        else if(from < 8)
                        {
                            //Middle board
                            if(from % 8 != 0 && from % 8 != 7)
                            {
                                if(board[from + 9].isOccupied() == true && board[from + 7].isOccupied() == true)
                                {
                                    cout << "\nThis piece cannot be moved\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                            //Left edge
                            else if(from % 8 == 0)
                            {
                                if(board[from + 9].isOccupied() == true)
                                {
                                    cout << "\nThis piece cannot be moved\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                            //Right edge
                            else
                            {
                                if(board[from + 7].isOccupied() == true)
                                {
                                    cout << "\nThis piece cannot be moved\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                        }
                        
                        //Neither front nor back edge
                        else
                        {
                            //Middle board
                            if(from % 8 != 0 && from % 8 != 7)
                            {
                                if(board[from + 7].isOccupied() == true && board[from - 7].isOccupied() == true && board[from + 9].isOccupied() == true && board[from - 9].isOccupied() == true)
                                {
                                    cout << "\nThis piece cannot be moved\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                            //Left edge
                            else if(from % 8 == 0)
                            {
                                if(board[from - 7].isOccupied() == true && board[from + 9].isOccupied() == true)
                                {
                                    cout << "\nThis piece cannot be moved\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                            //Right edge
                            else
                            {
                                if(board[from - 9].isOccupied() == true && board[from + 7].isOccupied() == true)
                                {
                                    cout << "\nThis piece cannot be moved\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                        }
                    }
                    
                    //If checker is not a king
                    else
                    {
                        //Red's turn, middle board, not king
                        if(whoseTurn == true && from % 8 != 0 && from % 8 != 7 && (board[from].getChecker())->isKing() == false && board[from + 9].isOccupied() == true && board[from + 7].isOccupied() == true)
                        {
                            cout << "\nThis piece cannot be moved\n";
                            goAgain = true;
                        }
                        //Black's turn, middle board, not king
                        else if(whoseTurn == false && from % 8 != 0 && from % 8 != 7 && (board[from].getChecker())->isKing() == false && board[from - 9].isOccupied() == true && board[from - 7].isOccupied() == true)
                        {
                            cout << "\nThis piece cannot be moved\n";
                            goAgain = true;
                        }
                        //Red's turn, left edge, not king
                        else if(whoseTurn == true && from % 8 == 0 && (board[from].getChecker())->isKing() == false && board[from + 9].isOccupied() == true)
                        {
                            cout << "\nThis piece cannot be moved\n";
                            goAgain = true;
                        }
                        //Red's turn, right edge, not king
                        else if(whoseTurn == true && from % 8 == 7 && (board[from].getChecker())->isKing() == false && board[from + 7].isOccupied() == true)
                        {
                            cout << "\nThis piece cannot be moved\n";
                            goAgain = true;
                        }
                        //Black's turn, left edge, not king
                        else if(whoseTurn == false && from % 8 == 0 && (board[from].getChecker())->isKing() == false && board[from - 7].isOccupied() == true)
                        {
                            cout << "\nThis piece cannot be moved\n";
                            goAgain = true;
                        }
                        //Black's turn, right edge, not king
                        else if(whoseTurn == false && from % 8 == 7 && (board[from].getChecker())->isKing() == false && board[from - 9].isOccupied() == true)
                        {
                            cout << "\nThis piece cannot be moved\n";
                            goAgain = true;
                        }
                        //Valid piece
                        else
                        {
                            goAgain = false;
                        }
                    }
                }
                //SINGLE JUMP
                else if(userSelection == 1)
                {
                    //If checker is a king
                    if(board[from].getChecker()->isKing())
                    {
                        //Back edge
                        if(from > 55)
                        {
                            //Middle Board
                            if(from % 8 != 0 && from % 8 != 7 && from % 8 != 1 && from % 8 != 6)
                            {
                                
                            }
                            //Left Edge
                            else if(from % 8 == 0 || from % 8 == 1)
                            {
                                
                            }
                            //Right Edge
                            else
                            {
                                
                            }
                        }
                        //Front edge
                        else if(from < 8)
                        {
                            //Middle board
                            if(from % 8 != 0 && from % 8 != 7 && from % 8 != 1 && from % 8 != 6)
                            {
                                
                            }
                            //Left Edge
                            else if(from % 8 == 0 || from % 8 == 1)
                            {
                                
                            }
                            //Right Edge
                            else
                            {
                                
                            }
                        }
                        //Neither front not back edge
                        else
                        {
                            //Middle Board
                            if(from % 8 != 0 && from % 8 != 7 && from % 8 != 1 && from % 8 != 6)
                            {
                                if(board[from + 14].isOccupied() == true && board[from + 18].isOccupied() == true && board[from - 14].isOccupied() == true && board[from - 18].isOccupied() == true)
                                {
                                    cout << "\nNo jump can be made by this checker\n";
                                    goAgain = true;
                                }
                                else if((board[from + 9].getChecker() == NULL || board[from + 9].getChecker()->getColor() == whoseTurn) && (board[from + 7].getChecker() == NULL || board[from + 7].getChecker()->getColor() == whoseTurn) && (board[from - 9].getChecker() == NULL || board[from - 9].getChecker()->getColor() == whoseTurn) && (board[from - 7].getChecker() == NULL || board[from - 7].getChecker()->getColor() == whoseTurn))
                                {
                                    cout << "\nNo jump can be made by this checker\n";
                                    goAgain = true;
                                }
                            }
                            //Left Edge
                            else if(from % 8 == 0 || from % 8 == 1)
                            {
                                
                            }
                            //Right Edge
                            else
                            {
                                
                            }
                        }
                    }
                    
                    //If checker is not a king
                    else if(!(board[from].getChecker()->isKing()))
                    {
                        //Red's turn
                        if(whoseTurn == true)
                        {
                            //Far enough from edge that there are possible jumps in either direction
                            if(from % 8 != 7 && from % 8 != 6 && from % 8 != 0 && from % 8 != 1)
                            {
                                if(board[from + 14].isOccupied() == true && board[from + 18].isOccupied() == true)
                                {
                                    cout << "\nNo jump can be made by this checker\n";
                                    goAgain = true;
                                }
                                else if((board[from + 9].getChecker() == NULL || board[from + 9].getChecker()->getColor() == whoseTurn) && (board[from + 7].getChecker() == NULL || board[from + 7].getChecker()->getColor() == whoseTurn))
                                {
                                    cout << "\nNo jump can be made by this checker\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                            //Only a left jump is possible
                            else if(from % 8 == 7 || from % 8 == 6)
                            {
                                if(board[from + 14].isOccupied() == true)
                                {
                                    cout << "\nNo jump can be made by this checker\n";
                                    goAgain = true;
                                }
                                else if(board[from + 14].isOccupied() == false && (board[from + 7].getChecker() == NULL || board[from + 7].getChecker()->getColor() == whoseTurn))
                                {
                                    cout << "\nNo jump can be made by this checker\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                            //Only a right jump is possible
                            else if(from % 8 == 0 || from % 8 == 1)
                            {
                                if(board[from + 18].isOccupied() == true)
                                {
                                    cout << "\nNo jump can be made by this checker\n";
                                    goAgain = true;
                                }
                                else if(board[from + 18].isOccupied() == false && (board[from + 9].getChecker() == NULL || board[from + 9].getChecker()->getColor() == whoseTurn))
                                {
                                    cout << "\nNo jump can be made by this checker\n";
                                    goAgain = true;
                                }
                                else
                                {
                                    goAgain = false;
                                }
                            }
                        }
                        
                        //Black's turn
                        if(whoseTurn == false)
                        {
                            //Far enough from edge that there are possible jumps in either direction
                            if(from % 8 != 7 && from % 8 != 6 && from % 8 != 0 && from % 8 != 1)
                            {
                                if(board[from - 14].isOccupied() == true && board[from - 18].isOccupied() == true)
                                {
                                    cout << "\nNo jump can be made by this checker\n";
                                    goAgain = true;
                                }
                                else if((board[from - 9].getChecker() == NULL || board[from - 9].getChecker()->getColor() == whoseTurn) && (board[from - 7].getChecker() == NULL || board[from - 7].getChecker()->getColor() == whoseTurn))
                                {
                                    cout << "\nNo jump can be made by this checker\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                            //Only a right jump is possible
                            else if(from % 8 == 0 || from % 8 == 1)
                            {
                                if(board[from - 14].isOccupied() == true)
                                {
                                    cout << "\nNo jump can be made by this checker\n";
                                    goAgain = true;
                                }
                                else if(board[from - 14].isOccupied() == false && (board[from - 7].getChecker() == NULL || board[from - 7].getChecker()->getColor() == whoseTurn))
                                {
                                    cout << "\nNo jump can be made by this checker\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                            //Only a left jump is possible
                            else if(from % 8 == 6 || from % 8 == 7)
                            {
                                if(board[from - 18].isOccupied() == true)
                                {
                                    cout << "\nNo jump can be made by this checker\n";
                                    goAgain = true;
                                }
                                else if(board[from - 18].isOccupied() == false && (board[from - 9].getChecker() == NULL || board[from - 9].getChecker()->getColor() == whoseTurn))
                                {
                                    cout << "\nNo jump can be made by this checker\n";
                                    goAgain = true;
                                }
                                else
                                {
                                    goAgain = false;
                                }
                            }
                        }
                    }
                }
                else
                {
                    goAgain = false;
                }
            }
            while(goAgain == true);
            
            //REGULAR MOVE
            if(userSelection == 0)
            {
                do
                {
                    goBack = false;
                    cout << "\nTo which space? (Enter -1 to go back)\n";
                    cin >> to;
                    if(to == -1)
                    {
                        goBack = true;
                        goAgain = false;
                        userSelection = -1;
                    }
                    else if(to < 0 || to >= BOARD_SIZE)
                    {
                        cout << "\nInvalid space number\n";
                        goAgain = true;
                    }
                    
                    //VALIDATE DESTINATION SPACE
                    //If checker is a king
                    else if(board[from].getChecker()->isKing() == true)
                    {
                        //If it is on the back edge
                        if(from > 55)
                        {
                            //Middle board
                            if(from % 8 != 0 && from % 8 != 7)
                            {
                                if(!(to == from - 9 || to == from - 7) || board[to].isOccupied() == true)
                                {
                                    cout << "\nThe piece cannot be moved here\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                            //Left edge
                            else if(from % 8 == 0)
                            {
                                if(to != from - 7 || board[to].isOccupied() == true)
                                {
                                    cout << "\nThe piece cannot be moved here\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                            //Right edge
                            else
                            {
                                if(to != from - 9 || board[to].isOccupied() == true)
                                {
                                    cout << "\nThe piece cannot be moved here\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                        }
                        //If it is on the front edge
                        else if(from < 8)
                        {
                            //Middle board
                            if(from % 8 != 0 && from % 8 != 7)
                            {
                                if(!(to == from + 9 || to == from + 7) || board[to].isOccupied() == true)
                                {
                                    cout << "\nThe piece cannot be moved here\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                            //Left edge
                            else if(from % 8 == 0)
                            {
                                if(to != from + 9 || board[to].isOccupied() == true)
                                {
                                    cout << "\nThe piece cannot be moved here\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                            //Right edge
                            else
                            {
                                if(to != from + 7 || board[to].isOccupied() == true)
                                {
                                    cout << "\nThe piece cannot be moved here\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                        }
                        //If it is neither on the front or back edge
                        else
                        {
                            //Middle board
                            if(from % 8 != 0 && from % 8 != 7)
                            {
                                if(!(to == from + 9 || to == from - 9 || to == from + 7 || to == from - 7) || board[to].isOccupied() == true)
                                {
                                    cout << "\nThe piece cannot be moved here\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                            //Left edge
                            else if(from % 8 == 0)
                            {
                                if(!(to == from - 7 || to == from + 9) || board[to].isOccupied() == true)
                                {
                                    cout << "\nThe piece cannot be moved here\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                            //Right edge
                            else
                            {
                                if(!(to == from + 7 || to == from - 9) || board[to].isOccupied() == true)
                                {
                                    cout << "\nThe piece cannot be moved here\n";
                                    goAgain = true;
                                }
                                else
                                    goAgain = false;
                            }
                        }
                    }
                    
                    //If checker is not a king
                    else
                    {
                        //Red's turn, middle board, not king
                        if(whoseTurn == true && from % 8 != 0 && from % 8 != 7 && (board[from].getChecker())->isKing() == false)
                        {
                            if(!(to == from + 9 || to == from + 7) || board[to].isOccupied() == true)
                            {
                                cout << "\nThe piece cannot be moved here\n";
                                goAgain = true;
                            }
                            else
                                goAgain = false;
                        }
                        //Black's turn, middle board, not king
                        else if(whoseTurn == false && from % 8 != 0 && from % 8 != 7 && (board[from].getChecker())->isKing() == false)
                        {
                            if(!(to == from - 9 || to == from - 7) || board[to].isOccupied())
                            {
                                cout << "\nThe piece cannot be moved here\n";
                                goAgain = true;
                            }
                            else
                                goAgain = false;
                        }
                        //Red's turn, left edge, not king
                        else if(whoseTurn == true && from % 8 == 0 && (board[from].getChecker())->isKing() == false)
                        {
                            if(to != from + 9 || board[to].isOccupied())
                            {
                                cout << "\nThe piece cannot be moved here\n";
                                goAgain = true;
                            }
                            else
                                goAgain = false;
                        }
                        //Red's turn, right edge, not king
                        else if(whoseTurn == true && from % 8 == 7 && (board[from].getChecker())->isKing() == false)
                        {
                            if(to != from + 7 || board[to].isOccupied())
                            {
                                cout << "\nThe piece cannot be moved here\n";
                                goAgain = true;
                            }
                            else
                                goAgain = false;
                        }
                        //Black's turn, left edge, not king
                        else if(whoseTurn == false && from % 8 == 0 && (board[from].getChecker())->isKing() == false)
                        {
                            if(to != from - 7 || board[to].isOccupied())
                            {
                                cout << "\nThe piece cannot be moved here\n";
                                goAgain = true;
                            }
                            else
                                goAgain = false;
                        }
                        //Black's turn, right edge, not king
                        else if(whoseTurn == false && from % 8 == 7 && (board[from].getChecker())->isKing() == false)
                        {
                            if(to != from - 9 || board[to].isOccupied())
                            {
                                cout << "\nThe piece cannot be moved here\n";
                                goAgain = true;
                            }
                            else
                            {
                                goAgain = false;
                            }
                        }
                    }
                }
                while(goAgain == true);
                
                //MOVE PIECE
                //Tile
                board[to].setChecker(board[from].getChecker());
                board[from].makeEmpty();
                //Checker
                board[to].getChecker()->move(to);
            }
            
            //SINGLE JUMP
            if(userSelection == 1)
            {
                do
                {
                    //If it is red's turn
                    if(whoseTurn == true)
                    {
                        //Get the destination space
                        goBack = false;
                        cout << "\nOn which space will the checker land? (Enter -1 to go back)\n";
                        cin >> to;
                        if(to == -1)
                        {
                            goBack = true;
                            goAgain = false;
                            userSelection = -1;
                        }
                        else if(to < 0 || to >= BOARD_SIZE)
                        {
                            cout << "\nInvalid space number\n";
                            goAgain = true;
                        }
                        //Make sure this is a proper move
                        else if(!(to == from + 18 || to == from + 14) || board[to].isOccupied() == true)
                        {
                            cout << "\nThe piece cannot be moved here\n";
                            goAgain = true;
                        }
                        //Mark the index of the (currently hypothetical) checker to be jumped
                        else if (to == from + 18)
                        {
                            jumpChecker1 = from + 9;
                            goAgain = false;
                        }
                        else if (to == from + 14)
                        {
                            jumpChecker1 = from + 7;
                            goAgain = false;
                        }
                    }
                    //If it is black's turn
                    if(whoseTurn == false)
                    {
                        //Get the destination space
                        goBack = false;
                        cout << "\nOn which space will the checker land? (Enter -1 to go back)\n";
                        cin >> to;
                        if(to == -1)
                        {
                            goBack = true;
                            goAgain = false;
                            userSelection = -1;
                        }
                        else if(to < 0 || to >= BOARD_SIZE)
                        {
                            cout << "\nInvalid space number\n";
                            goAgain = true;
                        }
                        
                        //Make sure this is a proper move
                        else if(!(to == from - 18 || to == from - 14) || board[to].isOccupied() == true)
                        {
                            cout << "\nThe piece cannot be moved here\n";
                            goAgain = true;
                        }
                        
                        //Mark the index of the (currently hypothetical) checker to be jumped
                        else if (to == from - 18)
                        {
                            jumpChecker1 = from - 9;
                            goAgain = false;
                        }
                        else if (to == from - 14)
                        {
                            jumpChecker1 = from - 7;
                            goAgain = false;
                        }
                    }
                }
                while(goAgain == true);
                
                if(goBack == false)
                {
                    do
                    {
                        //If it is red's turn
                        if(whoseTurn == true)
                        {
                            //Make sure the checker is not trying to jump past an edge
                            if((jumpChecker1 == from + 9 && jumpChecker1 % 8 == 7) || (jumpChecker1 == from + 7 && jumpChecker1 % 8 == 0))
                            {
                                cout << "\nThe piece cannot be moved here\n";
                                goAgain = true;
                            }
                            
                            //Make sure the checker itself is not on an edge
                            else if((from % 8 == 7 && to == from + 9) || (from % 8 == 0 && to == from + 7))
                            {
                                cout << "\nThe piece cannot be moved here\n";
                                goAgain = true;
                            }
                            
                            //Validate whether there is a checker to be jumped
                            else if(board[jumpChecker1].isOccupied() == false || board[jumpChecker1].getChecker()->getColor() == whoseTurn)
                            {
                                cout << "\nNo piece can be jumped here\n";
                                goAgain = true;
                            }
                            
                            else
                                goAgain = false;
                        }
                        //If it is black's turn
                        if(whoseTurn == false)
                        {
                            //Make sure the checker is not trying to jump past an edge
                            if((jumpChecker1 == from - 9 && jumpChecker1 % 8 == 0) || (jumpChecker1 == from - 7 && jumpChecker1 % 8 == 7))
                            {
                                cout << "\nThe piece cannot be moved here\n";
                                goAgain = true;
                            }
                            
                            //Make sure the checker itself is not on an edge
                            else if((from % 8 == 0 && to == from - 9) || (from % 8 == 7 && to == from - 7))
                            {
                                cout << "\nThe piece cannot be moved here\n";
                                goAgain = true;
                            }
                            
                            //Validate whether there is a checker to be jumped
                            else if(board[jumpChecker1].isOccupied() == false || board[jumpChecker1].getChecker()->getColor() == whoseTurn)
                            {
                                cout << "\nNo piece can be jumped here\n";
                                goAgain = true;
                            }
                            
                            else
                            {
                                goAgain = false;
                            }
                        }
                    }
                    while (goAgain == true);
                    
                    
                    //MOVE PIECE
                    //Tile
                    board[to].setChecker(board[from].getChecker());
                    board[from].makeEmpty();
                    //Checker
                    board[to].getChecker()->move(to);
                    //Kill jumped chcker
                    board[jumpChecker1].getChecker()->kill();
                    board[jumpChecker1].makeEmpty();
                    //Tally player info
                    if(whoseTurn == true)
                    {
                        black.losePiece();
                        red.addJump();
                    }
                    else
                    {
                        red.losePiece();
                        black.addJump();
                    }
                }
            }
            
            //DOUBLE JUMP
            
            //TRIPLE JUMP
		}
        while(goBack == true);
        
		//TALLY THE MOVE
        if(whoseTurn == true)
            red.addMove();
        else
            black.addMove();
        
        //KING THE PIECE IF APPLICABLE
        if(whoseTurn == true && to > 55)
        {
            board[to].getChecker()->setKing(true);
            cout << "\nKing me!\n";
        }
        if(whoseTurn == false && to < 8)
        {
            board[to].getChecker()->setKing(true);
            cout << "\nKing me!\n";
        }
        
        
		//SWITCH TO OTHER PLAYER
		if(whoseTurn)
			whoseTurn = false;
		else
			whoseTurn = true;
		
		//END GAME IF SOMEONE IS OUT OF PIECES
		if(red.getPieces() == 0 || black.getPieces() == 0)
        {
			gameOver = true;
            
            //Print final board
            cout << "\n\n\n0    ";
            for(int i = 0; i < BOARD_SIZE; i++)
            {
                cout << board[i];
                if(i% 8 == 7)
                {
                    cout << "   " << i << "\n\n";
                    if(i != 63)
                    {
                        cout << i + 1 << "   ";
                        if(i == 7)
                            cout << " ";
                    }
                }
            }
            
            //Congratulate
            if(red.getPieces() == 0)
                cout << "\nBlack, you win!\n";
            else
                cout << "\nRed, you win!\n";
            
            cout << "\n\nRed:"
            << "\nNumber of moves: " << red.getMoves()
            << "\nJumps: " << red.getJumps()
            << "\nKings: " << red.getKings()
            << "\nPieces left: " << red.getPieces();
            
            cout << "\n\nBlack:"
            << "\nNumber of moves: " << black.getMoves()
            << "\nJumps: " << black.getJumps()
            << "\nKings: " << black.getKings()
            << "\nPieces left: " << black.getPieces();
        }
	}
	while(!gameOver);
	
    return 0;
}
*/