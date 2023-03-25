const state = {playerParams : {}};
// make a table?

const generateTableContents = (id, param, previous) => {
  //generate the html for it
  const row = document.createElement("tr"); //create the row
  const paramCell = document.createElement("td"); //create first cell which has param name
  row.appendChild(paramCell); //add to the table
  const textCell = document.createElement("td");
  row.appendChild(textCell);

  let input;
  if ( param.kind=== "select"){ //need to make a little drop down menu
     input = document.createElement("select"); //create the input cell
     input.id = id; //get name of the option we're adding to table
     paramCell.innerText = param.text; //get label for it from the json

     for (let opt of Object.keys(param.labels)){ //loop over the available options for the drop down
      const option = document.createElement("option");
      option.innerText = param.labels[opt];
      input.appendChild(option);
    }
    textCell.appendChild(input)
  } else if (param.kind === "check"){ // create clickable button to toggle booleans instead
  input = document.createElement("button") //make the boolean cell
  input.id = id;
  paramCell.innerText = param.text;
  //initialise the state of the button
  state[id] = false; //initialise the button as false
  if (previous){ //get the previous state
    state[id] = previous;
  };
  input.innerText = state[id] ? "Yes" : "No";
  input.style["background-color"] = state[id] ? "#61fc3a" : "#f0534a";
  input.addEventListener(
    "click",
    () => {
      state[id] = !state[id]; //reverse the current state if clicked
      input.style["background-color"] = state[id] ? "#61fc3a" : "#f0534a";
      input.innerText = state[id] ? "Yes" : "No";
    });
    textCell.appendChild(input);
  }
  row.appendChild(paramCell);
  row.appendChild(textCell);
  return row  
};

//first add things to the player parameter grid 
const paramgrid = document.getElementById("parameter-grid");
//template table first
const paramTable = document.getElementById('param-table');
for (let field of Object.keys(Template)) {
  const row  = generateTableContents(field, Template[field], state[field]);
  paramTable.appendChild(row);
};
// paramgrid.appendChild(templateTable);
// document.body.appendChild(paramgrid);

//builder table next
// const builderTable = document.getElementById('param-table');
for (let field of Object.keys(Builder)) {
  const row  = generateTableContents(field, Builder[field], state[field]);
  paramTable.appendChild(row);
};
// paramgrid.appendChild(builderTable);
//document.body.appendChild(builderTable);

//Damage table next
// const damageTable = document.getElementById('param-table');
for (let field of Object.keys(Damage)) {
  const row  = generateTableContents(field, Damage[field], state[field]);
  paramTable.appendChild(row);
};
// paramgrid.appendChild(damageTable);
//document.body.appendChild(damageTable);

//draw Invention perks table

// const inventionTable = document.getElementById('param-table');
for (let field of Object.keys(inventionPerks)) {
  const row  = generateTableContents(field, inventionPerks[field], state[field]);
  paramTable.appendChild(row);
};
// paramgrid.appendChild(inventionTable);
//document.body.appendChild(inventionTable);


//draw relics table
// const archTable = document.getElementById('param-table');
for (let field of Object.keys(archRelics)) {
  const row  = generateTableContents(field, archRelics[field], state[field]);
  paramTable.appendChild(row);
};
// paramgrid.appendChild(archTable);
//document.body.appendChild(archTable);


//draw relics table
// const otherTable = document.getElementById('param-table');
for (let field of Object.keys(otherParams)) {
  const row  = generateTableContents(field, otherParams[field], state[field]);
  paramTable.appendChild(row);
};
//paramgrid.appendChild(paramTable);
// document.body.appendChild(paramTable);
document.body.appendChild(paramTable);



//then add something to the functions grid

const funcGrid = document.getElementById("functions-grid");



//finally, populate the rotations grid


