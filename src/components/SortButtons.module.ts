.sortBy {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.sortBy button {
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.5rem;
  border: 1px solid white;
  background-color: inherit;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 6px 2px 0 rgba(0, 0, 0, 0.1);
  margin-left: 0.5rem;

}


.sortBy button:hover {
  transition: 0.3s;
  box-shadow: none;
}


.sortBy button:active {
  color: black;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(0, 0, 0, 0.1);
}

.activeSort {
  color: #ff9800;
}

