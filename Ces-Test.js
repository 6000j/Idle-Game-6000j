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

var library = {
	name: "Library",
	amount: 0,
	baseCost: 500,
	cost: 500,
	costMulti: 1.15,
	baseRegen: 0.05,
	regenMulti: 1,
	baseProd: 5,
	prodMulti: 1,
	type: 'building',
};

var buildings = [
	farm,
	inn,
	temple,
	library,
];

var loadout = [
	farm,
	inn,
	temple,
	library,
]

	


// loadout system	




function goldClick(number){  //Base function
	gold = gold+number;
	document.getElementById("gold").innerHTML = gold; 
	};

//Buy function
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
				document.getElementById(build.name + 'Regen').innerHTML = Math.round(build.amount*build.baseRegen*build.regenMulti*100)/100;
			}
		
		
}

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

//mana gain function
function manaGain(number) {		
	if(mana+number >= maxMana){
		mana = maxMana;
	}
	else{
		mana = mana + number;
	}
	document.getElementById("currentMana").innerHTML = Math.round(mana * 100)/100;
}	


//Tick Functions
function specificProd(build) {
	if ('baseProd' in build){
		build.prod = build.amount*build.baseProd*build.prodMulti;
		document.getElementById(build.name + 'Prod').innerHTML = build.prod;
		goldClick(build.prod);
	}
}

function specificRegen(build) {
	if ('baseRegen' in build){
		build.regen = build.amount*build.baseRegen*build.regenMulti;
		document.getElementById(build.name + 'Regen').innerHTML = Math.round(build.regen*100)/100;
		manaRegen += build.regen;
	}
}

function prodTick(number){
	for (i = 0; i < number; i++){
		buildings.forEach(specificProd); 
	}
}

function manaTick(number){
	for (i = 0; i < number; i++){
		buildings.forEach(specificRegen); 
	}
}

window.setInterval(function tick(number){ //this calculates everything, using all the other functions
	
	prodTick(1);
	document.getElementById("gold").innerHTML = gold;
	document.getElementById("maxMana").innerHTML = maxMana; //mana stuff
	manaRegen = 5; //reseting regen so I can then calc it
	manaTick(1);
	document.getElementById("manaRegen").innerHTML = Math.round(manaRegen*100)/100;
	manaGain(manaRegen);
}, 1000);


//Spells
function timeWarp() {  //spell 1
	if(mana >= 200) {
		prodTick(30);
		mana = mana - 200;
	}		
}	


//Startup Stuff
function costSet(build) {
	document.getElementById(build.name + 'Cost').innerHTML = Math.round(build.cost);
}

function setCosts() {
	buildings.forEach(costSet);
}

function amtSet(build) {
	document.getElementById(build.name).innerHTML = Math.round(build.amount);
}

function setAmt() {
	buildings.forEach(amtSet);
}


//defining the html blocks for each building

farm.html = `<button onClick="buy(farm, 1)">Farm</button>
		<br />
		Farms: <span id="Farm"></span><br />
		Cost: <span id="FarmCost"></span><br />
		Income: <span id="FarmProd">0</span>`;
inn.html = `<button onClick="buy(inn, 1)">Inn</button>
		<br />
		Inns: <span id="Inn"></span><br />
		Cost: <span id="InnCost"></span><br />
		Income: <span id="InnProd">0</span>`;
temple.html = `<button onClick="buy(temple, 1)">Temple</button>
		<br />
		Temples: <span id="Temple"></span><br />
		Cost: <span id="TempleCost"></span><br />
		Bonus Regen: <span id="TempleRegen">0</span>`;
library.html = `<button onClick="buy(library, 1)">Library</button>
		<br />
		Libraries: <span id="Library"></span><br />
		Cost: <span id="LibraryCost"></span><br />
		Income: <span id="LibraryProd">0</span><br />
		Bonus Regen: <span id="LibraryRegen">0</span>`;

document.getElementById("slot1").innerHTML = loadout[0].html;
document.getElementById("slot2").innerHTML = loadout[1].html;
document.getElementById("slot3").innerHTML = loadout[2].html;
document.getElementById("slot4").innerHTML = loadout[3].html;

function save() {
	var save = {
		farm: farm,
		inn: inn,
		gold: gold,
		mana: mana,
		temple: temple,
		library: library,
		loadout : loadout,
		buildings: buildings,
	}
	localStorage.setItem("save",JSON.stringify(save));
}

function load(){
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.gold !== "undefined") gold = savegame.gold;
	if (typeof savegame.inn !== "undefined") inn = savegame.inn;
	if (typeof savegame.farm !== "undefined") farm = savegame.farm;
	if (typeof savegame.temple !== "undefined") temple = savegame.temple;
	if (typeof savegame.library !== "undefined") library = savegame.library;
	if (typeof savegame.mana !== "undefined") mana = savegame.mana;
	if (typeof savegame.loadout !== "undefined") loadout = savegame.loadout;
	if (typeof savegame.buildings !== "undefined") buildings = savegame.buildings;	
}