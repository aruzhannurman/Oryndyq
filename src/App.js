import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

// button-group
const buttons = [
  {
    type: "all",
    label: "All",
  },
  {
    type: "active",
    label: "Active",
  },
  {
    type: "done",
    label: "Done",
  },
];

// helpful links:
// useState crash => https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/
function App() {

  const boysStorage = JSON.parse(localStorage.getItem("boy")) || [];
  const girlsStorage = JSON.parse(localStorage.getItem("girl")) || [];

  const [itemToAdd, setItemToAdd] = useState("");

  const [girlItemToAdd, setGirlItemToAdd] = useState("");
  const [boyItemToAdd, setBoyItemToAdd] = useState("");

  //arrow declaration => expensive computation ex: API calls
  const [girlItems, setGirlItems] = useState(girlsStorage);
  const [boyItems, setBoyItems] = useState(boysStorage);

  const [filterType, setFilterType] = useState("");
  const [searchTxt, setSearchTxt] = useState("");

  const [resultState, setResultState] = useState([]);

  localStorage.setItem("girl", JSON.stringify(girlItems));
  localStorage.setItem("boy", JSON.stringify(boyItems));

  const handleGirlChangeItem = (event) => {
    setGirlItemToAdd(event.target.value);
  };

  const handleBoyChangeItem = (event) => {
    setBoyItemToAdd(event.target.value);
  };

  const handleGirlAddItem = () => {
    // mutating !WRONG!
    // const oldItems = items;
    // oldItems.push({ label: itemToAdd, key: uuidv4() });
    // setItems(oldItems);

    setGirlItems((prevItems) => [
      ...prevItems,
      { label: girlItemToAdd, key: uuidv4(), gender: "female" },
    ]);

    setGirlItemToAdd("");
  };

  const handleBoyAddItem = () => {
    // mutating !WRONG!
    // const oldItems = items;
    // oldItems.push({ label: itemToAdd, key: uuidv4() });
    // setItems(oldItems);

    setBoyItems((prevItems) => [
      ...prevItems,
      { label: boyItemToAdd, key: uuidv4(), gender: "male" },
    ]);

    setBoyItemToAdd("");
  };

  // const handleItemDone = ({ key }) => {
  //   //first way
  //   // const itemIndex = items.findIndex((item) => item.key === key);
  //   // const oldItem = items[itemIndex];
  //   // const newItem = { ...oldItem, done: !oldItem.done };
  //   // const leftSideOfAnArray = items.slice(0, itemIndex);
  //   // const rightSideOfAnArray = items.slice(itemIndex + 1, items.length);
  //   // setItems([...leftSideOfAnArray, newItem, ...rightSideOfAnArray]);

  //   //  second way
  //   // const changedItem = items.map((item) => {
  //   //   if (item.key === key) {
  //   //     return { ...item, done: item.done ? false : true };
  //   //   } else return item;
  //   // });

  //   //second way updated
  //     setGirlItems((prevItems) =>
  //       prevItems.map((item) => {
  //         if (item.key === key) {
  //           return { ...item, done: !item.done };
  //         } else return item;
  //       })
  //     );
  //     setBoyItems((prevItems) =>
  //       prevItems.map((item) => {
  //         if (item.key === key) {
  //           return { ...item, done: !item.done };
  //         } else return item;
  //       })
  //     );
  //   }

  const handleItemImportant = ({ key }) => {
    setBoyItems((prevItems) =>
      prevItems.map((item) => {
        if (item.key === key) {
          return { ...item, important: !item.important };
        } else return item;
      })
    );
    setGirlItems((prevItems) =>
      prevItems.map((item) => {
        if (item.key === key) {
          return { ...item, important: !item.important };
        } else return item;
      })
    );
  };

  const handleItemDelete = ({ key }) => {
    const boynewList = boyItems.filter((item) => item.key !== key);
    const girlnewList = girlItems.filter((item) => item.key !== key);
    setBoyItems(boynewList);
    setGirlItems(girlnewList);
  };

  const handleFilterItems = (type) => {
    setFilterType(type);
  };

  const handleChangeSearch = (event) => {
    setFilterType("search");
    // console.log(event.target.value);
    setSearchTxt(event.target.value);
  };

  // const amountDone = items.filter((item) => item.done).length;

  // const amountLeft = items.length - amountDone;

  // const filteredItems =
  //   !filterType || filterType === "all"
  //     ? items
  //     : filterType === "search"
  //     ? items.filter((item) => item.label.includes(searchTxt))
  //     : filterType === "active"
  //     ? items.filter((item) => !item.done)
  //     : items.filter((item) => item.done);

  // if(filterType === "search"){
  //   items.filter((item) => item.label.includes(searchTxt));
  // }else if(filterType === "active"){
  //   items.filter((item) => !item.done)
  // }else if(filterType === "done"){
  //   items.filter((item) => item.done);
  // }

  // ________________________________________________________________________
  // const girls = [ {gender:'female', important: false, name: 'adads  '},{},{},{}]
  // const boys = [{gender: 'male', important: true, name: 'asdfsfda'},{},{},{}]



  function randomize() {
    // filling from left to right
    // priority students first
    // sort by priority girls []
    // sort by priority boys []
    // at this point you should have [ [], [] ,[] ]
    // forEach, map, filter, sort

    var result = [[], [], []];

    var copyBoys = [...boysStorage];
    var copyGirls = [...girlsStorage];

    //shuffle(copyBoys);
    //shuffle(copyGirls);

    copyGirls.sort((a, b) => {
      return a.important && !b.important
        ? -1
        : !a.important && b.important
        ? 1
        : 0;
    });

    copyBoys.sort((a, b) => {
      return a.important && !b.important
        ? -1
        : !a.important && b.important
        ? 1
        : 0;
    });

    let c = 0;
    while (boysStorage.length() + girlsStorage.length() !== c) {
      // each iteration we will add student to total
      for (let i = 0; i < result.length; i++) {
        // 0 - 1 - 2
        let newColumn = result[i]; // []
        let boy = copyBoys.shift();
        let girl = copyGirls.shift();

        newColumn.push({boy, girl});
        result[i] = newColumn;
      }
      c++;
    }
    setResultState([...result]);
  };

  // [
  //   [ {girl1, boy1}, {girl2, boy2}, {girl2, boy2}],
  //   [ {girl4, boy4}, {girl7, boy7}, {girl2, boy2}],
  //   [ {girl5, boy5}, {girl6, boy6}, {girl2, boy2}],
  // ]

  // create an object parta = {girl, boy}
  // push the object to array representing row
  //

  //

  // girls = [..., ..., ...]

  return (
    <>
      <div className="todo-app">
        {/* App-header */}
        <div className="app-header d-flex">
          <h1>School Table seats generator</h1>
        </div>

        <div> 1. Columns: 3 default</div>

        <div>2.Add "Surname Name" of students of each gender</div>
      </div>

      <div className="total-container">
        <div className="girls-container">
          <h3>Girls</h3>
          <ul className="list-group todo-list">
            {girlItems.length > 0 &&
              girlItems.map((item) => (
                <li key={item.key} className="list-group-item">
                  <span
                    className={`todo-list-item${item.done ? " done" : ""} ${
                      item.important ? " important" : ""
                    }`}
                  >
                    <span
                      className="todo-list-item-label"
                      // onClick={() => handleItemDone(item)}
                    >
                      {item.label}
                    </span>

                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm float-right"
                      onClick={() => handleItemImportant(item)}
                    >
                      <i className="fa fa-exclamation" />
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm float-right"
                      onClick={() => handleItemDelete(item)}
                    >
                      <i className="fa fa-trash-o" />
                    </button>
                  </span>
                </li>
              ))}
          </ul>

          <div className="item-add-form d-flex">
            <input
              value={girlItemToAdd}
              type="text"
              className="form-control"
              placeholder="Add NameSurname of a girl"
              onChange={handleGirlChangeItem}
            />
            <button
              className="btn btn-outline-secondary"
              onClick={handleGirlAddItem}
            >
              Add item
            </button>
          </div>
        </div>

        <div className="boys-container">
          <h3>Boys</h3>
          <ul className="list-group todo-list">
            {boyItems.length > 0 &&
              boyItems.map((item) => (
                <li key={item.key} className="list-group-item">
                  <span
                    className={`todo-list-item${item.done ? " done" : ""} ${
                      item.important ? " important" : ""
                    }`}
                  >
                    <span
                      className="todo-list-item-label"
                      // onClick={() => handleItemDone(item)}
                    >
                      {item.label}
                    </span>

                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm float-right"
                      onClick={() => handleItemImportant(item)}
                    >
                      <i className="fa fa-exclamation" />
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm float-right"
                      onClick={() => handleItemDelete(item)}
                    >
                      <i className="fa fa-trash-o" />
                    </button>
                  </span>
                </li>
              ))}
          </ul>

          {/* Add form */}
          <div className="item-add-form d-flex">
            <input
              value={boyItemToAdd}
              type="text"
              className="form-control"
              placeholder="Add NameSurname of a boy"
              onChange={handleBoyChangeItem}
            />
            <button
              className="btn btn-outline-secondary"
              onClick={handleBoyAddItem}
            >
              Add item
            </button>
          </div>
        </div>
      </div>

      <div className="generate-button">
        <button id="generate"  onClick={() => randomize()}>Generate seats</button>
      </div>

      <div className="result-container">
         <div className="result">
          {console.log(resultState)}
            {resultState.length>0 && resultState.map((item)=> {

              // for (let i=0; i<item.length; i++) {
              //   if (item[i].boy === undefined && item[i].girl === undefined) {
              //     continue;
              //   }
              //   if(item[i].boy === undefined || item[i].girl === undefined) {
                    
              //   }

                


           
                

            })}





         </div>
            

      </div>
    </>
  );
}

export default App;
