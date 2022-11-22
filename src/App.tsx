import Board from "./Components/Board";
import "./index.css";

const App = () => {
      return (
            <div>
                  <div>
                        <h1 className="title">
                              Tic-Tac-Toe Game
                        </h1>
                  </div>

                  <div>
                        <Board />
                  </div>

                  <div className="footer">
                        <span>
                              All Rights Reserved by EreZAzariyA &copy; &reg;
                        </span>
                  </div>
            </div>
      )
}

export default App;