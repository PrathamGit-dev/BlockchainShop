//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @title Voting with delegation.
contract BlockMarket {

// This declares a new complex type which will
// be used for variables later.
// It will represent a single voter.
    struct Customer {
        string name; //name of the customer
        string phone; // phone no of the customer
        uint visit_count; // index of the voted proposal
        uint amount;
        Cart cart;
    }

    struct Item{
        string item_code;
        uint price;
        uint entities;
        uint new_item;
        //uint MRP; //this would differentiate between two same objects having different MRPs
    }

    struct Cart{
        string[] items_bought;
        uint[] price;
        uint[] quantity;
        uint total_cost_cart;
        // uint date; //add details from the block timestamp
    }



    address public shopowner;
    mapping(address => Customer) public customers; //maps customer address to Customer struct
    mapping(string => Item) public items; //maps item code to Item struct
    string[] public items_array;
    uint items_length;
    // Customer[] public proposals;
    mapping(address => mapping(uint => uint)) public customer_bill_itemcount;
    mapping(address => mapping(uint => string[])) public customer_bill_itemcode; //maps customer to its items
    mapping(address => mapping(uint => uint[])) public customer_bill_itemprice; //maps customer to its items price
    mapping(address => mapping(uint => uint[])) public customer_bill_itemquantity; //maps customer to its items quantity
    mapping(address => mapping(uint => uint)) public customer_bill_timestamp; //maps customer to its timestamp

    constructor() {
        shopowner = msg.sender;
    }


    function Time_call() public view returns (uint256){
        return block.timestamp;
    }

    function view_Shop(uint index) public view returns(string memory, uint, uint){
        require(index < items_array.length, "Item not present");
        return (items[items_array[index]].item_code, items[items_array[index]].price, items[items_array[index]].entities);
    }


    function itemNos() public view returns(uint){
        return items_length;
    }

    function addnewItem(string memory itemcode_, uint price_, uint entities_) external payable {
        require(msg.sender == shopowner, "You need to own this shop");
        require(items[itemcode_].new_item == 0, "This item was added already");
        items[itemcode_].item_code = itemcode_;
        items[itemcode_].price = price_;
        items[itemcode_].entities = entities_;
        items[itemcode_].new_item = 1;
        items_array.push(itemcode_);
        items_length = items_length + 1;
    } 

    function updatequantity(string memory itemcode_, uint price_, uint entities_) external payable {
        require(msg.sender == shopowner, "You need to own this shop");
        require(items[itemcode_].new_item == 1, "This is a new item. You have to update it in addnewItem");
        require(price_ > 0, "Price can't be negative");
        require(entities_ > 0, "Entities can't be negative");
        items[itemcode_].price = price_;
        uint current_entities = items[itemcode_].entities;
        items[itemcode_].entities = current_entities + entities_;
    }




   //Handling customers
    function addCustomer(string memory name_, string memory phone_) external payable {
        address customer_ = msg.sender;
        require(customers[customer_].visit_count == 0, "The customer is already added. You can continue billing");
        // dates.  date to be added from block timesamp
        customers[customer_].name = name_;
        customers[customer_].phone = phone_;
        customers[customer_].visit_count = 1;
    }

    function viewCart() public view returns(Cart memory){
        address customer_ = msg.sender;
        return customers[customer_].cart;
    }

    function updateCart(string[] memory items_, uint[] memory quantity_) external payable {
        address customer_ = msg.sender;
        require(customers[customer_].visit_count != 0, "You need to add yourself as customer");
        // string[] items_to_buy;
        // uint[] price_;
        // uint[] quantity_1;
        Cart storage customer_cart = customers[customer_].cart;
        delete customer_cart.items_bought;
        delete customer_cart.price;
        delete customer_cart.quantity;
        customer_cart.total_cost_cart = 0;
        uint cart_bill = 0;
        for(uint i = 0; i<items_.length; i++){
            customer_cart.items_bought.push(items_[i]);
            uint price_1 = items[items_[i]].price;
            customer_cart.price.push(price_1);
            require(items[items_[i]].entities >= quantity_[i], "Item demanded is out of stock. Wait for refilling");
            customer_cart.quantity.push(quantity_[i]);
            cart_bill = cart_bill + price_1 * quantity_[i];
        }
        customer_cart.total_cost_cart = cart_bill;
    }

    function billing() external payable {
        address customer_ = msg.sender;
        Cart storage customer_cart = customers[customer_].cart;
        string[] memory cart_items = customer_cart.items_bought;
        require(cart_items.length > 0, "Empty Cart, Add something to the cart");
        for(uint i = 0; i < cart_items.length; i++){
            items[cart_items[i]].entities = items[cart_items[i]].entities - customer_cart.quantity[i];
            require(items[cart_items[i]].entities >= 0, "Insufficient items in the shop, Wait for reimbursement");
        }
//CHECK FOR UPDATED PRICE IF ANY
// ########################################################

        

        uint visit_count = customers[customer_].visit_count - 1;

        customer_bill_itemcode[customer_][visit_count] = cart_items;
        customer_bill_itemcount[customer_][visit_count] = cart_items.length;
        customer_bill_itemprice[customer_][visit_count] = customer_cart.price;
        customer_bill_itemquantity[customer_][visit_count] = customer_cart.quantity;
        customer_bill_timestamp[customer_][visit_count] = block.timestamp;
        
        customers[customer_].amount =  customers[customer_].amount + customer_cart.total_cost_cart;
        customers[customer_].visit_count = customers[customer_].visit_count + 1;
        delete customer_cart.items_bought;
        delete customer_cart.price;
        delete customer_cart.quantity;
        customer_cart.total_cost_cart = 0;

    }
     function view_Bills_others(uint index) public view returns(string[] memory){
        address customer_ = msg.sender;
        // uint visit_count = customers[customer_].visit_count - 1;
        // uint timestamp = customer_bill_timestamp[customer_][index];
        string[] memory item_codes = customer_bill_itemcode[customer_][index];
        return item_codes;
    }
}

