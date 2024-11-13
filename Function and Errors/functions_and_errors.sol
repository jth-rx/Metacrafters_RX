// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract MyContract {
    // Public variables for ticket system
    string public eventName = "METACRAFTER'S EXPO";
    string public ticketSymbol = "TICKET";
    uint public totalTickets = 0;
    
    // Mapping to store the ticket balances for each attendee
    mapping(address => uint) public ticketBalances;

    // Modifier to check if an attendee has any tickets
    modifier hasTickets(address _attendee) {
        require(ticketBalances[_attendee] > 0, "Attendee has no tickets.");
        _;
    }

    // Mint function to issue new tickets to attendees
    function issueTickets(address _attendee, uint _ticketAmount) public {
        require(_ticketAmount > 0, "Ticket amount must be greater than 0.");

        totalTickets += _ticketAmount;
        ticketBalances[_attendee] += _ticketAmount;

        // Using assert to verify total tickets is not zero after issuing tickets
        assert(totalTickets > 0); 
    }

    // Burn function for attendees to use or cancel tickets
    function useTickets(address _attendee, uint _ticketAmount) public hasTickets(_attendee) {
        require(_ticketAmount > 0, "Ticket amount must be greater than 0.");
        require(ticketBalances[_attendee] >= _ticketAmount, "Not enough tickets to use.");

        ticketBalances[_attendee] -= _ticketAmount;
        totalTickets -= _ticketAmount;

        // Assert to check no underflow occurred in total tickets
        assert(totalTickets >= 0);
    }

    // Function to check the ticket balance of a specific attendee
    function checkTicketBalance(address _attendee) public view returns (uint) {
        return ticketBalances[_attendee];
    }

    // Function to cancel all tickets if the event is postponed or canceled
    function cancelAllTickets() public {
        if (totalTickets == 0) {
            revert("No tickets to cancel.");
        }

        totalTickets = 0;
    }
}
