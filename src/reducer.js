const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      // adding new item to the array and also adding id to items
      const newTodos = [...state.item, action.extra];
      return {
        ...state,
        item: newTodos,
        modalContent: "item added",
        hasModal: true,
      };
    case "EMPTY":
      return {
        ...state,
        hasModal: true,
        modalContent: "Write a Todo!",
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        hasModal: false,
      };
    case "REMOVE":
      // removes the id that is clicked and returns other items
      const newList = state.item.filter((item) => {
        if (item.id !== action.id) {
          return item;
        }
      });
      return {
        ...state,
        item: newList,
      };
    case "CLEAR_ALL":
      return {
        ...state,
        item: [],
        isMuch: false,
      };

    default:
      console.log("errrrrrrorrrrrrr!");
      break;
  }
};
export default reducer;
