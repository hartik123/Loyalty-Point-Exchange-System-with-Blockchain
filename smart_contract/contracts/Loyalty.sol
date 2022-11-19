// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Loyalty{

  address private _owner;
  
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

  constructor()
  {
    _owner = msg.sender;
  }

    struct Transaction{
        
        address sender_address;

        address receiver_address;

        string source_company_name;
        
        string destination_company_name;

        uint8 reward_points;
    }

    struct User{

        address user_address;

        uint8 amazonPoint;

        uint8 flipkartPoint;

        uint8 myntraPoint;

        
    }

    User[] user_array;

    Transaction[] trans_records;

    modifier onlyOwner() 
  {
    require(isOwner(),
    "Function accessible only by the owner !!");
    _;
  }

  function isOwner() public view returns(bool) 
  {
    return msg.sender == _owner;
  }

    function owner() public view returns(address){
        return _owner;
    }


    function addUser(address user_address) onlyOwner payable public{

        User memory usr = User(user_address, 100, 100, 100);

        user_array.push(usr);

    }


    function retrieve_user_index() public view returns(uint8){

        uint8 i=0;
        while(i<user_array.length){
            if(user_array[i].user_address == msg.sender){
                break;
            }
            i++;
        }
        return i;
    }

    function get_user_index(address user_address) public view returns(uint8){

        uint8 i=0;
        while(i<user_array.length){
            if(user_array[i].user_address == user_address){
                return i;
            }
            i++;
        }
        return i;
    }


    function get_address() public view returns(address){

        // uint8 user_idx = get_user_index(msg.sender);
        // return user_array[user_idx].user_address;

        return msg.sender;

    }

    function get_amazonPoint() public view returns(uint8){

        uint8 user_idx = get_user_index(msg.sender);
        require(user_idx<user_array.length, "User Not Allowed");
        return user_array[user_idx].amazonPoint;

    }

    function get_flipkartPoint() public view returns(uint8){

        uint8 user_idx = get_user_index(msg.sender);
        require(user_idx<user_array.length, "User Not Allowed");
        return user_array[user_idx].flipkartPoint;

    }

    function get_myntraPoint() public view returns(uint8){

        uint8 user_idx = get_user_index(msg.sender);
        require(user_idx<user_array.length, "User Not Allowed");
        return user_array[user_idx].myntraPoint;

    }

    function get_allPoints() public view returns(uint8[3] memory){

        uint8 user_idx = get_user_index(msg.sender);

        return [user_array[user_idx].amazonPoint, user_array[user_idx].flipkartPoint, user_array[user_idx].myntraPoint] ;

    }

    function stringsEquals(string memory s1, string memory s2) private pure returns (bool) {
        bytes memory b1 = bytes(s1);
        bytes memory b2 = bytes(s2);
        uint256 l1 = b1.length;
        if (l1 != b2.length) return false;
        for (uint256 i=0; i<l1; i++) {
            if (b1[i] != b2[i]) return false;
        }
        return true;
    }

    function convert_reward_point(string memory source_company_name, string memory destination_company_name, uint8 points_to_convert) public payable{
        uint8 user_idx = get_user_index(msg.sender);
        require(user_idx<user_array.length, "User Not Allowed");
        
        if(stringsEquals(source_company_name, "amazon")){
            require(user_array[user_idx].amazonPoint>=points_to_convert, "Insufficient Amazon Points");
            user_array[user_idx].amazonPoint-=points_to_convert;
        }
        else if (stringsEquals(source_company_name, "flipkart")){
            require(user_array[user_idx].flipkartPoint>=points_to_convert, "Insufficient Flipkart Points");
            user_array[user_idx].flipkartPoint-=points_to_convert;

        }
        else if(stringsEquals(source_company_name, "myntra")){
            require(user_array[user_idx].myntraPoint>=points_to_convert, "Insufficient Myntra Points");
            user_array[user_idx].myntraPoint-=points_to_convert;

        }

        if(stringsEquals(destination_company_name, "amazon")){
            user_array[user_idx].amazonPoint+=points_to_convert;
        }
        else if (stringsEquals(destination_company_name, "flipkart")){
            user_array[user_idx].flipkartPoint+=points_to_convert;

        }
        else if(stringsEquals(destination_company_name, "myntra")){
            user_array[user_idx].myntraPoint+=points_to_convert;
        }

        Transaction memory transaction = Transaction(msg.sender, msg.sender, source_company_name, destination_company_name, points_to_convert);
        trans_records.push(transaction);
    }

    function toString(bytes memory data) public pure returns(string memory) {
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(2 + data.length * 2);
        str[0] = "0";
        str[1] = "x";
        for (uint i = 0; i < data.length; i++) {
            str[2+i*2] = alphabet[uint(uint8(data[i] >> 4))];
            str[3+i*2] = alphabet[uint(uint8(data[i] & 0x0f))];
        }
        return string(str);
}

    function transfer_reward_friend(address receiver, string memory company_name, uint8 points_to_convert) public payable{
        uint8 sender_idx = get_user_index(msg.sender);
        uint8 receiver_idx = get_user_index(receiver);
        
        require(sender_idx<user_array.length, "User Not Allowed");
        require(receiver_idx<user_array.length, "User Not Allowed");

        string memory sender_add_string = toString(abi.encodePacked(user_array[sender_idx].user_address));
        string memory receiver_add_string = toString(abi.encodePacked(user_array[receiver_idx].user_address));

        require(!stringsEquals(sender_add_string, receiver_add_string), "Sender and Receievr address is same");

        if(stringsEquals(company_name, "amazon")){
            require(user_array[sender_idx].amazonPoint>=points_to_convert, "Insufficient Amazon Points");
            user_array[sender_idx].amazonPoint-=points_to_convert;
            user_array[receiver_idx].amazonPoint+=points_to_convert;
        }
        else if (stringsEquals(company_name, "flipkart")){
            require(user_array[sender_idx].flipkartPoint>=points_to_convert, "Insufficient Flipkart Points");
            user_array[sender_idx].flipkartPoint-=points_to_convert;
            user_array[receiver_idx].flipkartPoint+=points_to_convert;
        }
        else if(stringsEquals(company_name, "myntra")){
            require(user_array[sender_idx].myntraPoint>=points_to_convert, "Insufficient Myntra Points");
            user_array[sender_idx].myntraPoint-=points_to_convert;
            user_array[receiver_idx].myntraPoint+=points_to_convert;
        }

        Transaction memory transaction = Transaction(msg.sender, receiver, company_name, company_name, points_to_convert);
        trans_records.push(transaction);

    }

    function get_sender_address_initiated_Transactions() public view returns(Transaction[] memory){
        uint8 count=0;
        uint8 sender_idx = get_user_index(msg.sender);
        address sender_address = user_array[sender_idx].user_address;

        for(uint8 i=0; i<trans_records.length; i++){
        string memory sender_add_string = toString(abi.encodePacked(sender_address));
        string memory trans_sender_add_string = toString(abi.encodePacked(trans_records[i].sender_address));
        if(stringsEquals(sender_add_string, trans_sender_add_string)){
            count+=1;
        }
        }

        Transaction[] memory filteredReverseTransaction = new Transaction[](count);
        
        
        for(uint8 i=0; i<trans_records.length; i++){
        string memory sender_add_string = toString(abi.encodePacked(sender_address));
        string memory trans_sender_add_string = toString(abi.encodePacked(trans_records[i].sender_address));
        if(stringsEquals(sender_add_string, trans_sender_add_string)){
            filteredReverseTransaction[--count] = trans_records[i];             
        }
        }

        return filteredReverseTransaction;
    }

    function get_AllTransaction_Count() public view returns(uint256){
        return trans_records.length;
        
    }
}