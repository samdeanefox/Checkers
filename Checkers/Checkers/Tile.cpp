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