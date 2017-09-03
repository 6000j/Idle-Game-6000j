var gold = 0;

var maxMana = 1000;
var mana = 1000;
var manaRegen = 5;

var farms = 0;
var farmCostMulti = 1.15;
var farmBaseProd = 1;
var farmProdMulti = 1;
var inns = 0;
var innCostMulti = 1.15;
var innBaseProd = 5;
var innProdMulti = 1;
var temples = 0;
var templeCostMulti = 1.15;
var templeRegen = 0;

var Name = CES.Component.extend({
	name: 'name',
	init: function (x){
		this.name = x;
	}
	
})

var CostMulti = CES.Component.extend({
	name: 'costMulti',
	init: function (x) {
		this.costMulti = x;
	}
})

var Cost = CES.Component.extend({
	name: 'Cost',
	init: function (baseCost){
		this.Cost = this.baseCost = baseCost;
	},
	
	
})

var BaseProduction = CES.Component.extend({
	name: 'baseProduction',
	init: function (x) {
		this.baseProduction = x;
	}
})



var BuildingAmount = CES.Component.extend({
	name: 'amount',
	init: function() {
		this.amount = 0;
	}
})

var Farm = new CES.Entity();
Farm.addComponent(new Cost(10));
Farm.addComponent(new BaseProduction(1));
Farm.addComponent(new CostMulti(1.15));
Farm.addComponent(new BuildingAmount());

function buy(build, amt){
			for (i = 0; i < amt; i++){
				if (canAfford(build,1) == true) {
					gold -= build.Cost;
					build.amount ++;
					build.Cost = build.Cost * build.costMulti;
				}
			document.getElementById(build).innerHTML = build.amount;
			}
			
		
		
}

function goldClick(number){  //Base function
	gold = gold+number;
	document.getElementById("gold").innerHTML = gold; 
	};

function canAfford(build,amt){
		i = 1
		cost_so_far = 0;
		current_cost = build.Cost;
		while (i < amt){
			cost_so_far += current_cost;
			i ++;
			current_cost = current_cost * build.costMulti;
			return gold >= cost_so_far;
		}
	}	
	
function manaGain(number) {		//Does the mana stuff
	if(mana+number >= maxMana){
		mana = maxMana;
	}
	else{
		mana = mana + number;
	}
	document.getElementById("currentMana").innerHTML = mana;
}	
	
function buyFarm(){
    var farmCost = Math.floor(10 * Math.pow(farmCostMulti,farms));     //works out the cost of this farm
    if(gold >= farmCost){                                   //checks that the player can afford the farm
        farms = farms + 1;                                   //increases number of farms
    	gold = gold - farmCost;                          //removes the gold spent
        document.getElementById('Farm').innerHTML = farms;  //updates the number of farms for the user
        document.getElementById('gold').innerHTML = gold;  //updates the number of gold for the user
    };
    var nextCost = Math.floor(10 * Math.pow(farmCostMulti,farms));       //works out the cost of the next farm
    document.getElementById('farmCost').innerHTML = nextCost;  //updates the farm cost for the user
};

function buyInn(){
    var innCost = Math.floor(100 * Math.pow(innCostMulti,inns));     //works out the cost of this farm
    if(gold >= innCost){                                   //checks that the player can afford the farm
        inns = inns + 1;                                   //increases number of farms
    	gold = gold - innCost;                          //removes the gold spent
        document.getElementById('inns').innerHTML = inns;  //updates the number of farms for the user
        document.getElementById('gold').innerHTML = gold;  //updates the number of gold for the user
    };
    var nextCost = Math.floor(100 * Math.pow(innCostMulti,inns));       //works out the cost of the next farm
    document.getElementById('innCost').innerHTML = nextCost;  //updates the farm cost for the user
};

function buyTemple(){
    var templeCost = Math.floor(100 * Math.pow(templeCostMulti,temples));     
    if(gold >= templeCost){                                   
        temples = temples + 1;                                   
    	gold = gold - templeCost;                          
        document.getElementById('temples').innerHTML = inns;  
        document.getElementById('gold').innerHTML = gold;  
    };
    var nextCost = Math.floor(100 * Math.pow(innCostMulti,inns));       
    document.getElementById('innCost').innerHTML = nextCost;  	
};



function prodTick(number){
		for (i = 0; i < number; i++){
			var farmProd = farms*farmBaseProd*farmProdMulti;			//building production and the like
			document.getElementById('farmProd').innerHTML = farmProd;
			goldClick(farmProd);
			var innProd = inns*innBaseProd*innProdMulti;
			document.getElementById('innProd').innerHTML = innProd;
			goldClick(innProd);
			}
		}
		
//Spells
function timeWarp() {  //spell 1
	if(mana >= 200) {
		prodTick(30);
		mana = mana - 200;
	}		
}	

buy(Farm, 1);

window.setInterval(function tick(number){
	
	prodTick(1);
	document.getElementById("gold").innerHTML = gold;
	document.getElementById("maxMana").innerHTML = maxMana; //mana stuff
	manaGain(manaRegen);

}, 1000);