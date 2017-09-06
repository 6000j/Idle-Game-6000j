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

var buildings = [
	farm,
	inn,
	temple,
]


function buy(build,amt){
	
			for (i	 = 0; i < amt; i++){
				if (canAfford(build,1)) {
					gold -= Math.round(build.cost);
					build.amount ++;
					build.cost = build.cost * build.costMulti;
				}
			
			}
			if (build == null) {console.log("build is null")};
			if (build.name == null) {console.log("build.name is null")}			
			document.getElementById(build.name).innerHTML = build.amount;
			document.getElementById('gold').innerHTML = gold;
			document.getElementById(build.name + 'Cost').innerHTML = Math.round(build.cost);
			if ('baseProd' in build){
				document.getElementById(build.name + 'Prod').innerHTML = build.amount*build.baseProd*build.prodMulti;
			}
			if ('baseRegen' in build){
				document.getElementById(build.name + 'Regen').innerHTML = build.amount*build.baseRegen*build.regenMulti;
			}
		
		
}

function goldClick(number){  //Base function
	gold = gold+number;
	document.getElementById("gold").innerHTML = gold; 
	};

function canAfford(build,amt){
		var i = 0;
		var cost_so_far = 0;
		var current_cost = build.cost;
		while (i < amt){
			cost_so_far += current_cost;
			i ++;
			current_cost = current_cost * build.costMulti;
			return gold >= Math.round(cost_so_far);
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
	
function specificProd(build) {
	if ('baseProd' in build){
		build.prod = build.amount*build.baseProd*build.prodMulti;
		document.getElementById(build.name + 'Prod').innerHTML = build.prod;
		goldClick(build.prod)
	}
}

function specificRegen(build) {
	if ('baseRegen' in build){
		build.regen = build.amount*build.baseRegen*build.regenMulti;
		document.getElementById(build.name + 'Regen').innerHTML = build.regen;
		manaRegen += build.regen;
	}
}

function prodTick(number){
	for (i = 0; i < number; i++){
		buildings.forEach(specificProd) 
	}
}

function manaTick(number){
	for (i = 0; i < number; i++){
		buildings.forEach(specificRegen) 
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
	manaRegen = 5; //reseting regen so I can then calc it
	manaTick(1);
	document.getElementById("manaRegen").innerHTML = manaRegen;
	manaGain(manaRegen);
}, 1000);