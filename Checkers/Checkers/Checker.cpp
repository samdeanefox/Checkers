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

void Checker::jumped()
{
	dead = true;
	location = BOARD_SIZE;
}

size_t jump(int space)
{
    return 0;
}

/*ostream& operator <<(ostream& out, const Checker& obj)
{
	if(obj.getColor() == false)
		out << "B";
	else
		out << "R";
	return out;
}*/