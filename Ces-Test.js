var gold = 0;
var maxMana = 1000;
var mana = 1000;
var manaRegen = 5;

var farm = {
	name: "Farm",
	amount: 0,
	baseCost: 10,
	cost: 10,
	costMulti: 1.15,
	baseProd: 1,
	prodMulti: 1,
	type: 'building',
};
var inn = {
	name: "Inn",
	amount: 0,
	baseCost: 100,
	cost: 100,
	costMulti: 1.15,
	baseProd: 7,
	prodMulti: 1,
	type: 'building',
};

var temple = {
	name: "Temple",
	amount: 0,
	baseCost: 1000,
	cost: 1000,
	costMulti: 1.20,
	baseRegen: 0.5,
	regenMulti: 1,
	type: 'building',
};




function buy(build,amt){
	
			for (i	 = 0; i < amt; i++){
				if (canAfford(build,1) == true) {
					gold -= build.cost;
					build.amount ++;
					build.cost = build.cost * build.costMulti;
				}
			
			}
			if (build == null) {console.log("build is null")};
			if (build.name == null) {console.log("build.name is null")}			
			document.getElementById(build.name).innerHTML = build.amount;
			document.getElementById('gold').innerHTML = gold;
			document.getElementById(build.name + 'Cost').innerHTML = build.cost;
			document.getElementById(build.name + 'Prod').innerHTML = build.amount*build.baseProd*build.prodMulti;
		
		
}

function goldClick(number){  //Base function
	gold = gold+number;
	document.getElementById("gold").innerHTML = gold; 
	};

function canAfford(build,amt){
		var i = 1;
		var cost_so_far = 0;
		var current_cost = build.Cost;
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
	




function prodTick(number){
		for (i = 0; i < number; i++){
			
			farm.prod = farm.amount*farm.baseProd*farm.prodMulti;			//building production and the like
			document.getElementById('FarmProd').innerHTML = farm.prod;
			goldClick(farm.prod);
			inn.prod = inn.amount*inn.baseProd*inn.prodMulti;
			document.getElementById('InnProd').innerHTML = inn.prod;
			goldClick(inn.prod);
			}
		}
		
//Spells
function timeWarp() {  //spell 1
	if(mana >= 200) {
		prodTick(30);
		mana = mana - 200;
	}		
}	



window.setInterval(function tick(number){
	
	prodTick(1);
	document.getElementById("gold").innerHTML = gold;
	document.getElementById("maxMana").innerHTML = maxMana; //mana stuff
	manaRegen = 5 + (temple.amount*temple.baseRegen*temple.regenMulti);
	manaGain(manaRegen);

}, 1000);