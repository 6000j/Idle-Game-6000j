Building.Entity = function Entity(){
    this.id = Building.Entity.prototype._count;

    // increment counter
    Building.Entity.prototype._count++;

    // The component data will live in this object
    this.components = {};

    return this;
};
// keep track of entities created
Building.Entity.prototype._count = 0;

Building.Entity.prototype.addComponent = function addComponent ( component ){
    // Add component data to the entity
    this.components[component.name] = component;
    return this;
};
Building.Entity.prototype.removeComponent = function removeComponent ( componentName ){	
    // Remove component data by removing the reference to it.
    // Allows either a component function or a string of a component name to be
    // passed in
    var name = componentName; // assume a string was passed in

    if(typeof componentName === 'function'){ 
        // get the name from the prototype of the passed component function
        name = componentName.prototype.name;
    }

    delete this.components[name];
    return this;
};

Building.Entity.prototype.print = function print () {
	// Function to print / log information about the entity
    console.log(JSON.stringify(this, null, 4));
    return this;
};



Building.Components.Production = function ComponentProduction ( value ){
    value = value || 1;
    this.value = value;

    return this;
};

Building.Components.BaseCost = function ComponentBaseCost ( value ){
    value = value || 10;
    this.value = value;

    return this;
};

Building.Components.CostMultiplier = function ComponentCostMultiplier ( value ){
    value = value || 1.15;
    this.value = value;

    return this;
};

Building.Components.Production = function ComponentProduction ( value ){
    value = value || 1;
    this.value = value;

    return this;
};

Building.Components.Production.prototype.name = 'Production:';

var farm = new Building.Entity();
farm.addComponent( new Building.Components.Production(1) );
farm.addComponent( new Building.Components.BaseCost(10) );
farm.addComponent( new Building.Components.CostMultiplier(1.15) );
