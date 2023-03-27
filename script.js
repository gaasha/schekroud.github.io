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

     let selected = previous;
     if (!selected){
      selected = Object.keys(param.labels)[0];
     };

     for (let opt of Object.keys(param.labels)){ //loop over the available options for the drop down
      const option = document.createElement("option");
      option.innerText = param.labels[opt];
      if (opt === selected){
        input.value = param.labels[opt];
        option.selected=true;
      }
      input.appendChild(option);
    }
    textCell.appendChild(input)

    //need to add a listener here to detect what was clicked and store this
    input.addEventListener("change",
      () => {
        let selected;
        for (let key of Object.keys(param.labels)){
          if (param.labels[key] === input.value){
            selected = key;
          }
        }
        state[id] = selected;
        if (id === "RotationTemplate"){
          currRot = selected;
        }
        writeState();
      }
    );
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
      writeState();
    });
    textCell.appendChild(input);
  }
  row.appendChild(paramCell);
  row.appendChild(textCell);
  return row  
};

const loadParamUI = localStorageState => {
//first add things to the player parameter grid 
const paramTable = document.getElementById('param-table');
for (let field of Object.keys(Template)) {
  const row  = generateTableContents(field, Template[field], state[field]);
  paramTable.appendChild(row);
};
//builder table next
const builderTable = document.getElementById('builder-table');
for (let field of Object.keys(Builder)) {
  const row  = generateTableContents(field, Builder[field], state[field]);
  builderTable.appendChild(row);
};
//Damage table next
const damageTable = document.getElementById('damage-table');
for (let field of Object.keys(Damage)) {
  const row  = generateTableContents(field, Damage[field], state[field]);
  damageTable.appendChild(row);
};

//draw Invention perks table
const inventionTable = document.getElementById('invention-table');
for (let field of Object.keys(inventionPerks)) {
  const row  = generateTableContents(field, inventionPerks[field], state[field]);
  inventionTable.appendChild(row);
};
//draw relics table
const archTable = document.getElementById('relics-table');
for (let field of Object.keys(archRelics)) {
  const row  = generateTableContents(field, archRelics[field], state[field]);
  archTable.appendChild(row);
};

//draw relics table
const otherTable = document.getElementById('other-table');
for (let field of Object.keys(otherParams)) {
  const row  = generateTableContents(field, otherParams[field], state[field]);
  otherTable.appendChild(row);
};
};
//then add something to the functions grid

const generateFunctionsRows = (id, func) => {
  //generate the html for it
  const row = document.createElement("tr"); //create the row
  const iconCell = document.createElement("td"); //create first cell which has the icon for the function
  iconCell.className="icon-col";
  const icon = document.createElement("img");
  iconCell.appendChild(icon);
  row.appendChild(iconCell);
  const textCell = document.createElement("td");
  row.appendChild(textCell);

  let input;
  input = document.createElement('button'); //make a button
  input.innerText = func.name; //text inside the clickable button

  //check if it has been clicked
  input.addEventListener(
    "click",
    () => {
      state[id] = true; //reverse the current state if clicked
      //input.style["background-color"] = state[id] ? "#61fc3a" : "#f0534a";
      //input.innerText = state[id] ? "Yes" : "No";
      writeState();
      if (id === 'updateRot' & state[id] ){
        loadRotationUI(readState());
        state[id] = false;
      }
    });

  textCell.appendChild(input);
  
  row.appendChild(textCell);
  return row
};

const loadFunctionsUI = localStorageState => {
const functionsTable = document.getElementById('functions-table');
for (let field of Object.keys(functionsInfo)){
  const row = generateFunctionsRows(field, functionsInfo[field]);
  functionsTable.appendChild(row);
};
};
//finally, populate the rotations grid

//need to make a function tht creates a row for each tick of a rotation
//first lets assume a rotation that only has 5 ticks so we can see what it looks like

//first lets just assume a couple of columns to make it easy
// tick number, tick label, ability input, image
const generateRotationRow = (tick, ticklabels) => {
  const row = document.createElement("tr");
  const tickCell = document.createElement("td");
  row.appendChild(tickCell); //add the tick cell
  const  labelCell = document.createElement("td");
  row.appendChild(labelCell);
  const abilityCell = document.createElement("td");
  row.appendChild(abilityCell);
  const iconCell = document.createElement("td");
  row.appendChild(iconCell);
  
  tickCell.innerText=tick;
  
  for (let key of Object.keys(ticklabels)){
    if ( +key === tick ){
      labelCell.innerText = ticklabels[key];
    }
  }  
  return row
}

const loadRotationUI = localStorageState => {
  rotationTable = document.getElementById('rotation-table');
  if (currRot){
    //console.log(state['RotationTemplate']);
    console.log('there is a currently selected rotation');
    //let nticks = currRot.nticks;
    //let tickstart = currRot.tickStart;
    //console.log(nticks);
    //console.log(tickstart);
    nticks = rotations[currRot]['nticks'];
    tickstart = rotations[currRot]['tickStart'];
    console.log(nticks);
    console.log(tickstart);
    console.log(currRot.tickLabels);
    for (let i = 0; i<= nticks + 1; i++){
      const row = generateRotationRow(tickstart+i, rotations[currRot].tickLabels);
      // const row = generateRotationRow(tickStart+i, rotations['ragoP3GB'])
      rotationTable.appendChild(row);
    };

  };
};
const cleanupOldCookies = () => {
  // thankfully we only ever used 2 cookies, "state" and the anonymous one
  document.cookie = "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "state=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
}


const writeState = () => {
  /* func that should let me write the current state to local memory */
  let currState = JSON.parse(JSON.stringify(state)); //get current state
  localStorage.setItem("state", JSON.stringify(currState));
};

const readState = () => {
  const localStorageState = localStorage.getItem("state");
  return localStorageState ? JSON.parse(localStorageState) : {};
};

var currRot;
const initPage = () => {
  const  localStorageState = readState();
  loadParamUI(localStorageState);
  loadFunctionsUI(localStorageState);
  loadRotationUI(localStorageState);
  writeState();
};

initPage();