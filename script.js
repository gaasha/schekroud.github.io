const state = {playerParams : {}};
// make a table?

const generateTableContents = (id, param, previous) => {
  //generate the html for it
  const row = document.createElement("tr"); //create the row
  const paramCell = document.createElement("td"); //create first cell which has param name
  row.appendChild(paramCell); //add to the table
  const textCell = document.createElement("td");
  textCell.className = "input-col";
  //row.appendChild(textCell);

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
  input.className="input-col";
  paramCell.innerText = param.text;
  //initialise the state of the button
  state[id] = false; //initialise the button as false
  if (previous){ //get the previous state
    state[id] = previous;
  };
  input.innerText = state[id] ? "Yes" : "No";
  input.style["background-color"] = state[id] ? "#008000" : "#f0534a";
  input.addEventListener(
    "click",
    () => {
      state[id] = !state[id]; //reverse the current state if clicked
      input.style["background-color"] = state[id] ? "#008000" : "#f0534a";
      input.innerText = state[id] ? "Yes" : "No";
      writeState();
    });
    textCell.appendChild(input);
  } else if (param.kind === "input") {
    //create a text field people can type in
    input = document.createElement("input");
    input.className = 'input-col';
    input.type = "text"; //letting people put text in this cell
    input.id = id;
    input.size=1;
    input.value = param.default; //first entry is the default for that parameter
    paramCell.className="input-col";
    paramCell.innerText = param.text; //set label for the parameter cell
    if (previous){
      input.value = previous;
    }
    input.addEventListener( "change",
    () => {
      state[id] = input.value;
      writeState();
    });
    textCell.appendChild(input); //for the input cell, assign what has been entered

  }

  row.appendChild(paramCell);
  row.appendChild(textCell);
  return row  
};

const loadParamUI = localStorageState => {
//first add things to the player parameter grid 
const paramTable = document.getElementById('param-table');
for (let field of Object.keys(Template)) {
  const row  = generateTableContents(field, Template[field], localStorageState[field]);
  paramTable.appendChild(row);
};
//builder table next
const builderTable = document.getElementById('builder-table');
for (let field of Object.keys(Builder)) {
  const row  = generateTableContents(field, Builder[field], localStorageState[field]);
  builderTable.appendChild(row);
};
//Damage table next
const damageTable = document.getElementById('damage-table');
for (let field of Object.keys(Damage)) {
  const row  = generateTableContents(field, Damage[field], localStorageState[field]);
  damageTable.appendChild(row);
};

//draw Invention perks table
const inventionTable = document.getElementById('invention-table');
for (let field of Object.keys(inventionPerks)) {
  const row  = generateTableContents(field, inventionPerks[field], localStorageState[field]);
  inventionTable.appendChild(row);
};
//draw relics table
const archTable = document.getElementById('relics-table');
for (let field of Object.keys(archRelics)) {
  const row  = generateTableContents(field, archRelics[field], localStorageState[field]);
  archTable.appendChild(row);
};

//draw relics table
const otherTable = document.getElementById('other-table');
for (let field of Object.keys(otherParams)) {
  const row  = generateTableContents(field, otherParams[field], localStorageState[field]);
  otherTable.appendChild(row);
};
};
//then add something to the functions grid

const generateFunctionsRows = (id, func, previous) => {
  //generate the html for it
  const row = document.createElement("tr"); //create the row
  //const iconCell = document.createElement("td"); //create first cell which has the icon for the function
  //iconCell.className="icon-col";
  //const icon = document.createElement("img");
  //iconCell.appendChild(icon);
  //row.appendChild(iconCell);
  const textCell = document.createElement("td");
  textCell.className = 'func-col';
  row.appendChild(textCell);

  let input;
  input = document.createElement('button'); //make a button
  input.className = 'func-col';
  input.innerText = func.name; //text inside the clickable button
  //check if it has been clicked
  input.addEventListener(
    "click",
    () => {
      state[id] = true; //reverse the current state if clicked
      //input.style["background-color"] = state[id] ? "#61fc3a" : "#f0534a";
      //input.innerText = state[id] ? "Yes" : "No";
      writeState();
      if (id === 'updateRot' & state[id]){
        loadRotationUI(state)
      }

    });

  textCell.appendChild(input);
  
  row.appendChild(textCell);
  return row
};

const loadFunctionsUI = localStorageState => {
const functionsTable = document.getElementById('functions-table');
for (let field of Object.keys(functionsInfo)){
  const row = generateFunctionsRows(field, functionsInfo[field], localStorageState);
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
  //row.style.backgroundColor = "#bdbdbd";
  const tickCell = document.createElement("td");
  tickCell.className="ability-col";
  //tickCell.style="border:none;outline:none;border-radius:0px;background-color:white"
  tickCell.style.width= "50px";
  row.appendChild(tickCell); //add the tick cell
  const  labelCell = document.createElement("td");
  //labelCell.style="border:none;outline:none;border-radius:0px;background-color:white"
  labelCell.style.width = "180px";
  labelCell.className="ability-col";
  labelCell.style.fontSize = "14px"
  row.appendChild(labelCell);
  const abilityCell = document.createElement("td");
  abilityCell.className="ability-col";
  //abilityCell.style="border:none;outline:none;border-radius:0px;background-color:white"
  abilityCell.style.width = "200px"; //200px
  row.appendChild(abilityCell);

  const iconCell = document.createElement("td");
  iconCell.className="icon-col";
  const icon     = document.createElement("img");
  iconCell.appendChild(icon);
  row.appendChild(iconCell);
  
  const iconCell2 = document.createElement("td");
  iconCell2.className="icon-col";
  const icon2     = document.createElement("img");
  iconCell2.appendChild(icon2);
  row.appendChild(iconCell2);
  
  const iconCell3 = document.createElement("td");
  iconCell3.className="icon-col";
  const icon3     = document.createElement("img");
  iconCell3.appendChild(icon3);
  row.appendChild(iconCell3);
  
  const iconCell4 = document.createElement("td");
  iconCell4.className="icon-col";
  const icon4     = document.createElement("img");
  iconCell4.appendChild(icon4);
  row.appendChild(iconCell4);
 
  const iconCell5 = document.createElement("td");
  iconCell5.className="icon-col";
  const icon5     = document.createElement("img");
  iconCell5.appendChild(icon5);
  row.appendChild(iconCell5);

  let iconCells = {
    "iconCell0":iconCell,
    "iconCell2":iconCell2,
    "iconCell3":iconCell3,
    "iconCell4":iconCell4,
    "iconCell5":iconCell5
  }

  let icons = {
    "icon0": icon,
    "icon1": icon2,
    "icon2": icon3,
    "icon3": icon4,
    "icon4": icon5,
  }

  tickCell.innerText=tick;
  
  for (let key of Object.keys(ticklabels)){
    if ( +key === tick ){
      labelCell.innerText = ticklabels[key];
    }
  }
  if (rotations[currRot].nullTicks.includes(tick)){
    tickCell.style.backgroundColor = '#e06666';
    //labelCell.style.backgroundColor = '#e06666';
    //abilityCell.style.backgroundColor = '#e06666';
  }
  
  let input;
  //create a text field people can type in
  input = document.createElement("input");
  input.className = 'ability-col';
  input.type = "text"; //letting people put text in this cell
  input.size=1;
  input.value = "";
  abilityCell.className="ability-col";
  input.addEventListener( "change",
  () => {
    //state[id] = input.value;
    let abilsUsed = input.value; //get abilities in the text
    let abilsUsedArr = abilsUsed.split("+");
    let nAbilsUsed = abilsUsedArr.length;
    for(i = 0; i<nAbilsUsed; i++){
      var tmp = ''
      tmp = abilsUsedArr[i]
      abilsUsedArr[i] = tmp.trim();
    };
    for (i = 0; i<= nAbilsUsed; i++){
      if (abilsUsedArr[i]){
        icons['icon'+i].src = abilities[abilsUsedArr[i]].icon;
      } else {icons['icon'+i].src = ''};
    }
    writeState();
  });
  abilityCell.appendChild(input); //for the input cell, assign what has been entered

  //regex on input.value to determine up to 5 abilities that might have been pressed

  return row
}

const loadRotationUI = localStorageState => {
  
  rotationTable = document.getElementById('rotation-table');
  rotationTable.className = "ability-table";
  tableElement = document.getElementById('rotation-table').getElementsByTagName('tbody');
  //rows = rotationTable.children[0].children;
  newRotBody = document.createElement("tbody")
  rotationTable.className = "";
  if (currRot){
    nticks = rotations[currRot]['nticks'];
    tickstart = rotations[currRot]['tickStart'];
    for (let i = 0; i<= nticks + 1; i++){
      const row = generateRotationRow(tickstart+i, rotations[currRot].tickLabels);
            // const row = generateRotationRow(tickStart+i, rotations['ragoP3GB'])
      newRotBody.appendChild(row);
    };
    rotationTable.appendChild(newRotBody);
  };
  rotationTable.replaceChild(newRotBody,rotationTable.children[0]); //replace table body with the new rotation template
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